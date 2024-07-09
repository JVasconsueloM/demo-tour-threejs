import {DoubleSide, Mesh, MeshBasicMaterial, PlaneGeometry, Scene} from "three";

export const setupTerrain = (scene: Scene) => {
    const geometry = new PlaneGeometry(512, 512, 10, 10);
    const material = new MeshBasicMaterial({
        color: 0x000000,
        wireframe: true,
        side: DoubleSide,
    });
    const plane = new Mesh(geometry, material);
    plane.rotation.set(1.55,0,0)
    scene.add(plane);
}