import {Color, FogExp2, Scene} from "three";

export const setupScene = () => {
    const scene = new Scene();
    scene.background = new Color('#bfe3dd');
    scene.fog = new FogExp2('#f6ecd5', 0.004);

    return scene;
}