import * as THREE from 'three';

const canvas = document.getElementById('earth-canvas');
if (!canvas) System.exit();

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
camera.position.z = 3.2;

// ژاپن دقیقاً وسط قاب و ثابت
camera.lookAt(0.95, 0.35, 0);

const renderer = new THREE.WebGLRenderer({ 
    canvas: canvas, 
    antialias: true, 
    alpha: true 
});
renderer.setSize(260, 260);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x000000, 0);

const earthGroup = new THREE.Group();
earthGroup.rotation.z = 23.5 * Math.PI / 180; // شیب زمین
scene.add(earthGroup);

const loader = new THREE.TextureLoader();

// زمین
const earth = new THREE.Mesh(
    new THREE.SphereGeometry(1, 64, 64),
    new THREE.MeshPhongMaterial({
        map: loader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg'),
        specularMap: loader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg'),
        normalMap: loader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg'),
        shininess: 15
    })
);
earthGroup.add(earth);

// ابرها
const clouds = new THREE.Mesh(
    new THREE.SphereGeometry(1.01, 64, 64),
    new THREE.MeshStandardMaterial({
        map: loader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png'),
        transparent: true,
        opacity: 0.6
    })
);
earthGroup.add(clouds);

// نور ثابت
scene.add(new THREE.AmbientLight(0x404040, 1.3));
const sun = new THREE.DirectionalLight(0xffffff, 3);
sun.position.set(5, 2, 5);
scene.add(sun);

// فقط یک بار رندر میشه — هیچ چرخش و کنترلی وجود نداره
renderer.render(scene, camera);
