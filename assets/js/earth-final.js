// assets/js/earth-final.js - نسخه 100% آفلاین و بدون هیچ ارور و سیاه شدن
(() => {
    const canvas = document.getElementById('earth-canvas');
    if (!canvas || !window.THREE) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 3.4;
    camera.lookAt(0.98, 0.36, 0);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(280, 280);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    // نورپردازی خفن
    scene.add(new THREE.AmbientLight(0xffffff, 2.5));
    const light1 = new THREE.DirectionalLight(0xffffff, 4);
    light1.position.set(5, 3, 5);
    scene.add(light1);
    const light2 = new THREE.DirectionalLight(0x0088ff, 2);
    light2.position.set(-5, -2, -5);
    scene.add(light2);

    const earthGroup = new THREE.Group();
    earthGroup.rotation.z = 23.5 * Math.PI / 180;
    scene.add(earthGroup);

    // زمین بدون تکسچر (رنگ آبی تیره با هایلایت نئونی) — 100% آفلاین
    const earthMesh = new THREE.Mesh(
        new THREE.SphereGeometry(1, 64, 64),
        new THREE.MeshPhongMaterial({
            color: 0x001122,
            emissive: 0x002233,
            emissiveIntensity: 0.4,
            specular: 0x00ffff,
            shininess: 50
        })
    );
    earthGroup.add(earthMesh);

    // حلقه نئونی دور زمین
    const ring = new THREE.Mesh(
        new THREE.TorusGeometry(1.1, 0.015, 16, 100),
        new THREE.MeshBasicMaterial({ color: 0x00ffff })
    );
    ring.rotation.x = Math.PI / 2;
    earthGroup.add(ring);

    // نقطه قرمز پالس‌دار روی ژاپن
    const breachDot = new THREE.Mesh(
        new THREE.SphereGeometry(0.04, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0xff0033 })
    );
    breachDot.position.set(1.05, 0.38, 0.25);
    earthGroup.add(breachDot);

    // انیمیشن پالس نقطه قرمز
    const animate = () => {
        requestAnimationFrame(animate);
        const t = Date.now() * 0.004;
        breachDot.scale.setScalar(1 + Math.sin(t * 10) * 0.4);
        breachDot.material.opacity = 0.7 + Math.sin(t * 8) * 0.3;
        ring.rotation.z += 0.001;
        renderer.render(scene, camera);
    };
    animate();

    // رندر اولیه
    renderer.render(scene, camera);
})();
