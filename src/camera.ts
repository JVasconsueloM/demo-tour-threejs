import {PerspectiveCamera} from "three";

export function setupCamera(): PerspectiveCamera {
    const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
    camera.position.set( 200, 150, 0 );
    camera.rotation.set(0, 0, 0, "XYZ");
    camera.lookAt( 0, 0, 0 );
    console.log('Initial Camera Position:', camera.position);
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });
    return camera;
}