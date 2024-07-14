import React from 'react';
import { Canvas } from 'react-three-fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import model from '../avatar/model.fbx';

const Avatar = () => {
    const fbxRef = React.useRef();

    React.useEffect(() => {
        const loader = new FBXLoader();
        loader.load('../avatar/model.fbx', (fbx) => {
            fbxRef.current.add(fbx);
        });
    }, []);

    return (
        <Canvas>
            <group ref={fbxRef} />
        </Canvas>
    );
};

export default Avatar;