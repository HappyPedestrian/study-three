/*
 * @Description:
 * @Autor: Happy_Pedestrian
 * @Date: 2021-02-25 15:21:39
 * @LastEditors: Happy_Pedestrian
 * @LastEditTime: 2021-11-18 11:23:20
 */

import * as THREE from 'three'
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls'

export const initThree = function(containerId) {
  const width = document.getElementById(containerId).clientWidth;
  const height = document.getElementById(containerId).clientHeight;
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  });
  renderer.setSize(width, height);
  document.getElementById(containerId).appendChild(renderer.domElement);
  renderer.setClearColor(0xf6f6f6, 1.0);
  return renderer;
};

export const initCamera = function(
  {render,
  scene,
  position = { x: 0, y: 1000, z: 0 },
  up = { x: 0, y: 1, z: 0 }}
) {
  const { clientWidth, clientHeight } = render.domElement;

  const camera = new THREE.PerspectiveCamera(60, clientWidth / clientHeight, 1, 10000);
  camera.position.x = position.x;
  camera.position.y = position.y;
  camera.position.z = position.z;
  camera.up.x = up.x;
  camera.up.y = up.y;
  camera.up.z = up.z;
  camera.lookAt(scene.position);
  return camera;
};

export const initControl = function(camera, dom, option) {
  const controls = new TrackballControls(camera, dom);
  Object.assign(controls, option);
  return controls;
}
export const initDirectionalLight = function({
  scene,
  position = { x: 100, y: 100, z: 200 },
  color = 0xffffff,
  intensity = 1
} = {}) {
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(position.x, position.y, position.z);
  scene.add(light);
  return light;
};

export const initAmbientLight = function ({
  scene,
  position = {
    x: 100, y: 100, z: 200
  },
  color = 0XFFFFFF,
} = {}) {
  const light = new THREE.AmbientLight(color);
  light.position.set(position.x, position.y, position.z);
  scene.add(light);
  return(light);
}