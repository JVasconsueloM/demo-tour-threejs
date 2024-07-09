import './style.css'
import './theme.css'

import {setupCamera} from "./camera.ts";
import {setupRenderer} from "./renderer.ts";
import {setupScene} from "./scene.ts";
import {setupControls} from "./controls.ts";
import {showLoader} from "./loader.ts";
import {setupTerrain} from "./terrain.ts";
import {addBuilding} from "./building.ts";
import GUI from "three/addons/libs/lil-gui.module.min.js";


const gui =  new GUI();
const scene = setupScene();
const camera = setupCamera();
const renderer = setupRenderer();
const controls = setupControls(camera, renderer, gui);
setupTerrain(scene)
showLoader()
addBuilding(scene, camera, controls)



renderer.render(scene, camera);
renderer.setAnimationLoop(animate);

function animate() {
    controls.update();
    renderer.render(scene, camera);
}
