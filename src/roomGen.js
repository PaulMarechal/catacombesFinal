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
import * as WidthVR from './widthVR.js';
import VRControl from './assets/utils/VRControls.js';
import * as MobileNavigation from './mobileNavigation.js';

/**
 * Room creation ( base Three.js code to create rooms)
 */
export function salle(modele3d, bakedJpg, linkAR, linkQR){
    /**
     * Selectors
     */
    // Loading bar 
    const loadingBarElement = document.querySelector('.loading-bar');

    // Loading Percent 
    var loadingPercent = document.createElement("h2");
    var loadingPercentContent = document.createTextNode("1 %");
    loadingPercent.className = "loadingPercent";
    loadingPercent.innerHTML = "Chargement en cours</br>1%"; 
    loadingPercent.style.textAlign = "center";




    /**
    * Base
    */
    //Debug
    // const gui = new dat.GUI({
    //     width: 400
    // })

    // Canvas 
    const canvas = document.createElement("canvas");
    const body = document.getElementById("body");
    canvas.className = 'webgl';
    canvas.setAttribute("id","canvas");
    document.body.insertBefore(canvas, loadingBarElement);
    canvas.style.display = "block"; 

    if(body.classList.contains("dark-mode")){
        document.getElementById("canvas").style.boxShadow = "-1px -1px 147px 33px rgba(255, 255, 255, 0.75)"
        document.getElementById("canvas").style.webKitBoxShadow = "-1px -1px 147px 33px rgba(255, 255, 255, 0.75)"
        document.getElementById("canvas").style.mozBoxShadow = "-1px -1px 147px 33px rgba(255, 255, 255, 0.75)"
    } else {
        document.getElementById("canvas").style.boxShadow = "-1px -1px 147px 33px rgba(0,0,0,0.75)"
        document.getElementById("canvas").style.webKitBoxShadow = "-1px -1px 147px 33px rgba(0,0,0,0.75)"
        document.getElementById("canvas").style.mozBoxShadow = "-1px -1px 147px 33px rgba(0,0,0,0.75)"
    }


    // QR Code
    qrCodeRoom(linkQR);

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
    var currentDiv = document.querySelector("loading-bar");
    document.body.insertBefore(loadingPercent, currentDiv);

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
                document.getElementById("imgHelp").src="https://paulmarechal.xyz/assets/images/helpMobile.png";
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
            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){
                if(screen.height>screen.width){
                    loadingPercent.style.left = "50%";
                    loadingPercent.style.top = "43%";
                } else {
                    loadingPercent.style.left = "50%";
                    loadingPercent.style.top = "37%";
                }
            } else {
                loadingPercent.style.left = "50%";
                loadingPercent.style.top = "43%";
            }

            loadingPercent.innerHTML = "";
            loadingPercent.innerHTML = `${Math.round(progressRatio*100)} %`

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

            // VR UP / DOWN Panel 
            // if user is in XR session = display button
            // if (navigator.xr) {
            //     navigator.xr.isSessionSupported('immersive-vr').then((supported) => {
            //         if (supported) {
            //             navigator.xr.requestSession('immersive-vr').then((session) => {
            //                 // console.log("Entered VR mode");
            //                 //WidthVR.makePanel(gltf.scene, scene, camera)
            //             });
            //         }
            //     });
            // }
            // let gamepad = navigator.getGamepads()[0];
            // if(vrControl.controllerGrips[ 0 ]){
            //     WidthVR.makePanel(gltf.scene, scene, camera)
            // }
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

    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){
        const VRButton = document.getElementById("VRButton");
        if(screen.height>screen.width){
            loadingPercent.style.left = "40%";
            loadingPercent.style.top = "20%";
            VRButton.style.marginRight = "-30%";
        } else {
            loadingPercent.style.left = "41%";
            loadingPercent.style.top = "31%";
            VRButton.style.left = "60%";
        }
    } else {
        loadingPercent.style.left = "43%";
        loadingPercent.style.top = "39%";
    }

    /**
    * Animate
    */
    const clock = new THREE.Clock()

    /**
     * Teleport VR 
     */
    let vrControl;
    let selectState = false;

    const teleportVR = new TeleportVR(scene, camera);
    const controllerModelFactory = new XRControllerModelFactory();  

    // Controllers
    vrControl = VRControl( renderer, camera, scene );
    scene.add( vrControl.controllerGrips[ 0 ], vrControl.controllers[ 0 ] );

    vrControl.controllers[ 0 ].addEventListener( 'selectstart', () => {
        selectState = true;
    } );

    vrControl.controllers[ 0 ].addEventListener( 'selectend', () => {
        selectState = false;
    } );


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

    
    // webXR controller recovery
    // let gamepad = navigator.getGamepads()[0];
    // if(gamepad){
    // //     // Joystick movement in VR
    //     TeleportVR.updateCharacterPosition();
    // }
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){
        const arButton = document.getElementById("ARButton");
        if(arButton){
            arButton.style.display = "block"
        }
    }



    removeCanvas();

    const tick = () => {

        const elapsedTime = clock.getElapsedTime()

        // Teleport VR 
        teleportVR.update();

        // ThreeMeshUI
        ThreeMeshUI.update();

        WidthVR.updateButtons(vrControl, renderer, camera);

        // TeleportVR.updateCharacterPosition();
        
        // Update controls
        controls.update();

        
        // Render
        renderer.render(scene, camera);

        // Call tick again on the next frame
        window.requestAnimationFrame(tick);

        closeIcon.addEventListener("click", function(){
            window.cancelAnimationFrame(tick)
        })
    }

    tick()
}

