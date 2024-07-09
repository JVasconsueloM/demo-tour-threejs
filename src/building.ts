import {hideLoader} from "./loader.ts";
import {
    DirectionalLight,
    Mesh,
    MeshBasicMaterial,
    Object3D,
    Object3DEventMap, PerspectiveCamera,
    Raycaster,
    RectAreaLight,
    Scene,
    SphereGeometry,
    Vector2
} from "three";
import {GLTFLoader, MapControls, RectAreaLightUniformsLib} from "three/examples/jsm/Addons.js";
import TextSprite from "@seregpie/three.text-sprite";

export const addBuilding = (scene: Scene, camera: PerspectiveCamera, controls: MapControls) => {
    const loader = new GLTFLoader();
    const raycaster = new Raycaster();
    const mouse = new Vector2();
    let model: Object3D<Object3DEventMap>;
    let icon: Object3D<Object3DEventMap>;

    loader.load('assets/abandoned_warehouse_-_interior_scene-out.glb', function (gltf) {
            model = gltf.scene;
            model.scale.set(3, 3, 3);
            model.rotation.set(0, 0, 0)
            model.position.set(0, 3 * 3, 0);

            let instance = new TextSprite({
                alignment: 'left',
                backgroundColor: "#ffffff",
                color: '#000000',
                fontSize: 1,
                text: 'Fabrica #1',
            });
            instance.position.set(0, 5, -5)
            model.add(instance);
            scene.add(gltf.scene);

            hideLoader();
            window.addEventListener('click', onMouseClick);
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        }, function (error) {
            console.error(error);
            hideLoader();
        });


    // @ts-ignore
    function onMouseClick(event) {
        event.preventDefault();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(model, true);

        if (intersects.length > 0) {
            const intersectedPoint = intersects[0].point;
            const scaleSize = 100;
            model.scale.set(scaleSize, scaleSize, scaleSize); // Scale the intersected object
            model.position.set(0, 3 * scaleSize, 0);
            camera.position.set(15 * scaleSize, 5 * scaleSize, -20 * scaleSize);
            camera.rotation.set(0, 0, 0, "XYZ");
            camera.lookAt(0, 3 * scaleSize, 0);
            camera.far = 100000;
            camera.fov = 60;
            camera.updateProjectionMatrix();
            controls.maxDistance = scaleSize * 10;
            controls.target.set(intersectedPoint.x, intersectedPoint.y, intersectedPoint.z);
            controls.update();
            scene.fog = null;


            const geometry = new SphereGeometry(0.5, 8, 4);
            const material = new MeshBasicMaterial({color: 0xff0000});
            icon = new Mesh(geometry, material);
            icon.scale.set(scaleSize / 2, scaleSize / 2, scaleSize / 2)
            icon.position.set(11 * scaleSize / 3, 4 * scaleSize / 3, -18 * scaleSize / 3)
            scene.add(icon);
            icon.addEventListener('click', alert)

            window.removeEventListener('click', onMouseClick);
            window.addEventListener('click', onIconClick);
        }
    }


    // @ts-ignore
    function onIconClick(event) {
        event.preventDefault();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(icon, true);

        if (intersects.length > 0) {
            window.open('/chart.html', '_blank', 'width=800,height=600,scrollbars=yes,resizable=yes');
        }
    }


    RectAreaLightUniformsLib.init();

    const rectLight = new RectAreaLight("#ffffff", 1, 10, 5);
    rectLight.position.set(10, 0, -3);
    rectLight.lookAt(10, 0, 0);
    scene.add(rectLight)

    const light = new DirectionalLight(0xffffff, 1);
    light.position.set(50, 50, 50).normalize();
    scene.add(light);
}