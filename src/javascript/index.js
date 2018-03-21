import * as TOOLS from './components/tools.class.js';
import * as THREE from 'three';
import OrbitControls from 'three-orbit-controls';
let OrbitCont = OrbitControls(THREE);
import HomeScene from './components/HomeScene.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  10000
);
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
  gammaOutput: true,
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

camera.position.x = 0;
camera.position.y = 5;
camera.position.z = 6;

const controls = new OrbitCont(camera, renderer.domElement);
controls.target.set(0, 2, 0);
controls.update();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0xf6d23d);

let joliHome = null;

if (document.getElementById('home')) {
  joliHome = new HomeScene(scene); // eslint-disable-line no-unused-vars
  document.getElementById('home').appendChild(renderer.domElement);
}

var framecounter = new TOOLS.FrameRateUI();

// start animating
animate();

function animate(time) {
  requestAnimationFrame(animate);
  if (joliHome) {
    joliHome.animate(time);
  }

  renderer.render(scene, camera);

  // Updating components
  framecounter.update();
}
