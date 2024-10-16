import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const geometries = [
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.ConeGeometry(0.5, 1, 32),
  new THREE.CylinderGeometry(0.5, 0.5, 1, 32),
  new THREE.SphereGeometry(0.5, 32, 32),
  new THREE.TorusGeometry(0.5, 0.2, 16, 100)
];

const materials = [
  new THREE.MeshBasicMaterial({ color: 0xff0000 }), // Red
  new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // Green
  new THREE.MeshBasicMaterial({ color: 0x0000ff }), // Blue
  new THREE.MeshBasicMaterial({ color: 0xffff00 }), // Yellow
  new THREE.MeshBasicMaterial({ color: 0xff00ff })  // Magenta
];

const meshes = geometries.map((geometry, index) => new THREE.Mesh(geometry, materials[index]));

meshes[0].position.x = -3;  // Box
meshes[1].position.x = -1.5; // Cone
meshes[2].position.x = 0;    // Cylinder
meshes[3].position.x = 1.5;  // Sphere
meshes[4].position.x = 3;    // Torus

meshes.forEach(mesh => scene.add(mesh));

camera.position.z = 5;

function animate() {

  meshes.forEach((mesh, index) => {
    mesh.rotation.x += 0.01 + 0.01 * index;
    mesh.rotation.y += 0.01 + 0.01 * index;
    
    mesh.position.y = Math.sin(Date.now() * 0.001 * (index + 1)) * 0.2;
  });

  renderer.render(scene, camera);
}