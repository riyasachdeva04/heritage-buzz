import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.applications import vgg19
# from IPython.display import Image
from PIL import Image
from rembg import remove
import onnxruntime as ort
import cv2
from flask import Flask, send_file, request
import matplotlib.pyplot as plt
from flask_cors import CORS
from PIL import Image
import os
import random

#open, resize and format picture into tensors
def preprocess_image(image_path, img_nrows, img_ncols):
  img = keras.preprocessing.image.load_img(image_path, target_size=(img_nrows, img_ncols))
  img = keras.preprocessing.image.img_to_array(img)
  img = np.expand_dims(img, axis=0)
  img = vgg19.preprocess_input(img)
  return tf.convert_to_tensor(img)

  # tensor to image
def deprocess_image(x, img_nrows, img_ncols):
  x = x.reshape((img_nrows, img_ncols, 3))
  # Remove zero-center by mean pixel
  x[:, :, 0] += 103.939
  x[:, :, 1] += 116.779
  x[:, :, 2] += 123.68
  # BGR->RGB
  x = x[:, :, ::-1]
  x = np.clip(x, 0, 255).astype('uint8')
  return x

# gram matrix of image tensor (feature-wise outer product)
def gram_matrix(x):
  x = tf.transpose(x, (2, 0, 1))
  features = tf.reshape(x, (tf.shape(x)[0], -1))
  gram = tf.matmul(features, tf.transpose(features))
  return gram

def style_loss(style, combination, img_nrows, img_ncols):
  S = gram_matrix(style)
  C = gram_matrix(combination)
  channels = 3
  size = img_nrows * img_ncols
  return tf.reduce_sum(tf.square(S - C)) / (4.0 * (channels ** 2) * (size ** 2))

def content_loss(base, combination):
  return tf.reduce_sum(tf.square(combination - base))

def total_variation_loss(x, img_nrows, img_ncols):
  a = tf.square(
      x[:, :img_nrows - 1, :img_ncols - 1, :] - x[:, 1:, :img_ncols - 1, :])
  b = tf.square(
      x[:, :img_nrows - 1, :img_ncols - 1, :] - x[:, :img_nrows - 1, 1:, :])
  return tf.reduce_sum(tf.pow(a + b, 1.25))

def compute_loss(combination_image, base_image, style_reference_image, feature_extractor, content_layer_name, content_weight, style_layer_names, style_weight, total_variation_weight, img_nrows, img_ncols):
  input_tensor = tf.concat([base_image, style_reference_image,combination_image], axis=0)
  features = feature_extractor(input_tensor)

  # Initialize the loss
  loss = tf.zeros(shape=())

  # Add content loss
  layer_features = features[content_layer_name]
  base_image_features = layer_features[0, :, :, :]
  combination_features = layer_features[2, :, :, :]
  loss = loss + content_weight * content_loss(base_image_features,
                                              combination_features)
  # Add style loss
  for layer_name in style_layer_names:
    layer_features = features[layer_name]
    style_reference_features = layer_features[1, :, :, :]
    combination_features = layer_features[2, :, :, :]
    sl = style_loss(style_reference_features, combination_features, img_nrows, img_ncols)
    loss += (style_weight / len(style_layer_names)) * sl

  # Add total variation loss
  loss += total_variation_weight * total_variation_loss(combination_image, img_nrows, img_ncols)
  return loss

@tf.function
def compute_loss_and_grads(combination_image, base_image, style_reference_image, feature_extractor, content_layer_name, content_weight, style_layer_names, style_weight, total_variation_weight, img_nrows, img_ncols):
  with tf.GradientTape() as tape:
    loss = compute_loss(combination_image, base_image, style_reference_image, feature_extractor, content_layer_name, content_weight, style_layer_names, style_weight, total_variation_weight, img_nrows, img_ncols)
  grads = tape.gradient(loss, combination_image)
  return loss, grads

