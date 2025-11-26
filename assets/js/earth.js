import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const container = document.getElementById('earth-container');
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 2;
controls.maxDistance = 8;
controls.enablePan = false;

const earthGroup = new THREE.Group();
earthGroup.rotation.z = 23.5 * Math.PI / 180;
scene.add(earthGroup);

const tex = new THREE.TextureLoader();
const loadingManager = new THREE.LoadingManager();
loadingManager.onLoad = () => console.log("Earth loaded");

const earth = new THREE.Mesh(
    new THREE.SphereGeometry(1, 64, 64),
    new THREE.MeshPhongMaterial({
        map: tex.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg', undefined, undefined, loadingManager),
        specularMap: tex.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg'),
        normalMap: tex.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg'),
        shininess: 15
    })
);
earthGroup.add(earth);

const clouds = new THREE.Mesh(
    new THREE.SphereGeometry(1.015, 64, 64),
    new THREE.MeshStandardMaterial({
        map: tex.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png'),
        transparent: true, opacity: 0.8
    })
);
earthGroup.add(clouds);

// جو زمین
const atmos = new THREE.Mesh(
    new THREE.SphereGeometry(1.2, 64, 64),
    new THREE.ShaderMaterial({
        vertexShader: `varying vec3 vNormal; void main() { vNormal = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
        fragmentShader: `varying vec3 vNormal; void main() { float intensity = pow(0.65 - dot(vNormal, vec3(0,0,1.0)), 4.0); gl_FragColor = vec4(0.3,0.6,1.0,1.0) * intensity * 1.5; }`,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        transparent: true
    })
);
scene.add(atmos);

// ستاره‌ها
const stars = new THREE.Points(
    new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(6000).map(() => (Math.random() - 0.5) * 200), 3)),
    new THREE.PointsMaterial({ size: 0.15, color: 0xffffff, transparent: true, opacity: 0.8 })
);
scene.add(stars);

// نور
scene.add(new THREE.AmbientLight(0x404040, 0.6));
const sun = new THREE.DirectionalLight(0xffffff, 2);
sun.position.set(5, 3, 5);
scene.add(sun);

function animate() {
    requestAnimationFrame(animate);
    earth.rotation.y += 0.0005;
    clouds.rotation.y += 0.0008;
    controls.update();
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
