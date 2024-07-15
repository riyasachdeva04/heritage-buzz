import React from 'react';
import graffiti from '../images/graffiti.png';
import design1 from '../images/design1.PNG';
import design2 from '../images/design2.PNG';
import design3 from '../images/design3.PNG';
import design4 from '../images/design4.PNG';
import design5 from '../images/design5.PNG';
import './home.css';

const Home = () => {
    return (
        <div className="home-container">
            <div className="hero-section">
                <div className="hero-content">
                    <h1>Welcome to Heritage Buzz</h1>
                    <p>Explore and share your own heritage stories with a vibrant community. Discover unique designs that merge tradition with contemporary fashion.</p>
                    <a href="/catalogue" className="btn-primary">Explore Designs</a>
                </div>
                <div className="hero-image">
                    <img src={graffiti} alt="graffiti" />
                </div>
            </div>
            <div className="about-section">
                <h2>About Heritage Buzz</h2>
                <p>Heritage Buzz is a platform that allows you to generate and share your own heritage stories. Our mission is to preserve cultural heritage by blending traditional art forms with modern fashion, creating unique and stylish designs that resonate with the modern audience.</p>
            </div>
            <div className="carousel-section">
                <h2>Featured Designs</h2>
                <div className="carousel">
                    <img src={design1} alt="design1" style={{ maxHeight: '20rem' }} />
                    <img src={design2} alt="design2" style={{ maxHeight: '20rem' }} />
                    <img src={design3} alt="design3" style={{ maxHeight: '20rem' }} />
                    <img src={design4} alt="design4" style={{ maxHeight: '20rem' }} />
                    <img src={design5} alt="design5" style={{ maxHeight: '20rem' }} />
                </div>
            </div>
            {/* <div className="how-it-works-section">
                <h2>How It Works</h2>
                <div className="steps">
                    <div className="step">
                        <h3>1. Explore</h3>
                        <p>Browse our collection of chic ethnic designs.</p>
                    </div>
                    <div className="step">
                        <h3>2. Customize</h3>
                        <p>Create your own unique outfit by selecting different art forms and base designs.</p>
                    </div>
                    <div className="step">
                        <h3>3. Share</h3>
                        <p>Save your favorite designs and share them with friends on social media.</p>
                    </div>
                </div>
            </div> */}
            <div className="testimonials-section container">
            <h2 className="text-center my-4">User Testimonials</h2>
                <div className="row">
                    <div className="col-md-4 col-sm-12 mb-4">
                        <div className="testimonial p-3 border rounded">
                            <p>"Heritage Buzz's designs are stunning! I love how they blend traditional art with modern fashion."</p>
                            <footer>- Satisfied Customer</footer>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-12 mb-4">
                        <div className="testimonial p-3 border rounded">
                            <p>"A fantastic platform for discovering and customizing unique outfits. Highly recommended!"</p>
                            <footer>- Happy User</footer>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-12 mb-4">
                        <div className="testimonial p-3 border rounded">
                            <p>"The customization options are amazing. I created a design that perfectly matches my style."</p>
                            <footer>- Fashion Enthusiast</footer>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Home;