def neural_style_transfer(base_image_path, style_reference_image_path):
    result_prefix = 'tshirt_generated'
    iterations = 5000

    total_variation_weight = 1e-6
    style_weight = 1e-6
    content_weight = 2.5e-8
    
    width, height = keras.preprocessing.image.load_img(base_image_path).size
    img_nrows = 400
    img_ncols = int(width * img_nrows / height)

    model = vgg19.VGG19(weights='imagenet', include_top=False)
    outputs_dict = dict([(layer.name, layer.output) for layer in model.layers])
    feature_extractor = keras.Model(inputs=model.inputs, outputs=outputs_dict)
    
    style_layer_names = [ 'block1_conv1', 'block2_conv1', 'block3_conv1', 'block4_conv1', 'block5_conv1']
    content_layer_name = 'block5_conv2'
    optimizer = keras.optimizers.SGD(keras.optimizers.schedules.ExponentialDecay(initial_learning_rate=100., decay_steps=100, decay_rate=0.96))
    base_image = preprocess_image(base_image_path, img_nrows, img_ncols)
    style_reference_image = preprocess_image(style_reference_image_path, img_nrows, img_ncols)
    combination_image = tf.Variable(preprocess_image(base_image_path, img_nrows, img_ncols))
    
    i = 0
    for i in range(5):
        loss, grads = compute_loss_and_grads(combination_image, base_image, style_reference_image, feature_extractor, content_layer_name, content_weight, style_layer_names, style_weight, total_variation_weight, img_nrows, img_ncols)
        optimizer.apply_gradients([(grads, combination_image)])
        print('Iteration %d: loss=%.2f' % (i, loss))
        if i % 1 == 0:
            print('Iteration %d: loss=%.2f' % (i, loss))
            img = deprocess_image(combination_image.numpy(), img_nrows, img_ncols)
            fname = result_prefix + '_at_iteration_%d.png' % i
            keras.preprocessing.image.save_img(fname, img)
    print('b')
    image_path = 'tshirt_generated_at_iteration_' + str(i) + '.png' 
    image = cv2.imread(image_path)

    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    heatmap = cv2.applyColorMap(gray_image, cv2.COLORMAP_JET)
    output_path = 'heatmap.png'
    print('a')
    cv2.imwrite(output_path, heatmap)

    input_path = 'heatmap.png'
    output_path = 'output.png'

    sess_opts = ort.SessionOptions()
    providers = ["CPUExecutionProvider"]

    with open(input_path, 'rb') as i:
      with open(output_path, 'wb') as o:
          input = i.read()
          output = remove(input,session_options=sess_opts, providers=providers)
          o.write(output)
          
    # image = Image.open(output_path)

    # background = Image.new('RGBA', image.size, (255, 255, 255, 255))

    # background.paste(image, (0, 0), image)

    # background.save(output_path, 'PNG')

    return output_path

base_image_path = './input_image.png'

app = Flask(__name__)
CORS(app)

@app.route('/style_transfer', methods=['POST'])
def style_transfer():
  design = request.files['design']
  design_path = './design.png'
  design.save(design_path)
  base_image_path = './input_image.png'
  output_img = neural_style_transfer(base_image_path, design_path)
  return send_file(output_img, mimetype='image/png')

@app.route('/generate_style', methods=['POST'])
def generate_style():
    data = request.get_json()
    artform = data.get('artform')
    design_folder = './designs/'
    artform_folder = os.path.join(design_folder, artform)
    design_files = os.listdir(artform_folder)
    random_design = random.choice(design_files)
    design_path = os.path.join(artform_folder, random_design)

    print('Artform:', artform)
    print('Random Design:', random_design)
    print('Design Path:', design_path)

    base_image_path = './input_image.png'
    output_img = neural_style_transfer(base_image_path, design_path)
    
    return send_file(output_img, mimetype='image/png')


if __name__ == '__main__':
    app.run()
    