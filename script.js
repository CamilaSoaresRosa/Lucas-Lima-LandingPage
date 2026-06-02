gsap.registerPlugin(ScrollTrigger,ScrollSmoother,SplitText);

ScrollSmoother.create({
    smooth: 1.5,
    effects: true
});

//animações hero
gsap.from(".hero", {
    opacity: 0,
    duration: 1
});

gsap.from(".pessoa", {
    x: 200,
    duration: 2,

    scrollTrigger: {
        trigger: ".pessoa",
        start: "0% 70%",
        end: "100% 60%",
        scrub: 2,
    }
});


gsap.from(".creci", {
    opacity: 0,
    filter: "blur(5px)",
})

gsap.to(".creci", {
    x:280,

    scrollTrigger: {
        Trigger: ".creci",
        start: "0% 85%",
        end: "100% 50%",
        scrub: 3
    }
})

//animaçoes cards
gsap.from(".card", {
    opacity: 0,
    stagger: .3,
    y: 30,
    filter: "blur(5px)",

    scrollTrigger: {
        trigger: ".card",
        start: "0% 75%",
        scrub: 2,
        end: "100% 40%" 
    }
});


const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('aberto');
    navMenu.classList.toggle('aberta');
});

navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        menuBtn.classList.remove('aberto');
        navMenu.classList.remove('aberta');
    });
});


const canvas = document.getElementById('logo3d');

const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(1000, 1000);
renderer.setClearColor(0x000000, 0);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
camera.position.set(0, 0, 5);

const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 3);
dirLight.position.set(5, 5, 5);
scene.add(dirLight);

const dirLight2 = new THREE.DirectionalLight(0xcccccc, 1);
dirLight2.position.set(-5, -3, -5);
scene.add(dirLight2);

let model = null;
let isDragging = false;
let previousMouse = { x: 0, y: 0 };
let rotationSpeed = { x: 0, y: 0.005 }; // giro automático suave

const gltfLoader = new THREE.GLTFLoader();
gltfLoader.load(
    'imagens/logo_3d_pro_site_do_luquinhas.glb',
    (gltf) => {
        model = gltf.scene;

        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);

        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        model.scale.setScalar(2.5 / maxDim);

        model.traverse((child) => {
            if (child.isMesh) {
                child.material = new THREE.MeshStandardMaterial({
                    color: 0xC0C0C0,
                    metalness: 0.9,
                    roughness: 0.2,
                });
            }
        });

        scene.add(model);
    },
    undefined,
    (error) => console.error('Erro:', error)
);

// arrastar com o mouse
canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    previousMouse = { x: e.clientX, y: e.clientY };
});

window.addEventListener('mouseup', () => {
    isDragging = false;
});

window.addEventListener('mousemove', (e) => {
    if (!isDragging || !model) return;
    const dx = e.clientX - previousMouse.x;
    const dy = e.clientY - previousMouse.y;
    model.rotation.y += dx * 0.01;
    model.rotation.x += dy * 0.01;
    previousMouse = { x: e.clientX, y: e.clientY };
});

// arrastar com o dedo (mobile)
canvas.addEventListener('touchstart', (e) => {
    isDragging = true;
    previousMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
});

window.addEventListener('touchend', () => isDragging = false);

window.addEventListener('touchmove', (e) => {
    if (!isDragging || !model) return;
    const dx = e.touches[0].clientX - previousMouse.x;
    const dy = e.touches[0].clientY - previousMouse.y;
    model.rotation.y += dx * 0.01;
    model.rotation.x += dy * 0.01;
    previousMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
});

function animate() {
    requestAnimationFrame(animate);
    if (model && !isDragging) {
        model.rotation.y += 0.005; // gira sozinha quando não tá arrastando
    }
    renderer.render(scene, camera);
}
animate();