/**
 * Display rooms ( room name, id, 3D Model (glb), baked image (jpg), page area, path to AR file, QR code to AR room )
 */
export function displaySalle(nomSalle, id, titre, modele3d, bakedJpg, area, linkAR, linkQR, imagePath, idImageSalle){
    const modaleRoom3D = document.getElementById("modaleRoom3D");
    var btn = document.createElement("button"); 
    var titreModale = document.createElement("h3");
    var image = document.createElement("img");
    var mapParent = document.getElementById("parentDiv");
    const closeIcon = document.getElementById("closeIcon");
    const infoIcon = document.getElementById("infoIcon");
    const buttonEnter3D = document.getElementsByClassName("buttonRoom3D");

    btn.setAttribute("id", id);
    btn.setAttribute("class", "buttonRoom3D");
    image.setAttribute("src", imagePath)
    image.setAttribute("id", idImageSalle)
    image.setAttribute("class", "imageRoom")
    var t = document.createTextNode(nomSalle);     
    titreModale.appendChild(t);
    titreModale.setAttribute("class", "nameRoom");
    titreModale.setAttribute("id", titre);
    titreModale.style.gridArea = "1 / 2 / 2 / 3";
    titreModale.style.marginTop = "0.5em";
    titreModale.style.textDecoration = "underline solid #1e1c1c 10px";
    titreModale.style.textUnderlinePosition = "auto";

    btn.style.marginLeft = "30px";
    btn.style.fontSize = "2em";
    btn.style.border = "0.1px solid rgb(203 203 203)";
    btn.style.marginBottom = "0.4em";
    btn.style.background = "rgb(239 238 238)"; 
    btn.style.borderRadius = "0"; 
    btn.style.height = "1.5em";

    titreModale.style.paddingLeft = "30px";
    image.style.width = "79%";
    image.style.margin = "1em auto";
    image.setAttribute("title", nomSalle)
    image.setAttribute("alt", `Salle : ${nomSalle}`)
    image.style.borderRadius = "9px";
    var nameButton = document.createTextNode("ENTER 3D");  
    btn.appendChild(nameButton);

    btn.onclick = function(){salle(modele3d, bakedJpg, linkAR, linkQR);  closeIcon.style.display = "block"; infoIcon.style.display= "block";};         
    document.getElementById("modaleRoom3D").appendChild(titreModale);
    document.getElementById("modaleRoom3D").appendChild(image);
    document.getElementById("modaleRoom3D").appendChild(btn);
    btn.style.display = "none";
    titreModale.style.display = "none";
    modaleRoom3D.style.display = "none";
    image.style.display = "none";
}

export function removeCanvas(){
    const canvas = document.getElementById("canvas");
    const infoButton = document.getElementById("infoButton"); 
    const infoIcon = document.getElementById("infoIcon");
    const closeIconInfo = document.getElementById("closeIconInfo");
    const arLink = document.getElementById("arLink");
    const closeIconCanvas = document.getElementById("closeIcon");
    const modaleRoom3D = document.getElementById("modaleRoom3D");
    const qrCode = document.getElementById("qrCode");

    
    var loadingBar = document.querySelector(".loading-bar");

    infoIcon.addEventListener("click", function(){
        infoButton.style.display = "block";
    })

    closeIconInfo.addEventListener("click", function(){
        infoButton.style.display = "none";
    })

    closeIcon.addEventListener("click", function(){
        $("#canvas").load(window.location.href + " #canvas" );
        closeIcon.style.display = "none";
        infoIcon.style.display = "none";
        modaleRoom3D.style.display = "none";
        qrCode.style.display = "none";
        loadingBar.classList.remove("ended");
        canvas.remove();
        // vrButton.remove();
        // vrButton.style.display = "none";
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){
            const arButton = document.getElementById("ARButton");
            const vrButton = document.getElementById("VRButton");

            arButton.style.display = "none";
            vrButton.style.display = "none";
            // if(arButton){
            //     vrButton.remove();
            // }
            
        } else {
            location.reload();
        }
    })
}

