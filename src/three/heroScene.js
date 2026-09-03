import * as THREE from "three";

export function createHeroScene(container) {
  if (!container) return;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    35,
    container.clientWidth / container.clientHeight,
    0.1,
    100,
  );

  function updateCamera() {
    const width = window.innerWidth;

    if (width >= 1440) {
      camera.position.set(0, 0, 7);
    } else if (width >= 1200) {
      camera.position.set(0, 0, 7.4);
    } else if (width >= 1024) {
      camera.position.set(0, 0, 7.9);
    } else if (width >= 768) {
      camera.position.set(0, 0, 8.5);
    } else {
      camera.position.set(0, 0, 9);
    }

    camera.lookAt(0, 0, 0);
  }

  updateCamera();

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

  renderer.setSize(container.clientWidth, container.clientHeight);

  renderer.outputColorSpace = THREE.SRGBColorSpace;

  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  renderer.toneMappingExposure = 1.15;

  container.appendChild(renderer.domElement);

  const group = new THREE.Group();

  group.position.set(2.6, 0.1, 0);

  scene.add(group);

  const clock = new THREE.Clock();

  const blue = new THREE.Color("#174BFF");

  const blue2 = new THREE.Color("#4168FF");

  const purple = new THREE.Color("#9B6CFF");

  const pink = new THREE.Color("#FF3FA4");

  function gradientColor(value) {
    const color = new THREE.Color();

    const position = THREE.MathUtils.clamp(value, 0, 1);

    if (position < 0.3) {
      color.lerpColors(blue, blue2, position / 0.3);
    } else if (position < 0.65) {
      color.lerpColors(blue2, purple, (position - 0.3) / 0.35);
    } else {
      color.lerpColors(purple, pink, (position - 0.65) / 0.35);
    }

    return color;
  }

  const material = new THREE.MeshPhysicalMaterial({
    vertexColors: true,
    roughness: 0.1,
    metalness: 0.04,
    clearcoat: 1,
    clearcoatRoughness: 0.035,
    reflectivity: 0.55,
    transparent: true,
    opacity: 1,
  });

  function createTube({ phase, radius, scaleX, scaleY, rotation, amplitude }) {
    const segments = 100;
    const radialSegments = 28;

    const points = [];

    for (let i = 0; i <= segments; i++) {
      const t = i / segments;

      const angle = t * Math.PI * 2;

      points.push(
        new THREE.Vector3(
          Math.cos(angle) * scaleX,

          Math.sin(angle) * scaleY,

          Math.sin(angle * 2) * 0.16,
        ),
      );
    }

    const curve = new THREE.CatmullRomCurve3(points, true, "centripetal", 0.5);

    const geometry = new THREE.TubeGeometry(
      curve,
      segments,
      radius,
      radialSegments,
      true,
    );

    const position = geometry.attributes.position;

    const colors = new Float32Array(position.count * 3);

    const tempColor = new THREE.Color();

    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);

      const value = THREE.MathUtils.clamp((x + 1.5) / 3, 0, 1);

      tempColor.copy(gradientColor(value));

      colors[i * 3] = tempColor.r;

      colors[i * 3 + 1] = tempColor.g;

      colors[i * 3 + 2] = tempColor.b;
    }

    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const mesh = new THREE.Mesh(geometry, material);

    mesh.rotation.copy(rotation);

    group.add(mesh);

    const basePositions = new Float32Array(position.array);

    function update(time, deformationForce, scrollProgress) {
      const positions = geometry.attributes.position;

      for (let i = 0; i < positions.count; i++) {
        const x = basePositions[i * 3];

        const y = basePositions[i * 3 + 1];

        const z = basePositions[i * 3 + 2];

        const angle = Math.atan2(y, x);

        const wave1 = Math.sin(angle * 2 + time * 0.75 + phase);

        const wave2 = Math.sin(angle * 3 - time * 0.55 + phase);

        const wave3 = Math.cos(angle + time * 0.4 + phase);

        const organic = amplitude * (wave1 * 0.45 + wave2 * 0.35 + wave3 * 0.2);

        const scrollDeformation =
          deformationForce *
          (Math.sin(angle * 2 + phase + scrollProgress * 2) * 0.7 +
            Math.cos(angle * 3 + scrollProgress) * 0.3);

        const progressive = Math.sin(angle * 2 + phase) * scrollProgress * 0.22;

        const total = organic + scrollDeformation + progressive;

        const length = Math.sqrt(x * x + y * y);

        const safeLength = Math.max(length, 0.001);

        const dirX = x / safeLength;

        const dirY = y / safeLength;

        const breathing = 1 + Math.sin(time * 0.7 + phase) * 0.045;

        positions.setXYZ(
          i,

          x * breathing + dirX * total,

          y * breathing + dirY * total,

          z + wave3 * amplitude * 0.8 + scrollDeformation * 0.32,
        );
      }

      positions.needsUpdate = true;

      geometry.computeVertexNormals();
    }

    return {
      update,
    };
  }

  const tubeA = createTube({
    phase: 0,
    radius: 0.28,
    scaleX: 1.45,
    scaleY: 1.12,
    amplitude: 0.18,
    rotation: new THREE.Euler(0.15, 0.1, 0.15),
  });

  const tubeB = createTube({
    phase: 2,
    radius: 0.27,
    scaleX: 1.25,
    scaleY: 1.02,
    amplitude: 0.21,
    rotation: new THREE.Euler(0.9, -0.35, 0.55),
  });

  const tubeC = createTube({
    phase: 4,
    radius: 0.26,
    scaleX: 1.18,
    scaleY: 0.96,
    amplitude: 0.19,
    rotation: new THREE.Euler(-0.7, 0.55, -0.3),
  });

  scene.add(new THREE.AmbientLight(0xffffff, 1.5));

  const key = new THREE.DirectionalLight(0xffffff, 3.2);

  key.position.set(4, 5, 6);

  scene.add(key);

  const fill = new THREE.DirectionalLight(0xffffff, 1.4);

  fill.position.set(-4, 2, 4);

  scene.add(fill);

  const blueLight = new THREE.PointLight(0x3155ff, 3.5, 12);

  blueLight.position.set(-4, 2, 4);

  scene.add(blueLight);

  const pinkLight = new THREE.PointLight(0xff3fa4, 3.5, 12);

  pinkLight.position.set(4, -2, 4);

  scene.add(pinkLight);

  const purpleLight = new THREE.PointLight(0x9565ff, 2.5, 10);

  purpleLight.position.set(0, 4, -2);

  scene.add(purpleLight);

  let scrollProgress = 0;
  let scrollVelocity = 0;
  let wheelEnergy = 0;

  let previousScroll = window.scrollY;

  function handleWheel(event) {
    const delta = Math.abs(event.deltaY);

    wheelEnergy += Math.min(delta * 0.012, 1);

    wheelEnergy = Math.min(wheelEnergy, 1);
  }

  window.addEventListener("wheel", handleWheel, {
    passive: true,
  });

  function updateScroll() {
    const currentScroll = window.scrollY;

    const difference = currentScroll - previousScroll;

    scrollVelocity += (difference - scrollVelocity) * 0.1;

    previousScroll = currentScroll;

    const hero = document.querySelector("#inicio");

    if (!hero) return;

    const heroStart = hero.offsetTop;

    const heroHeight = hero.offsetHeight;

    scrollProgress = THREE.MathUtils.clamp(
      (currentScroll - heroStart) / heroHeight,
      0,
      1,
    );
  }

  window.addEventListener("scroll", updateScroll, {
    passive: true,
  });

  function animate() {
    requestAnimationFrame(animate);

    const time = clock.getElapsedTime();

    const scrollSpeed = Math.min(Math.abs(scrollVelocity) * 0.022, 1);

    const interaction = Math.max(scrollSpeed, wheelEnergy);

    const deformationForce = interaction * 0.42;

    tubeA.update(time, deformationForce, scrollProgress);

    tubeB.update(time + 1.3, deformationForce, scrollProgress);

    tubeC.update(time + 2.6, deformationForce, scrollProgress);

    const startX = 2.65;

    const middleX = 1.65;

    const endX = 0.35;

    let targetX;

    if (scrollProgress < 0.55) {
      targetX = THREE.MathUtils.lerp(startX, middleX, scrollProgress / 0.55);
    } else {
      targetX = THREE.MathUtils.lerp(
        middleX,
        endX,
        (scrollProgress - 0.55) / 0.45,
      );
    }

    const targetY = THREE.MathUtils.lerp(0.05, 0.35, scrollProgress);

    group.position.x += (targetX - group.position.x) * 0.022;

    group.position.y += (targetY - group.position.y) * 0.022;

    const targetRotationX = 0.1 + scrollProgress * 1.15;

    const targetRotationY = -0.2 + scrollProgress * 2.1;

    const targetRotationZ = 0.05 + scrollProgress * 1.15;

    group.rotation.x += (targetRotationX - group.rotation.x) * 0.022;

    group.rotation.y += (targetRotationY - group.rotation.y) * 0.022;

    group.rotation.z += (targetRotationZ - group.rotation.z) * 0.022;

    const baseScale = THREE.MathUtils.lerp(1.48, 1.62, scrollProgress);

    const breathing = 1 + Math.sin(time * 0.7) * 0.045;

    const interactionScale = 1 + interaction * 0.18;

    const targetScale = baseScale * breathing * interactionScale;

    group.scale.x += (targetScale - group.scale.x) * 0.022;

    group.scale.y = group.scale.x;

    group.scale.z = group.scale.x;

    const stretch = 1 + interaction * 0.22;

    group.scale.x *= 1 + (stretch - 1) * 0.055;

    wheelEnergy *= 0.91;

    scrollVelocity *= 0.93;

    const fadeStart = 0.88;

    const fade = THREE.MathUtils.clamp(
      1 - (scrollProgress - fadeStart) / (1 - fadeStart),
      0,
      1,
    );

    material.opacity = fade;

    const stage = document.querySelector("#hero-stage");

    if (stage) {
      stage.style.opacity = String(fade);

      stage.style.pointerEvents = "none";
    }

    renderer.render(scene, camera);
  }

  function resize() {
    const width = container.clientWidth;

    const height = container.clientHeight;

    if (!width || !height) {
      return;
    }

    camera.aspect = width / height;

    camera.updateProjectionMatrix();

    renderer.setSize(width, height);

    updateCamera();
  }

  window.addEventListener("resize", resize);

  updateScroll();
  resize();
  animate();
}
