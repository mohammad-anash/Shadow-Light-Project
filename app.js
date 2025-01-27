import * as THREE from 'three';
import { ThreeMFLoader } from 'three/examples/jsm/Addons.js';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const canvas = document.getElementById('canvas');
const [width, heigth] = [window.innerWidth, window.innerHeight];

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width / heigth);
camera.position.z = 10;
camera.position.y = 5;

// light
const directionalLight = new THREE.DirectionalLight('white', 3);
directionalLight.position.y = 4;
directionalLight.position.z = 4;
directionalLight.position.x = 3;

directionalLight.shadow.radius = 10;

directionalLight.castShadow = true;
scene.add(directionalLight);

directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;

const Plane = new THREE.PlaneGeometry(20, 20, 1);
const PlaneMaterial = new THREE.MeshStandardMaterial({ color: 'white' });
const PlaneMesh = new THREE.Mesh(Plane, PlaneMaterial);
PlaneMesh.rotation.x = -Math.PI / 2;

PlaneMesh.receiveShadow = true;
scene.add(PlaneMesh);

// controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const cube = new THREE.BoxGeometry(3, 3, 3);
const cubeMaterial = new THREE.MeshStandardMaterial({ color: 'yellow' });
const cubeMesh = new THREE.Mesh(cube, cubeMaterial);
cubeMesh.position.y = 1.5;
cubeMesh.castShadow = true;
scene.add(cubeMesh);

const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.shadowMap.enabled = true;

renderer.setSize(width, heigth);

let clock = new THREE.Clock();
const radius = 10; // Distance from the object
const center = new THREE.Vector3(0, 0, 0); // Center of the Kaaba

function tick() {
  controls.update();

  const elapsedTime = clock.getElapsedTime();

  directionalLight.position.x = center.x + radius * Math.cos(elapsedTime);
  directionalLight.position.z = center.z + radius * Math.sin(elapsedTime);
  directionalLight.position.y = 5;

  window.requestAnimationFrame(tick);
  renderer.render(scene, camera);
}

tick();
