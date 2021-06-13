import './style.css'
import * as THREE from 'three';
import { CircleGeometry, WebGL1Renderer } from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
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
camera.position.setZ(50);
rederer.render(scene, camera);

/**========================================================================
 *                           3.Mesh = geometry + material
 *========================================================================**/
const geometry = new THREE.TorusGeometry(10,3,16,100);
const material = new THREE.MeshStandardMaterial({color:0xff6347});
const torus = new THREE.Mesh(geometry,material);
scene.add(torus);

/**========================================================================
 *?                           Light
 *========================================================================**/
const pointLight = new THREE.PointLight(0xffffff); 
pointLight.position.set(5,5,5);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight,ambientLight);
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200,50);
scene.add(lightHelper, gridHelper);

/**========================================================================
 *?                           OrbitControls
                            ce met dans animation update 
 *========================================================================**/
const controls = new OrbitControls(camera,rederer.domElement)

/**========================================================================
 *                           Function
 *========================================================================**/
function animate(){
    requestAnimationFrame(animate);
    torus.rotation.x += 0.009;
    torus.rotation.y += 0.009;
    torus.rotation.z += 0.005
    controls.update();
    rederer.render(scene,camera);
}
animate();
function addStar(){
    const geometry = new THREE.SphereGeometry(0.25,24,24);
    const material = new THREE.MeshStandardMaterial({color:0xffffff});
    const star = new THREE.Mesh(geometry,material);
    const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
    star.position.set(x,y,z);
    scene.add(star);
}
Array(200).fill().forEach(addStar);
const spaceTexture = new THREE.TextureLoader().load('space4.png');
scene.background = spaceTexture;
const olitexture =  new THREE.TextureLoader().load('olipt1.jpg');
const oli = new THREE.Mesh(
    new THREE.BoxGeometry(3,3,3),
    new THREE.MeshBasicMaterial({map:olitexture})
);
scene.add(oli);
const moonTexture =  new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('moon.jpg');
const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3,32,32),
    new THREE.MeshStandardMaterial( { 
        map: moonTexture,
        normalMap: normalTexture
    })
);
scene.add(moon);
moon.position.z = 30;
moon.position.setX(-10);
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