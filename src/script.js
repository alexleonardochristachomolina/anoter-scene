import './style.css'
import * as THREE from 'three'
import { Mesh, Scene } from 'three';
import gsap from 'gsap'
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

//Size
const size = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    //update size
    size.width = window.innerWidth,
    size.height = window.innerHeight

    //Update camera
    eye.aspect = size.width / size.height
    eye.updateProjectionMatrix()

    //Update Renderer
    renderer.setSize(size.width, size.height)

})

window.addEventListener('dblclick', () => 
{
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
    if(!fullscreenElement)
{
    if(canvas.requestFullscreen)
    {
        canvas.requestFullScreen()
    }
    else if(canvas.webkitRequestFullscreen)
    {
        canvas.webkitRequestFullscreen()
    }
}
else
{
    document.exitFullscreen()
}
})

//Cursor
const m = {
    x: 0,
    y: 0,
}
window.addEventListener('mousemove', (e) => {
    m.x = e.clientX / size.width - 0.5
    m.y = -(e.clientX / size.height - 0.5)
    console.log(m.x)
})


//console.log(THREE)




const canvas = document.querySelector('canvas.webgl');



//Scene
const set = new THREE.Scene()

//Blue Cube
// const box = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial({color: 0x7492B9});
// const mesh = new THREE.Mesh(box, material);
// mesh.position.z = 1
// mesh.position.y = 0
// mesh.position.x = 0
// set.add(mesh)

const group = new THREE.Group()
group.position.y = -1
group.rotation.y = 1
set.add(group)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 0xff00ff})
)
cube1.position.y = 1
group.add(cube1)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 0x00ff2a})
)
cube2.position.x = 2
group.add(cube2)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 0xffff2a})
)
cube3.position.x = -2
group.add(cube3)

//Camera
const eye = new THREE.PerspectiveCamera(75, size.width/size.height, 1, 1000);
// const aspect = size.width/size.height
// const eye = new THREE.OrthographicCamera(-1 * aspect, 1 * aspect, 1, -1, 0.1, 100)
eye.position.z = 3
// console.log(eye.position.length())
set.add(eye)

//Controls
const controls = new OrbitControls(eye, canvas)
controls.enableDamping = true
// controls.target.y = 2
// controls.update()

//eye.lookAt(mesh.position)
//new THREE.Vector3(3,0,0)

// mesh.position.set(0.7,0.5,1)
// mesh.scale.set(0.5,0.5,1)

//Rotation
// mesh.rotation.reorder('YXZ')
// mesh.rotation.x = Math.PI * 0.25
// mesh.rotation.y = Math.PI * 0.25



//Axes Helper
const helper = new THREE.AxesHelper()
set.add(helper)

//Renderer2

const renderer = new THREE.WebGLRenderer({
    canvas
});

renderer.setSize(size.width, size.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
//(Math.min(window.devicePixelRatio, 2))

//Time
//let time = Date.now()
//const clock = new THREE.Clock()




gsap.to(cube1.position, {duration: 1, delay: 4, y:0})
gsap.to(cube3.position, {duration: 1, delay: 2, x:-1})
gsap.to(cube2.position, {duration: 1, delay: 3, x:1})
//Animation
const tickTock = () => 
{
    //const elapsedTime = clock.getElapsedTime()
   // console.log(elapsedTime)
   // const currentTime = Date.now()
   // const deltaTime = currentTime - time
   // time = currentTime

   //Update Camera
//    eye.position.x = m.x * 10
//    eye.position.y = m.y * 10
    // eye.position.x = Math.sin(m.x * Math.PI * 2) * 3
    // eye.position.z = Math.cos(m.x * Math.PI * 2) * 3
    // eye.position.y = m.y * 5
    // eye.lookAt(group.position)
//new THREE.Vector3()
   // console.log(deltaTime)
    //Update Object
    //cube3.rotation.y = elapsedTime * Math.PI * 2
   // eye.position.y = Math.sin(elapsedTime)
   // eye.position.x = Math.sin(elapsedTime)
   // eye.lookAt(cube3.position)
    //Render 
    controls.update()
    renderer.render(set, eye)

    window.requestAnimationFrame(tickTock)
}

tickTock()

