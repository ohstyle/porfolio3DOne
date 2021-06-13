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
 *              perspectiveCamera  = 1arg=degré, 2arge= ratio, 3arg=top near right 
 *========================================================================**/


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );

scene.add( camera );
const rederer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

rederer.setPixelRatio(window.devicePixelRatio);
rederer.setSize(window.innerWidth,window.innerHeight);
camera.position.setZ(100);

rederer.render(scene, camera);

/**========================================================================
 *                           3.Mesh = geometry + material
 *========================================================================**/
const geometry = new THREE.TorusGeometry(25,4,10,100);
const material = new THREE.MeshStandardMaterial({color:0xff6347});
const torus = new THREE.Mesh(geometry,material);
scene.add(torus);
const pointLight = new THREE.PointLight(0xffffff); 
pointLight.position.set(5,5,5);
const ambientLight = new THREE.AmbientLight(120,82,255);
scene.add(pointLight,ambientLight);
/**========================================================================
 *                           Function
 *========================================================================**/
function animate(){
    requestAnimationFrame(animate);
    torus.rotation.x += 0.009;
    torus.rotation.y += 0.009;
    rederer.render(scene,camera);
}
animate();

// const loader = new THREE.FontLoader();
// loader.load('fonts/helvetiker_regular.typeface.json', function(font){
//     const geometry = new THREE.TextGeometry('hello ohstyle',{
        
//         font:font,
//         size:80,
//         height: 5,
//         curveSegments: 12,
//         bevelEnabled: true,
//         bevelThickness: 10,
//         bevelSize: 8,
//         bevelOffset: 0,
//         bevelSegments: 5
//     });
// });