import './style.css'
import * as dat from 'lil-gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js';
import { gsap } from 'gsap';
import * as locomotion from './moveCameraXR.js';
import TeleportVR from 'teleportvr';


/**
 * Room creation ( base Three.js code to create rooms)
 */
export function salle(modele3d, bakedJpg){
    /**
     * Selectors
     */
    // Loading bar 
    const loadingBarElement = document.querySelector('.loading-bar');

    // Loading Percent 
    var loadingPercent = document.createElement("h2");
    var loadingPercentContent = document.createTextNode("");
    loadingPercent.className = "loadingPercent"

    /**
    * Base
    */
    //Debug
    const gui = new dat.GUI({
        width: 400
    })

    // Canvas 
    const canvas = document.createElement("canvas");
    canvas.className = 'webgl';
    canvas.setAttribute("id","canvas");
    document.body.insertBefore(canvas, loadingBarElement);
    canvas.style.display = "block"

    // Close button
    var closeIcon = document.getElementById("closeIcon");
    var infoIcon = document.getElementById("infoIcon");
    closeIcon.display = "block";
    infoIcon.display = "block";

    // Scene
    const scene = new THREE.Scene()

    /**
     * Overlay
     */
    const overlayGeometry = new THREE.PlaneBufferGeometry(2, 2, 1, 1)
    const overlayMaterial = new THREE.ShaderMaterial({
        transparent: true, 
        uniforms: {
            uAlpha: { value: 1 }
        },
        vertexShader: `
            void main(){
                gl_Position = vec4(position, 1.0);
            }
        `, 
        fragmentShader: `
        uniform float uAlpha;

            void main(){
                gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
            }
        `
    })
    const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)
    scene.add(overlay)

    /**
    * Loaders
    */
    const loadingManager = new THREE.LoadingManager(
        // Loaded
        () => {
            // console.log("loaded")
            gsap.delayedCall(1, () => {
                gsap.to(overlayMaterial.uniforms.uAlpha, {duration : 4, value: 0});
                loadingBarElement.classList.add('ended');
                loadingBarElement.style.transform = '';
                loadingPercent.innerHTML = '';
            })
        }, 

        // Progress
        (itemUrl, itemsLoaded, itemsTotal) => {
            // console.log("progress")
            const progressRatio = itemsLoaded / itemsTotal
            loadingBarElement.style.transform = `scaleX(${progressRatio})`

            loadingPercent.innerHTML = "";
            loadingPercent.innerHTML = `${Math.round(progressRatio*100)} %`

            var currentDiv = document.querySelector("loading-bar");
            document.body.insertBefore(loadingPercent, currentDiv);
        }
    )

    // Texture loader
    const textureLoader = new THREE.TextureLoader(loadingManager)

    // Draco loader
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('draco/')

    // GLTF loader
    const gltfLoader = new GLTFLoader(loadingManager)
    gltfLoader.setDRACOLoader(dracoLoader)

    /**
    * Textures
    */
    // const bakedTexture = textureLoader.load('baked.jpg')
    const bakedTexture = textureLoader.load(bakedJpg)
    bakedTexture.flipY = false
    bakedTexture.encoding = THREE.sRGBEncoding

    /**
    * Materials
    */
    // Baked material
    const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture })

    /**
    * Model
    */
    gltfLoader.load(
        modele3d, 
        (gltf) =>
        {
            const bakedMesh = gltf.scene.children.find(child => child.name === 'baked')

            scene.add(gltf.scene)
        }
    )

    /**
    * Sizes
    */
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    window.addEventListener('resize', () =>
    {
        // Update sizes
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight

        // Update camera
        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()

        // Update renderer
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })

    /**
    * Camera
    */
    // Base camera
    const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
    camera.position.x = 4
    camera.position.y = 2
    camera.position.z = 4

    scene.add(camera)

    // gui.add(camera.position, 'x').min(-20).max(20).step(0.01).name('camera x')
    // gui.add(camera.position, 'y').min(-20).max(20).step(0.01).name('Plane2 y')
    // gui.add(camera.position, 'z').min(-20).max(20).step(0.01).name('Plane2 z')

    // Controls
    const controls = new OrbitControls(camera, canvas)
    controls.enableDamping = true
    controls.maxPolarAngle = (Math.PI / 2) + 0.1;

    /**
    * Light 
    */
    const light = new THREE.AmbientLight( 0x404040 );
    scene.add( light );

    /**
    * Renderer
    */
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true
    })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputEncoding = THREE.sRGBEncoding

    /** 
    * VR Mode ( button | hands | locomotion )
    */
    document.body.appendChild( VRButton.createButton( renderer ) );
    renderer.xr.enabled = true;
    renderer.setAnimationLoop(function () {
        renderer.render( scene, camera );
    });

    /**
    * Animate
    */
    const clock = new THREE.Clock()

    /**
     * Teleport VR 
     */
    
    const teleportVR = new TeleportVR(scene, camera);
    const controllerModelFactory = new XRControllerModelFactory();  

    // Left hand 
    const controllerGrip0 = renderer.xr.getControllerGrip(0)
    controllerGrip0.add( controllerModelFactory.createControllerModel( controllerGrip0 ) );

    controllerGrip0.addEventListener('connected', (e) => {
        teleportVR.add(0, controllerGrip0, e.data.gamepad)
    })  

    // Right hand
    const controllerGrip1 = renderer.xr.getControllerGrip(1)
    controllerGrip1.add( controllerModelFactory.createControllerModel( controllerGrip1 ) ); 

    controllerGrip1.addEventListener('connected', (e) => {
        teleportVR.add(1, controllerGrip1, e.data.gamepad)
    })


    // test 
    const geometry = new THREE.ConeGeometry( 0.05, 0.14, 32 );
    const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    const cone = new THREE.Mesh( geometry, material );
    cone.rotation.z = 4.75;
    scene.add( cone );

    gui.add(cone.rotation, 'x').min(-60).max(60).step(0.01).name('camera x')
    gui.add(cone.rotation, 'y').min(-60).max(60).step(0.01).name('Plane2 y')
    gui.add(cone.rotation, 'z').min(-60).max(60).step(0.01).name('Plane2 z')
     gui.add(cone.position, 'x').min(-60).max(60).step(0.01).name('position  x')
    gui.add(cone.position, 'y').min(-60).max(60).step(0.01).name('position y')
    gui.add(cone.position, 'z').min(-60).max(60).step(0.01).name('position z')
    // fin test 


    const tick = () =>
    {
        const elapsedTime = clock.getElapsedTime()
        // removeCanvas();
        const test = document.getElementById("canvas");
        const vrButton = document.getElementById("VRButton");
        var loadingBar = document.querySelector(".loading-bar")

        // Update controls
        controls.update()

        // Teleport VR 
        teleportVR.update();
        
        // Render
        renderer.render(scene, camera)

        // Call tick again on the next frame
        window.requestAnimationFrame(tick)

        closeIcon.addEventListener("click", function(){
            test.remove(), 
            closeIcon.style.display = "none",
            infoIcon.style.display = "none",
            vrButton.remove(), 
            loadingBar.classList.remove("ended"),
            window.cancelAnimationFrame(tick)
        })
    }
    tick()
}

