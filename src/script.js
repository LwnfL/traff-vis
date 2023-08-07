import './style.css'
import Experience from './Experience/Experience.js'

const experience = new Experience(document.querySelector('canvas.webgl'))
// import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import * as dat from 'lil-gui'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'


function setupMapLayer() {
    new THREE.TextureLoader().load("map.png", function (oTexture) {
        oTexture.encoding = THREE.sRGBEncoding;
        var oFrontSideGeometry = new THREE.PlaneGeometry(1280, 800);
        var oMaterialFrontSide = new THREE.MeshBasicMaterial({ map: oTexture, side: THREE.DoubleSide });
        var oFlagFrontMesh = new THREE.Mesh(oFrontSideGeometry, oMaterialFrontSide);
        oFlagFrontMesh.geometry.center();
        var oFlagObject = new THREE.Object3D();
        oFlagObject.add(oFlagFrontMesh);
        oFlagObject.position.set(0, 0, 0);
        oScene.add(oFlagObject);
        oCamera.position.z = 500;
        renderScene();
        setupMarker();
    });
    }
    
function setupMarker() {
    var oGeometry = new THREE.SphereGeometry(10, 100, 100);
    var oMaterial = new THREE.MeshBasicMaterial({ color: 0xFF0000 });
    var oSphere = new THREE.Mesh(oGeometry, oMaterial);
    
    let oLatitude = 40.8746966; //North-South
    let oLongitude = 29.3988391; //East-West
    
    //latitude goes between -90 degrees and +90 degrees
    let normalizedLatitude = 2.0 * (((oLatitude + 90.0) / 180.0) - 0.5);
    //Longitude goes between -180 and +180 degrees
    let normalizedLongitude = 2.0 * (((oLongitude + 180.0) / 360.0) - 0.5);
    
    //Our bounds along the x-axis are -200, to 200
    //and along the x-axis are -100 to 100.
    let oXLocation = normalizedLongitude * 640;
    let oYLocation = normalizedLatitude * 400;
    oSphere.position.set(oXLocation, oYLocation, 10);
    oScene.add(oSphere);
    renderScene();
}


function calcPosFromLatLonRad(radius, lat, lon) {

    var spherical = new THREE.Spherical(
      radius,
      THREE.Math.degToRad(90 - lon),
      THREE.Math.degToRad(lat)
    );
  
    var vector = new THREE.Vector3();
    vector.setFromSpherical(spherical);
  
    console.log(vector.x, vector.y, vector.z);
    return vector;
  }
  
  calcPosFromLatLonRad(0.5, -74.00597, 40.71427);


// /**
//  * Loaders
//  */
// const gltfLoader = new GLTFLoader()
// const textureLoader = new THREE.TextureLoader()
// const cubeTextureLoader = new THREE.CubeTextureLoader()

// /**
//  * Base
//  */
// // Debug
// const gui = new dat.GUI()
// const debugObject = {}

// // Canvas
// const canvas = document.querySelector('canvas.webgl')

// // Scene
// const scene = new THREE.Scene()

// /**
//  * Update all materials
//  */
// const updateAllMaterials = () =>
// {
//     scene.traverse((child) =>
//     {
//         if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
//         {
//             // child.material.envMap = environmentMap
//             child.material.envMapIntensity = debugObject.envMapIntensity
//             child.material.needsUpdate = true
//             child.castShadow = true
//             child.receiveShadow = true
//         }
//     })
// }

// /**
//  * Environment map
//  */
// const environmentMap = cubeTextureLoader.load([
//     '/textures/environmentMap/px.jpg',
//     '/textures/environmentMap/nx.jpg',
//     '/textures/environmentMap/py.jpg',
//     '/textures/environmentMap/ny.jpg',
//     '/textures/environmentMap/pz.jpg',
//     '/textures/environmentMap/nz.jpg'
// ])

// environmentMap.encoding = THREE.sRGBEncoding

// // scene.background = environmentMap
// scene.environment = environmentMap

// debugObject.envMapIntensity = 0.4
// gui.add(debugObject, 'envMapIntensity').min(0).max(4).step(0.001).onChange(updateAllMaterials)

// /**
//  * Models
//  */
// let foxMixer = null