function qrCodeRoom(linkQR){

    const qrCodeAr = document.getElementById("qrCodeAR");

    const Name = (linkQR+'').charAt(0).toUpperCase()+linkQR.substr(1);

    // paulmarechal.xyz
    // const qrCodePath = "https://chart.googleapis.com/chart?cht=qr&chl=https%3A%2F%2Fpaulmarechal.xyz%2Fcatacombes%2F" + Name + "%2F" + Name + ".usdz&chs=120x120&choe=UTF-8&chld=L|2"
    // catacombes.xyz
    const qrCodePath = "https://chart.googleapis.com/chart?cht=qr&chl=https%3A%2F%2Fcatacombes.xyz%2F" + Name + "%2F" + Name + ".usdz&chs=120x120&choe=UTF-8&chld=L|2"

    qrCodeAr.setAttribute("src", qrCodePath)
}

export function signature(){
    console.log( [
        " Developed with 🍔 by Paul M. ", 
        " - LinkedIn : https://www.linkedin.com/in/paul-marechal/",
        " - site : https://www.paulmarechal.xyz", 
        " - Mail : contactme@paulmarechal.xyz",
    ].join( '\n' ) );
}

export function modaleMobile(){
    window.addEventListener('load', (event) => {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){
            if (orientation === 0) {
                MobileNavigation.mobileOrNot();
            } else {
                const modale = document.getElementById("modaleMobilePortrait");
                modale.style.display = "none";
            }
        }
    });
    
    window.addEventListener('orientationchange', function() {
        var orientation = window.orientation;
        if (orientation === 0) {
            MobileNavigation.mobileOrNot();
        } else {
            const modale = document.getElementById("modaleMobilePortrait");
            modale.style.display = "none";
        }  
    });
}

export function darkMode() {

    const darkModeButton = document.getElementById("darkModeButton"); 
    darkModeButton.addEventListener("click", event => {
        var element = document.body;
        const secondTitle = document.getElementById("secondMainTitle");
        const button = document.getElementsByClassName('buttonList');
        const cardTitle = document.getElementsByClassName('titleCardServices');
        const mouseScrollDark = document.getElementById("mouse-scroll");
        const infoHelpDark = document.getElementsByClassName("infoHelpTitle");
        const parentDiv = document.getElementById("parentDiv");
        const nameRoomModale = document.getElementsByClassName("nameRoom"); 
        const backgroundColorImage = document.getElementsByClassName("backgroundColorImage");
        const footerDiv = document.getElementsByClassName("parentFooter");
        const canvas = document.getElementById("canvas");

        
        for(var i = 0; i < button.length; i++ ){
            button[i].classList.toggle("dark-mode");
        }
        
        for(var i = 0; i < cardTitle.length; i++) {
            cardTitle[i].style.color = '#000';    
        }

        for(var i = 0; i < nameRoomModale.length; i++) {
            nameRoomModale[i].style.color = '#000';    
        }

        for(var i = 0; i < backgroundColorImage.length; i++) {
            backgroundColorImage[i].style.background = '#000';    
        }

        for(var i = 0; i < footerDiv.length; i++) {
            footerDiv[i].classList.toggle("parentFooter-dark");
        }

        for(var i = 0; i < infoHelpDark.length; i++) {
            infoHelpDark[i].style.color = "#000"
        }

        element.classList.toggle("dark-mode");
        secondTitle.classList.toggle("dark-mode-title");
        mouseScrollDark.classList.toggle("mouse-scroll-dark");
        document.getElementById("closeIcon").style.color = "#000";
        document.getElementById("infoIcon").style.color = "#000";

        if(body.classList.contains("dark-mode")){
            parentDiv.style.backgroundImage = "url('https://catacombes.xyz/assets/images/paris-night.png')";
            parentDiv.style.border = "#fff solid 11px";
            document.getElementById("iconDarkMode").classList.remove("ti", "ti-moon");
            document.getElementById("iconDarkMode").classList.add("ti", "ti-sun-high");
        } else {
            parentDiv.style.backgroundImage = "url('https://catacombes.xyz/assets/images/paris.png')";
            parentDiv.style.border = "#000 solid 11px";
            document.getElementById("iconDarkMode").classList.remove("ti", "ti-sun-high");
            document.getElementById("iconDarkMode").classList.add("ti", "ti-moon");
        }

        if(canvas){
            if(body.classList.contains("dark-mode")){
                canvas.style.boxShadow = "-1px -1px 147px 33px rgba(255, 255, 255, 0.75)";
                canvas.style.webKitBoxShadow = "-1px -1px 147px 33px rgba(255, 255, 255, 0.75)";
                canvas.style.mozBoxShadow = "-1px -1px 147px 33px rgba(255, 255, 255, 0.75)";
                document.getElementById("closeIcon").style.color = "#000";
                document.getElementById("infoIcon").style.color = "#000";
            } else {
                canvas.style.boxShadow = "-1px -1px 147px 33px rgba(0,0,0,0.75)";
                canvas.style.webKitBoxShadow = "-1px -1px 147px 33px rgba(0,0,0,0.75)";
                canvas.style.mozBoxShadow = "-1px -1px 147px 33px rgba(0,0,0,0.75)";
                document.getElementById("closeIcon").style.color = "#000";
                document.getElementById("infoIcon").style.color = "#000";
            }
        }
        


        

    })

    
  
}

