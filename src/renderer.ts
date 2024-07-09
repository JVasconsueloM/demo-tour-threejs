import {WebGLRenderer} from "three";
import WebGL from 'three/addons/capabilities/WebGL.js';

export function setupRenderer(): WebGLRenderer {
    if (!WebGL.isWebGL2Available() ) {
        const warning = WebGL.getWebGL2ErrorMessage();
        document.body.appendChild( warning );
        throw new Error('Unable to initialize WebGL. Your browser or machine may not support it.');
    }

    const renderer = new WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    return renderer;
}