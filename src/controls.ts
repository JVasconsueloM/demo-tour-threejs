import {MOUSE, PerspectiveCamera, Renderer} from "three";
import {MapControls} from "three/examples/jsm/Addons.js";
import {controlSpeed} from "./constants.ts";
import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";

export const setupControls = (camera: PerspectiveCamera, renderer: Renderer, gui: GUI) => {
    const controls = new MapControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 100;
    controls.maxDistance = 500;
    controls.maxPolarAngle = Math.PI / 2;

    // Enable zoom
    controls.enableZoom = true;
    controls.zoomSpeed = controlSpeed * 3;

    // Enable rotation
    // controls.enableRotate = true;
    // controls.rotateSpeed = controlSpeed;

    // Enable pan
    controls.enablePan = true;
    controls.panSpeed = controlSpeed;

    // Control rotation with mouse + Ctrl key
    controls.mouseButtons = {
        LEFT: MOUSE.PAN,
        MIDDLE: MOUSE.DOLLY,
        RIGHT: MOUSE.ROTATE
    };

    controls.addEventListener('change', updateGuiControllers);

    // GUI
    const cameraFolder = gui.addFolder('Camera Position');
    const xPositionController = cameraFolder.add(camera.position, 'x', -10, 200).name('X Position');
    const yPositionController = cameraFolder.add(camera.position, 'y', -10, 200).name('Y Position');
    const zPositionController = cameraFolder.add(camera.position, 'z', 0, 200).name('Z Position');
    cameraFolder.open();

    gui.add(camera, 'fov', 1, 120).name('Field of View').onChange(() => {
        camera.updateProjectionMatrix();
    });

    function updateGuiControllers() {
        xPositionController.setValue(camera.position.x);
        yPositionController.setValue(camera.position.y);
        zPositionController.setValue(camera.position.z);
    }

    return controls;
}