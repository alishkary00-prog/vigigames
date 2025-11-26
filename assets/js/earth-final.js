import * as THREE from 'three';

const canvas = document.getElementById('earth-canvas');
if (!canvas) return;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
camera.position.z = 3.2;

// ژاپن دقیقاً وسط قاب
camera.lookAt(0.95, 0.35, 0);

const renderer = new THREE.WebGLRenderer({ 
    canvas: canvas, 
    antialias: true, 
    alpha: true 
});
renderer.setSize(280, 280);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// نور کامل از همه طرف (کره کاملاً روشن میشه)
scene.add(new THREE.AmbientLight(0xffffff, 1.6));  // نور محیطی خیلی قوی
const sun1 = new THREE.DirectionalLight(0xffffff, 3);  // نور اصلی
sun1.position.set(5, 3, 5);
scene.add(sun1);
const sun2 = new THREE.DirectionalLight(0xffffff, 2);  // نور از پشت
sun2.position.set(-5, -2, -5);
scene.add(sun2);

const earthGroup = new THREE.Group();
earthGroup.rotation.z = 23.5 * Math.PI / 180;  // شیب زمین
scene.add(earthGroup);

const loader = new THREE.TextureLoader();

// زمین (با نور بیشتر)
const earth = new THREE.Mesh(
    new THREE.SphereGeometry(1, 64, 64),
    new THREE.MeshPhongMaterial({
        map: loader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg'),
        specularMap: loader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg'),
        normalMap: loader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg'),
        shininess: 30,  // براق‌تر
        emissive: 0x111111  // نور داخلی کم
    })
);
earthGroup.add(earth);

// ابرها
const clouds = new THREE.Mesh(
    new THREE.SphereGeometry(1.01, 64, 64),
    new THREE.MeshStandardMaterial({
        map: loader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png'),
        transparent: true,
        opacity: 0.8  // ابرها واضح‌تر
    })
);
earthGroup.add(clouds);

// فقط یک بار رندر — کاملاً ثابت
renderer.render(scene, camera);
