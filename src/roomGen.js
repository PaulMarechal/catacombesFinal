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
import * as displayAR from './ar.js';

/**
 * Room creation ( base Three.js code to create rooms)
 */
export function salle(modele3d, bakedJpg, linkAR){
    /**
     * Selectors
     */

    const qrCode = document.getElementById("qrCode");
    // Loading bar 
    const loadingBarElement = document.querySelector('.loading-bar');

    // Loading Percent 
    var loadingPercent = document.createElement("h2");
    var loadingPercentContent = document.createTextNode("1 %");
    loadingPercent.className = "loadingPercent";

    /**
    * Base
    */
    //Debug
    // const gui = new dat.GUI({
    //     width: 400
    // })

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
                loadingPercent.remove();
            }); 
            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){
                qrCode.style.display = "none";
            } else {
                qrCode.style.display = "block";
            }
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
        (gltf) => {
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

    window.addEventListener('resize', () => {
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

    displayAR.arDisplay(linkAR);

    removeCanvas();

    const tick = () =>
    {
        const elapsedTime = clock.getElapsedTime()
        // removeCanvas()
        const test = document.getElementById("canvas");
        const vrButton = document.getElementById("VRButton");
        var loadingBar = document.querySelector(".loading-bar");

        // Update controls
        controls.update()

        // Teleport VR 
        teleportVR.update();
        
        // Render
        renderer.render(scene, camera)

        // Call tick again on the next frame
        window.requestAnimationFrame(tick)

        closeIcon.addEventListener("click", function(){
            window.cancelAnimationFrame(tick)
        })
    }
    tick()
}

/**
 * Display rooms ( room name, id, 3D Model (glb), baked image (jpg), page area )
 */
export function displaySalle(nomSalle, id, titre, modele3d, bakedJpg, area, linkAR){
    const modaleRoom3D = document.getElementById("modaleRoom3D");
    var btn = document.createElement("button"); 
    var titreModale = document.createElement("h3")
    var mapParent = document.getElementById("parentDiv");
    const closeIcon = document.getElementById("closeIcon");
    const infoIcon = document.getElementById("infoIcon");
    const buttonEnter3D = document.getElementsByClassName("buttonRoom3D");

    btn.setAttribute("id", id);
    btn.setAttribute("class", "buttonRoom3D");
    var t = document.createTextNode(nomSalle);     
    titreModale.appendChild(t);
    titreModale.setAttribute("class", "nameRoom");
    titreModale.setAttribute("id", titre);
    titreModale.style.gridArea = "1 / 2 / 2 / 3";
    titreModale.style.marginTop = "0.5em"
    btn.style.marginTop = "90%"
    btn.style.marginLeft = "auto"
    btn.style.marginRight = "auto"
    titreModale.style.textAlign = "center";
    var nameButton = document.createTextNode("ENTER 3D");  
    btn.appendChild(nameButton);

    btn.onclick = function(){salle(modele3d, bakedJpg, linkAR); closeIcon.style.display = "block"; infoIcon.style.display= "block";};         
    document.getElementById("modaleRoom3D").appendChild(titreModale);
    document.getElementById("modaleRoom3D").appendChild(btn);
    btn.style.display = "none";
    titreModale.style.display = "none";
    modaleRoom3D.style.display = "none";
}

export function removeCanvas(){
    const test = document.getElementById("canvas");
    const vrButton = document.getElementById("VRButton");
    const infoButton = document.getElementById("infoButton"); 
    const infoIcon = document.getElementById("infoIcon");
    const closeIconInfo = document.getElementById("closeIconInfo");
    const arLink = document.getElementById("arLink");
    const closeIconCanvas = document.getElementById("closeIcon")
    const modaleRoom3D = document.getElementById("modaleRoom3D")
    var loadingBar = document.querySelector(".loading-bar");
    const qrCode = document.getElementById("qrCode");

    infoIcon.addEventListener("click", function(){
        infoButton.style.display = "block";
    })

    closeIconInfo.addEventListener("click", function(){
        infoButton.style.display = "none";
    })

    closeIcon.addEventListener("click", function(){
        test.remove()
        closeIcon.style.display = "none"
        infoIcon.style.display = "none"
        modaleRoom3D.style.display = "none"
        vrButton.remove()
        qrCode.style.display = "none";
        loadingBar.classList.remove("ended")
        arLink.remove()
        location.reload()
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

// export function qrGen(){
//     // crée un nouvel élément div
//     var div = document.createElement("div");
//     var img = document.createElement("img");
//     img.setAttribute("src","https://paulmarechal.xyz/assets/images/qrCode.png");
//     div.setAttribute("id", "qrCode");
//     // et lui donne un peu de contenu
//     var newContent = document.createTextNode('VR for iPhone');
//     // ajoute le nœud texte au nouveau div créé
//     div.appendChild(img);
//     div.appendChild(newContent);

//     div.style.position = "fixed";
//     div.style.zIndex = "99999";
//     div.style.bottom = "0";
//     div.style.display = "none"

//     img.style.width = "50%";

//     // ajoute le nouvel élément créé et son contenu dans le DOM
//     var canvas = document.getElementById('canvas');

//     document.body.insertBefore(div, canvas);
// }
