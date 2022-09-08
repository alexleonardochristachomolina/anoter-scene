import './style.css'
import * as THREE from 'three'
import { Geometry, Mesh, Scene } from 'three';
import gsap from 'gsap'
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
//import imageSource from './assets/pipe/color.jpg'

//Debug
//console.log(imageSource)

//Textures


const loadingManager = new THREE.LoadingManager()



//texture
const textureLoader = new THREE.TextureLoader(loadingManager)
const Texture = textureLoader.load('/assets/colorGlass/color.jpg')
const Texture1 = textureLoader.load('/assets/building/color.jpg')
const metalRoses = textureLoader.load('/assets/metalRoses/color.jpg')
const ambientMetalRoses = textureLoader.load('/assets/metalRoses/ambient.jpg')
const heightMetalRoses = textureLoader.load('/assets/metalRoses/height.png')
const metalMetalRoses = textureLoader.load('/assets/metalRoses/metal.jpg')
const normalMetalRoses = textureLoader.load('/assets/metalRoses/normal.jpg')
const opacityMetalRoses = textureLoader.load('/assets/metalRoses/opacity.jpg')
const roughMetalRoses = textureLoader.load('/assets/metalRoses/rough.jpg')

// metalRoses.repeat.x = 2
// metalRoses.repeat.y = 3
// metalRoses.wrapS = THREE.RepeatWrapping
// metalRoses.wrapT = THREE.RepeatWrapping
// metalRoses.offset.x = 0.5 
// metalRoses.rotation = Math.PI * 0.25
// metalRoses.center.x = 0.5
// metalRoses.center.y = 0.5

metalRoses.minFilter = THREE.NearestFilter
Texture.minFilter = THREE.NearestFilter
Texture1.minFilter = THREE.NearestFilter
    
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

// const geometry = new THREE.Geometry()

// for(let i = 0; i < 50; i++)
// {
//     for(let j = 0; j < 3; j++)
//     {
//         geometry.vertices.push(new THREE.Vector3(
//             (Math.random() - 0.5) * 4,
//             (Math.random() - 0.5) * 4,
//             (Math.random() - 0.5) * 4,
//         ))
//     }
//     const verticesIndex = i * 3
//     geometry.faces.push(new THREE.Face3(
//         verticesIndex,
//         verticesIndex + 1,
//         verticesIndex + 2
//     ))
// }

// const material = new THREE.MeshBasicMaterial({
//     color: 0xff0000
// })

// const mesh = new THREE.Mesh(geometry, material)
// set.add(mesh)
// const geometry = new THREE.BufferGeometry()

// const count = 50
// const positionsArray = new Float32Array(count * 3 * 3)

// for (let i = 0; i < count * 3 * 3; i++)
// {
//     positionsArray[i] = (Math.random() - 0.5) * 4
// }

// const positionAttrib = new THREE.BufferAttribute(positionsArray, 3)


// geometry.setAttribute('position', positionAttrib)

// const material = new THREE.MeshBasicMaterial({
//     color: 0xff0000,
//     wireframe: true
// })

// const mesh = new THREE.Mesh(geometry, material)
// set.add(mesh)


const group = new THREE.Group()
group.position.y = -1
group.rotation.y = 1
set.add(group)


const parameters = {
    color: 0xffff00,
    spin: () => {
        gsap.to(mesh.rotation, {duration: 1,y: mesh.rotation.y + 10})
    }
}

const geometry = new THREE.BoxBufferGeometry(1,3,1, 2, 1, 3)
const material = new THREE.MeshBasicMaterial({map: Texture1})
console.log(geometry.attributes.uv)
const cube1 = new THREE.Mesh(
    geometry,material
)
    
cube1.position.y = 1
group.add(cube1)

const cube2 = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32),
    new THREE.MeshBasicMaterial({map: Texture})
)
cube2.position.x = 2
group.add(cube2)

// const cube3 = new THREE.Mesh(
//     new THREE.BoxGeometry(1,1,1),
//     new THREE.MeshBasicMaterial({map: texture2})
// )
// cube1.visible = false
// cube3.position.x = -2
// group.add(cube3)


const names = new THREE.MeshBasicMaterial({map: metalRoses})
const cube4 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    names
)
cube4.position.x = -2
group.add(cube4)

//Debug
const gui = new dat.GUI({closed: true, width: 400})
gui.hide()


gui.add(group.position, 'y')
.min(-3)
.max(3)
.step(0.01)
.name('Elevation')

gui.add(cube1, 'visible')
gui.add(names, 'wireframe')
gui
.addColor(parameters, 'color')
.onChange(() => {
    names.color.set(parameters.color)
})

gui.add(parameters, 'spin')

//gui.add(group.position, 'x', -3, 3, 0.01)
//gui.add(group.position, 'z', -3, 3, 0.01)


//Camera
const eye = new THREE.PerspectiveCamera(75, size.width/size.height, 0.1, 100);
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




//gsap.to(cube1.position, {duration: 1, delay: 4, y:0})
//gsap.to(cube3.position, {duration: 1, delay: 2, x:-1})
//gsap.to(cube2.position, {duration: 1, delay: 3, x:1})
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

