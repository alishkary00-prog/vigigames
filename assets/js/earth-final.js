// assets/js/earth-final.js - 100% CLEAN & WORKING
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

    scene.add(new THREE.AmbientLight(0xffffff, 2.2));
    const sun1 = new THREE.DirectionalLight(0xffffff, 4); sun1.position.set(5,3,5); scene.add(sun1);
    const sun2 = new THREE.DirectionalLight(0xffffff, 2.5); sun2.position.set(-5,-2,-5); scene.add(sun2);

    const g = new THREE.Group(); g.rotation.z = 23.5 * Math.PI / 180; scene.add(g);

    const tex = new THREE.TextureLoader();

    g.add(new THREE.Mesh(
        new THREE.SphereGeometry(1, 64, 64),
        new THREE.MeshPhongMaterial({
            map: tex.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg'),
            specularMap: tex.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg'),
            normalMap: tex.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg'),
            shininess: 30
        })
    ));

    g.add(new THREE.Mesh(
        new THREE.SphereGeometry(1.012, 64, 64),
        new THREE.MeshStandardMaterial({
            map: tex.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png'),
            transparent: true, opacity: 0.85
        })
    ));

    const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.032, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0xff0033, transparent: true, opacity: 0.9 })
    );
    dot.position.set(1.05, 0.38, 0.25);
    g.add(dot);

    const animate = () => {
        requestAnimationFrame(animate);
        const t = Date.now() * 0.003;
        dot.scale.setScalar(1 + Math.sin(t * 8) * 0.3);
        dot.material.opacity = 0.7 + Math.sin(t * 6) * 0.3;
        renderer.render(scene, camera);
    };
    animate();
})();
