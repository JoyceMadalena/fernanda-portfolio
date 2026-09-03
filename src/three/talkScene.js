import * as THREE from "three";

export function createTalkScene(container) {
  if (!container) {
    return;
  }

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    38,
    container.clientWidth / container.clientHeight,
    0.1,
    100,
  );

  camera.position.set(0, 0, 9);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  renderer.setSize(container.clientWidth, container.clientHeight);

  renderer.setClearColor(0x000000, 0);

  container.appendChild(renderer.domElement);

  const group = new THREE.Group();

  scene.add(group);

  const pink = new THREE.MeshStandardMaterial({
    color: 0xff3fa4,
    roughness: 0.2,
    metalness: 0.1,
  });

  const pinkSoft = new THREE.MeshStandardMaterial({
    color: 0xff76b8,
    roughness: 0.18,
    metalness: 0.05,
    transparent: true,
    opacity: 0.72,
  });

  const purple = new THREE.MeshStandardMaterial({
    color: 0x9b6cff,
    roughness: 0.2,
    metalness: 0.08,
    transparent: true,
    opacity: 0.7,
  });

  const blue = new THREE.MeshStandardMaterial({
    color: 0x3155ff,
    roughness: 0.2,
    metalness: 0.08,
    transparent: true,
    opacity: 0.65,
  });

  const objects = [];

  function addSphere(x, y, z, radius, material, speed, amplitude) {
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(radius, 32, 32),
      material,
    );

    mesh.position.set(x, y, z);

    mesh.userData = {
      x,
      y,
      speed,
      amplitude,
      offset: Math.random() * 10,
    };

    group.add(mesh);
    objects.push(mesh);
  }

  function addRing(x, y, z, radius, material, rotation, speed, amplitude) {
    const mesh = new THREE.Mesh(
      new THREE.TorusGeometry(radius, 0.045, 24, 72),
      material,
    );

    mesh.position.set(x, y, z);

    mesh.rotation.set(rotation[0], rotation[1], rotation[2]);

    mesh.userData = {
      x,
      y,
      speed,
      amplitude,
      offset: Math.random() * 10,
    };

    group.add(mesh);
    objects.push(mesh);
  }

  addSphere(5.1, 1.5, 0.1, 0.12, blue, 0.4, 0.15);

  addSphere(-4.9, 0.4, 0, 0.08, blue, 0.5, 0.1);

  addRing(-4.3, -0.7, -0.2, 0.28, pinkSoft, [1.1, 0.3, 0.5], 0.4, 0.1);

  addRing(3.6, 0.2, 0.3, 0.55, purple, [0.7, 0.2, 0.4], 0.25, 0.12);

  addSphere(4.2, -0.8, 0, 0.1, pink, 0.5, 0.11);

  addSphere(-3.4, -1.9, 0.2, 0.12, pinkSoft, 0.45, 0.13);

  addRing(-4.5, -2.6, -0.3, 0.36, blue, [0.3, 0.7, 0.5], 0.35, 0.1);

  addSphere(0.3, -2.8, 0, 0.07, purple, 0.55, 0.09);

  addRing(4.4, -2.4, -0.3, 0.44, pinkSoft, [0.9, 0.2, 0.5], 0.3, 0.12);

  addSphere(3.2, -3, 0.2, 0.08, blue, 0.5, 0.1);

  scene.add(new THREE.AmbientLight(0xffffff, 1.8));

  const directional = new THREE.DirectionalLight(0xffffff, 3);

  directional.position.set(4, 5, 6);

  scene.add(directional);

  const pinkLight = new THREE.PointLight(0xff9bc8, 1.8, 15);

  pinkLight.position.set(-3, 2, 4);

  scene.add(pinkLight);

  let targetX = 0;
  let targetY = 0;

  let currentX = 0;
  let currentY = 0;

  let lastScroll = window.scrollY;

  function onScroll() {
    const scroll = window.scrollY;

    const delta = scroll - lastScroll;

    lastScroll = scroll;

    targetX += delta * 0.0007;

    targetY += delta * 0.00045;

    targetX = THREE.MathUtils.clamp(targetX, -0.3, 0.3);

    targetY = THREE.MathUtils.clamp(targetY, -0.3, 0.3);
  }

  window.addEventListener("scroll", onScroll, {
    passive: true,
  });

  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const time = clock.getElapsedTime();

    currentX = THREE.MathUtils.lerp(currentX, targetX, 0.035);

    currentY = THREE.MathUtils.lerp(currentY, targetY, 0.035);

    group.rotation.x = currentX;

    group.rotation.y = currentY;

    objects.forEach((object) => {
      const data = object.userData;

      object.position.y =
        data.y + Math.sin(time * data.speed + data.offset) * data.amplitude;

      object.position.x =
        data.x +
        Math.cos(time * data.speed * 0.7 + data.offset) * data.amplitude * 0.45;

      object.rotation.x += 0.0015;

      object.rotation.y += 0.001;
    });

    renderer.render(scene, camera);
  }

  animate();

  function resize() {
    const width = container.clientWidth;

    const height = container.clientHeight;

    if (width <= 0 || height <= 0) {
      return;
    }

    camera.aspect = width / height;

    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
  }

  window.addEventListener("resize", resize);

  resize();
}