/**
 * Display rooms ( room name, id, 3D Model (glb), baked image (jpg), page area )
 */
export function displaySalle(nomSalle, id, modele3d, bakedJpg, area){
    var btn = document.createElement("button"); 
    var mapParent = document.getElementById("parentDiv");
    const closeIcon = document.getElementById("closeIcon");
    const infoIcon = document.getElementById("infoIcon")

    btn.setAttribute("id", id)
    var t = document.createTextNode(nomSalle);      
    btn.appendChild(t);   
    btn.onclick = function(){salle(modele3d, bakedJpg); closeIcon.style.display = "block"; infoIcon.style.display= "block"};         
    document.getElementById(area).appendChild(btn);
    btn.style.display = "none";
}

export function removeCanvas(){
    const test = document.getElementById("canvas");
    const vrButton = document.getElementById("VRButton");
    var loadingBar = document.querySelector(".loading-bar")

    closeIcon.addEventListener("click", function(){
        test.remove(), 
        closeIcon.style.display = "none",
        infoIcon.style.display = "none",
        vrButton.remove(), 
        loadingBar.classList.remove("ended")
        window.cancelAnimationFrame(tick)
    })
}

export function signature(){
    console.log( [
        "                                                                                 Developed with 🍔 by                                                           ", 
        "      ___           ___           ___           ___                ___           ___           ___           ___           ___           ___           ___           ___ ",
        "     /\\  \\         /\\  \\         /\\__\\         /\\__\\              /\\__\\         /\\  \\         /\\  \\         /\\  \\         /\\  \\         /\\__\\         /\\  \\         /\\__\\  ",
        "    /::\\  \\       /::\\  \\       /:/  /        /:/  /             /::|  |       /::\\  \\       /::\\  \\       /::\\  \\       /::\\  \\       /:/  /        /::\\  \\       /:/  /  ",
        "   /:/\\:\\  \\     /:/\\:\\  \\     /:/  /        /:/  /             /:|:|  |      /:/\\:\\  \\     /:/\\:\\  \\     /:/\\:\\  \\     /:/\\:\\  \\     /:/__/        /:/\\:\\  \\     /:/  /   " ,
        "  /::\\~\\:\\  \\   /::\\~\\:\\  \\   /:/  /  ___   /:/  /             /:/|:|__|__   /::\\~\\:\\  \\   /::\\~\\:\\  \\   /::\\~\\:\\  \\   /:/  \\:\\  \\   /::\\  \\ ___   /::\\~\\:\\  \\   /:/  /    ",
        " /:/\\:\\ \\:\\__\\ /:/\\:\\ \\:\\__\\ /:/__/  /\\__\\ /:/__/             /:/ |::::\\__\\ /:/\\:\\ \\:\\__\\ /:/\\:\\ \\:\\__\\ /:/\\:\\ \\:\\__\\ /:/__/ \\:\\__\\ /:/\\:\\  /\\__\\ /:/\\:\\ \\:\\__\\ /:/__/     ",
        " \\/__\\:\\/:/  / \\/__\\:\\/:/  / \\:\\  \\ /:/  / \\:\\  \\             \\/__/~~/:/  / \\/__\\:\\/:/  / \\/_|::\\/:/  / \\:\\~\\:\\ \\/__/ \\:\\  \\  \\/__/ \\/__\\:\\/:/  / \\/__\\:\\/:/  / \\:\\  \\     ",
        "      \\::/  /       \\::/  /   \\:\\  /:/  /   \\:\\  \\                  /:/  /       \\::/  /     |:|::/  /   \\:\\ \\:\\__\\    \\:\\  \\            \\::/  /       \\::/  /   \\:\\  \\    ", 
        "       \\/__/        /:/  /     \\:\\/:/  /     \\:\\  \\                /:/  /        /:/  /      |:|\\/__/     \\:\\ \\/__/     \\:\\  \\           /:/  /        /:/  /     \\:\\  \\   ", 
        "                   /:/  /       \\::/  /       \\:\\__\\              /:/  /        /:/  /       |:|  |        \\:\\__\\        \\:\\__\\         /:/  /        /:/  /       \\:\\__\\  ", 
        "                   \\/__/         \\/__/         \\/__/              \\/__/         \\/__/         \\|__|         \\/__/         \\/__/         \\/__/         \\/__/         \\/__/  "
    ].join( '\n' ) );
}