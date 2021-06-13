import './style.css'

import * as THREE from 'three';
import { WebGL1Renderer } from 'three';
/**========================================================================
 *                           1.scene
 *                            2.Camera
 *                              3.Renderer
 *========================================================================**/
// const w = 1920;
// const h = 1080;
// const fullWidth = w * 3;
// const fullHeight = h *2;
/**========================================================================
 *             windows.innerWidth = retourne la largeur de la fenetre
 *========================================================================**/
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
scene.add( camera );
const rederer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

rederer.setPixelRatio(window.devicePixelRatio);
rederer.setSize(window.innerWidth,window.innerHeight);
camera.position.setZ(50);
rederer.render(scene, camera);
const geometry = new THREE.TorusGeometry(10,3,16,100);
const material = new THREE.MeshBasicMaterial({color:0xff6347, wireframe:true});
/**========================================================================
 *                           3.Mesh = geometry + material
 *========================================================================**/
const torus = new THREE.Mesh(geometry,material);
scene.add(torus);

/**========================================================================
 *                           Function
 *========================================================================**/
function animate(){
    requestAnimationFrame(animate);
    rederer.render(scene,camera);
}
animate();