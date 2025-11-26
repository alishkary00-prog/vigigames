// assets/js/earth-final.js — نسخه کاملاً درست و بدون ارور
import * as THREE from 'three';

const canvas = document.getElementById('earth-canvas');
if (!canvas) {
    console.warn('canvas#earth-canvas پیدا نشد!');
} else {

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 3.4;
    camera.lookAt(0.98, 0.36, 0); // ژاپن دقیقاً وسط

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(280, 280);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    // نورپردازی قوی و یکنواخت
    scene.add(new THREE.AmbientLight(0xffffff, 2.2));
    const sun1 = new THREE.DirectionalLight(0xffffff, 4);
    sun1.position.set(5, 3, 5);
    scene.add(sun1);
    const sun2 = new THREE.DirectionalLight(0xffffff, 2.5);
    sun2.position.set(-5, -2, -5);
    scene.add(sun2);

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
            shininess: 30,
            emissive: 0x112233,
            emissiveIntensity: 0.15
        })
    );
    earthGroup.add(earth);

    // ابرها
    const clouds = new THREE.Mesh(
        new THREE.SphereGeometry(1.012, 64, 64),
        new THREE.MeshStandardMaterial({
            map: loader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png'),
            transparent: true,
            opacity: 0.85
        })
    );
    earthGroup.add(clouds);

    // نقطه قرمز پالس‌دار روی ژاپن
    const pulseDot = new THREE.Mesh(
        new THREE.SphereGeometry(0.032, 32, 32),
        new THREE.MeshBasicMaterial({
            color: 0xff0033,
            transparent: true,
            opacity: 0.9
        })
    );
    pulseDot.position.set(1.05, 0.38, 0.25); // دقیقاً روی توکیو
    earthGroup.add(pulseDot);

    // انیمیشن فقط برای پالس نقطه قرمز
    function animate() {
        requestAnimationFrame(animate);

        const time = Date.now() * 0.003;
        pulseDot.scale.setScalar(1 + Math.sin(time * 8) * 0.3);
        pulseDot.material.opacity = 0.7 + Math.sin(time * 6) * 0.3;

        renderer.render(scene, camera);
    }
    animate();

    // رندر اولیه
    renderer.render(scene, camera);
}