// gltfLoader.load(
//     '/models/Fox/glTF/Fox.gltf',
//     (gltf) =>
//     {
//         // Model
//         gltf.scene.scale.set(0.02, 0.02, 0.02)
//         scene.add(gltf.scene)

//         // Animation
//         foxMixer = new THREE.AnimationMixer(gltf.scene)
//         const foxAction = foxMixer.clipAction(gltf.animations[0])
//         foxAction.play()

//         // Update materials
//         updateAllMaterials()
//     }
// )

// /**
//  * Floor
//  */
// const floorColorTexture = textureLoader.load('textures/dirt/color.jpg')
// floorColorTexture.encoding = THREE.sRGBEncoding
// floorColorTexture.repeat.set(1.5, 1.5)
// floorColorTexture.wrapS = THREE.RepeatWrapping
// floorColorTexture.wrapT = THREE.RepeatWrapping

// const floorNormalTexture = textureLoader.load('textures/dirt/normal.jpg')
// floorNormalTexture.repeat.set(1.5, 1.5)
// floorNormalTexture.wrapS = THREE.RepeatWrapping
// floorNormalTexture.wrapT = THREE.RepeatWrapping

// const floorGeometry = new THREE.CircleGeometry(5, 64)
// const floorMaterial = new THREE.MeshStandardMaterial({
//     map: floorColorTexture,
//     normalMap: floorNormalTexture
// })
// const floor = new THREE.Mesh(floorGeometry, floorMaterial)
// floor.rotation.x = - Math.PI * 0.5
// scene.add(floor)

// /**
//  * Lights
//  */
// const directionalLight = new THREE.DirectionalLight('#ffffff', 4)
// directionalLight.castShadow = true
// directionalLight.shadow.camera.far = 15
// directionalLight.shadow.mapSize.set(1024, 1024)
// directionalLight.shadow.normalBias = 0.05
// directionalLight.position.set(3.5, 2, - 1.25)
// scene.add(directionalLight)

// gui.add(directionalLight, 'intensity').min(0).max(10).step(0.001).name('lightIntensity')
// gui.add(directionalLight.position, 'x').min(- 5).max(5).step(0.001).name('lightX')
// gui.add(directionalLight.position, 'y').min(- 5).max(5).step(0.001).name('lightY')
// gui.add(directionalLight.position, 'z').min(- 5).max(5).step(0.001).name('lightZ')

// /**
//  * Sizes
//  */
// const sizes = {
//     width: window.innerWidth,
//     height: window.innerHeight
// }

// window.addEventListener('resize', () =>
// {
//     // Update sizes
//     sizes.width = window.innerWidth
//     sizes.height = window.innerHeight

//     // Update camera
//     camera.aspect = sizes.width / sizes.height
//     camera.updateProjectionMatrix()

//     // Update renderer
//     renderer.setSize(sizes.width, sizes.height)
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// })

// /**
//  * Camera
//  */
// // Base camera
// const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
// camera.position.set(6, 4, 8)
// scene.add(camera)

// // Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

// /**
//  * Renderer
//  */
// const renderer = new THREE.WebGLRenderer({
//     canvas: canvas,
//     antialias: true
// })
// renderer.physicallyCorrectLights = true
// renderer.outputEncoding = THREE.sRGBEncoding
// renderer.toneMapping = THREE.CineonToneMapping
// renderer.toneMappingExposure = 1.75
// renderer.shadowMap.enabled = true
// renderer.shadowMap.type = THREE.PCFSoftShadowMap
// renderer.setClearColor('#211d20')
// renderer.setSize(sizes.width, sizes.height)
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// /**
//  * Animate
//  */
// const clock = new THREE.Clock()
// let previousTime = 0

// const tick = () =>
// {
//     const elapsedTime = clock.getElapsedTime()
//     const deltaTime = elapsedTime - previousTime
//     previousTime = elapsedTime

//     // Update controls
//     controls.update()

//     // Fox animation
//     if(foxMixer)
//     {
//         foxMixer.update(deltaTime)
//     }

//     // Render
//     renderer.render(scene, camera)

//     // Call tick again on the next frame
//     window.requestAnimationFrame(tick)
// }

// tick()