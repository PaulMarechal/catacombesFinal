import * as roomGen from './roomGen.js';
import jquery from 'jquery';

export function catasRooms(){

    const name = [
        "concression", 
        "plage", 
        "cellier", 
        "soleil", 
        "anubis", 
        "boutik", 
        "ossa", 
        "cabanis", 
        "kraken", 
        "cube", 
        "faco", 
        "manoir", 
        "belier", 
        "dragon", 
        "cabinet", 
        "cabiBis", 
        "philibert", 
        "fontaine", 
        "anschluss", 
        "chapelle", 
        "chateau", 
        "byzance", 
        "sarko", 
        "rats", 
        "bocal", 
        "atlas", 
        "cochon",
        "bureau"
    ];

    for(let a = 0; a < name.length; a++){
        roomName(name[a]);
    }

}

function hideOthers(){
    var buttonRoom3D = document.getElementsByClassName("buttonRoom3D");
    var nameRoom = document.getElementsByClassName("nameRoom");
    const modaleRoom3D = document.getElementById("modaleRoom3D");
    let roomImagePoint = document.getElementsByClassName("imageRoom");
    modaleRoom3D.style.display = "block";

    for(var i = 0; i<buttonRoom3D.length; i++){
        buttonRoom3D[i].style.display = "none",
        roomImagePoint[i].style.display = "none"
    }

    for(var i = 0; i<nameRoom.length; i++){
        nameRoom[i].style.display = "none",
        roomImagePoint[i].style.display = "none"
    }
}

function mouseEventOnMap(name){

    // Concat
    const nameDiv = name.concat('', "Div");
    const roomName = name.concat('', "Titre");
    const roomPoint = name.concat('', "Point");
    const roomImage = name.concat('', "Image");

    // Selectors 
    let nameRoomDiv = document.getElementById(nameDiv);
    let nameRoomTitre = document.getElementById(roomName);
    let roomNamePoint = document.getElementById(roomPoint);
    let roomImagePoint = document.getElementById(roomImage);
    const modaleRoom = document.getElementById("modaleRoom3D");

    //Show button ( mouse enter )
    roomNamePoint.addEventListener("mouseenter",function(){
        hideOthers(), 
        nameRoomDiv.style.display="block", 
        nameRoomTitre.style.display="block", 
        roomImagePoint.style.display = "block";
    });

    // onclick for mobile version
    roomNamePoint.addEventListener('click', event => { nameRoomDiv.style.display="block" });
    
    // Remove button ( mouse leave )
    nameRoomDiv.addEventListener("mouseleave",function(){

        modaleRoom.style.transitionTiming="function: ease-in-out"
        modaleRoom.style.transition= "opacity 1s";
        modaleRoom.style.opacity = "0";
        modaleRoom.style.transition="opacity 2s";

        setTimeout(() => {
            nameRoomDiv.style.display="none", 
            nameRoomTitre.style.display="none", 
            modaleRoom.style.display="none",
            roomImagePoint.style.display = "none"
            modaleRoom.style.opacity = "1"
        }, 1500);
        
    });
}

function initRoom(name){
    // Room name ( first letter in capital )
    const Name = (name+'').charAt(0).toUpperCase()+name.substr(1);

    // Concatenation 
    const nameDiv = name.concat('', 'Div');
    const roomName = name.concat('', 'Titre');
    // Taille capture d'écran 230x230
    const roomImagePoint = name.concat('', 'Image');

    // Base path
    // Production
    // const routeBase = "https://catacombes.xyz/" + Name + "/" ;
    // Local
    const routeBase = "./" + Name + "/" ;

    // Path for GLB, JPG, USDZ, QR code VR
    const routeGlb = routeBase + Name.concat("", ".glb");
    const routeJpg = routeBase + Name.concat("", ".jpg");
    const routeUsdz = routeBase + Name.concat("", ".usdz");
    const routeImagePresentation = routeBase + Name.concat("", ".png");

    // To display the room
    roomGen.displaySalle(Name, nameDiv, roomName, routeGlb, routeJpg, "parentDiv", routeUsdz, Name, routeImagePresentation, roomImagePoint);
}

function roomName(name){
    // To display room 
    initRoom(name);

    // MouseEvent
    mouseEventOnMap(name);
}
