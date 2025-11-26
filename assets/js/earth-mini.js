import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const canvas = document.getElementById('earth-canvas');
if (!canvas) System.exit();

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
camera.position.z = 3.5;

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(280, 280);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const controls = new OrbitControls(camera, canvas);
controls.enableZoom = false;
controls.enablePan = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.5;
controls.enableDamping = true;

// قفل دائمی دوربین و پین روی ژاپن
camera.lookAt(0.92, 0.32, 0);
controls.target.set(0.92, 0.32, 0);
controls.update();

const earthGroup = new THREE.Group();
earthGroup.rotation.z = 23.5 * Math.PI / 180;
scene.add(earthGroup);

const loader = new THREE.TextureLoader();

// زمین
const earth = new THREE.Mesh(
    new THREE.SphereGeometry(1, 64, 64),
    new THREE.MeshPhongMaterial({
        map: loader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg'),
        specularMap: loader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg'),
        normalMap: loader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg'),
        shininess: 20
    })
);
earthGroup.add(earth);

// ابرها
const clouds = new THREE.Mesh(
    new THREE.SphereGeometry(1.012, 64, 64),
    new THREE.MeshStandardMaterial({
        map: loader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png'),
        transparent: true,
        opacity: 0.7
    })
);
earthGroup.add(clouds);

// نور
scene.add(new THREE.AmbientLight(0x404040, 1));
const sun = new THREE.DirectionalLight(0xffffff, 3);
sun.position.set(5, 3, 5);
scene.add(sun);

function animate() {
    requestAnimationFrame(animate);
    earth.rotation.y += 0.001;
    clouds.rotation.y += 0.0015;
    controls.update();
    renderer.render(scene, camera);
}
animate();
