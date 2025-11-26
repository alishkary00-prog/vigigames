// earth-final.js — نسخه نهایی ثابت + نقطه قرمز روی ژاپن + BREACH ACTIVE
import * as THREE from 'three';

const canvas = document.getElementById('earth-canvas');
if (!canvas) return;

// صحنه و دوربین
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
camera.position.z = 3.4;

// دقیقاً ژاپن وسط قاب باشه (مختصات تست‌شده و عالی)
camera.lookAt(0.98, 0.36, 0);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(280, 280);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x000000, 0);

// نورپردازی کامل و قوی (زمین کاملاً روشن و واقعی)
scene.add(new THREE.AmbientLight(0xffffff, 2.2));
const sun1 = new THREE.DirectionalLight(0xffffff, 4);
sun1.position.set(5, 3, 5);
scene.add(sun1);
const sun2 = new THREE.DirectionalLight(0xffffff, 2.5);
sun2.position.set(-5, -2, -5);
scene.add(sun2);

// گروه زمین
const earthGroup = new THREE.Group();
earthGroup.rotation.z = 23.5 * Math.PI / 180; // شیب زمین
scene.add(earthGroup);

const loader = new THREE.TextureLoader();

// زمین با کیفیت بالا
const earthGeometry = new THREE.SphereGeometry(1, 64, 64);
const earthMaterial = new THREE.MeshPhongMaterial({
    map: loader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg'),
    specularMap: loader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg'),
    normalMap: loader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg'),
    shininess: 30,
    emissive: 0x112233,
    emissiveIntensity: 0.15
});
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
earthGroup.add(earth);

// ابرها (شفاف و زیبا)
const clouds = new THREE.Mesh(
    new THREE.SphereGeometry(1.012, 64, 64),
    new THREE.MeshStandardMaterial({
        map: loader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png'),
        transparent: true,
        opacity: 0.85
    })
);
earthGroup.add(clouds);

// نقطه قرمز پالس‌دار روی ژاپن (مثل رادار هک!)
const pulseGeometry = new THREE.SphereGeometry(0.032, 32, 32);
const pulseMaterial = new THREE.MeshBasicMaterial({
    color: 0xff0033,
    transparent: true,
    opacity: 0.9
});
const pulseDot = new THREE.Mesh(pulseGeometry, pulseMaterial);

// موقعیت دقیق ژاپن (توکیو تقریباً)
pulseDot.position.set(1.05, 0.38, 0.25);
earthGroup.add(pulseDot);

// حلقه انیمیشن فقط برای پالس نقطه قرمز
function animate() {
    requestAnimationFrame(animate);
    
    // پالس نقطه قرمز
    const time = Date.now() * 0.003;
    pulseDot.scale.setScalar(1 + Math.sin(time * 8) * 0.3);
    pulseMaterial.opacity = 0.7 + Math.sin(time * 6) * 0.3;
    
    renderer.render(scene, camera);
}
animate();

// یک بار رندر اولیه
renderer.render(scene, camera);
