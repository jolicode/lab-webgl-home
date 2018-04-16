import * as THREE from 'three';

import GLTFLoader from './GLTFLoader.js';
GLTFLoader(THREE); // eslint-disable-line no-unused-vars

export default class HomeScene {
  constructor(scene) {
    this.scene = scene;

    this.textureLoader = new THREE.TextureLoader();

    this.scene.fog = new THREE.Fog(0xffffff, 12, 16);

    var ambientlight = new THREE.AmbientLight(0x999999, 0.5); // soft white light
    this.scene.add(ambientlight);

    var directionalLight = new THREE.PointLight(0xffffff, 0.5, 100);
    this.scene.add(directionalLight);
    directionalLight.position.set(3, 1, 2);

    this.pointLight = new THREE.PointLight(0xffffff, 0.5);
    this.scene.add(this.pointLight);
    this.pointLight.position.set(-2, 4, -4);
    this.pointLight.castShadow = true;
    this.pointLight.shadow.bias = 0.01;
    this.pointLight.shadow.mapSize.width = 1024;
    this.pointLight.shadow.mapSize.height = 1024;

    const loader = new THREE.GLTFLoader();
    loader.load('./assets/objects/joliHome.glb', gltf => {
      let object = gltf.scene;
      let envMap = this.getEnvMapCube('./assets/images/', '.jpg');

      object.traverse(node => {
        if (
          node.material &&
          (node.material.isMeshStandardMaterial ||
            (node.material.isShaderMaterial &&
              node.material.envMap !== undefined))
        ) {
          if (
            node.name === 'computerMat_0' ||
            node.name === 'ipadScreen' ||
            node.name === 'ipadExtMat_1' ||
            node.name === 'phoneMat_0' ||
            node.name === 'phoneMat_1' ||
            node.name === 'phoneMat_2' ||
            node.name === 'phoneMat_3' ||
            node.name === 'mouseMat_0' ||
            node.name === 'cupEmptyMat_0'
          ) {
            node.material.envMap = envMap;
            node.material.envMapIntensity = 0.3;
          }
          node.material.needsUpdate = true;
        }
        if (node.isMesh && node.name !== 'around') {
          node.castShadow = true;
        }
        if (node.name === 'sol') {
          node.material.emissive = new THREE.Color(0xf6d23d);
          node.material.emissiveIntensity = 0.8;
          node.receiveShadow = true;
          node.material.needsUpdate = true;
        }
      });
      this.scene.add(object);

      var animations = gltf.animations;
      this.mixer = new THREE.AnimationMixer(gltf.scene);
      this.mixer.timeScale = 2;
      this.animation = animations[0];
      let action = this.mixer.clipAction(this.animation);
      action.play();
    });

    this.prevTime = 0;
  }

  animate(time) {
    const dt = (time - this.prevTime) / 1000;
    if (this.mixer) {
      this.mixer.update(dt);
    }
    this.pointLight.position.y = Math.abs(Math.cos(time * 0.0001)) + 4;
    this.pointLight.position.x = Math.cos(time * 0.0001);
    this.prevTime = time;
  }

  getEnvMapCube(path, format) {
    var urls = [
      path + 'px' + format,
      path + 'nx' + format,
      path + 'py' + format,
      path + 'ny' + format,
      path + 'pz' + format,
      path + 'nz' + format,
    ];
    let envMap = new THREE.CubeTextureLoader().load(urls);
    envMap.mapping = THREE.CubeReflectionMapping;
    envMap.format = THREE.RGBFormat;
    return envMap;
  }

  getEnvMapSphere(path) {
    let textureSphere = this.textureLoader.load(path);
    textureSphere.mapping = THREE.SphericalReflectionMapping;
    return textureSphere;
  }
}
