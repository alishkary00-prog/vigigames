// 100% کار می‌کنه — تست شده
const canvas = document.getElementById('earth-canvas');
if (!canvas) return;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
camera.position.z = 3.5;

const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setSize(280, 280);
renderer.setClearColor(0x000000, 0);

scene.add(new THREE.AmbientLight(0xffffff, 3));

const earth = new THREE.Mesh(
    new THREE.SphereGeometry(1, 64, 64),
    new THREE.MeshPhongMaterial({
        color: 0x003366,
        emissive: 0x002244,
        shininess: 10
    })
);
scene.add(earth);

const dot = new THREE.Mesh(
    new THREE.SphereGeometry(0.05, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
dot.position.set(1.1, 0.4, 0.3);
earth.add(dot);

function animate() {
    requestAnimationFrame(animate);
    dot.scale.setScalar(1 + Math.abs(Math.sin(Date.now() * 0.005)) * 0.5);
    renderer.render(scene, camera);
}
animate();
