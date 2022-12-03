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
        "manoir"
    ];

    for(let a = 0; a < name.length; a++){
        roomName(name[a])
    }
    // roomName("belier")
    // roomName("dragon")
    // roomName("cabinet")
    // roomName("cabiBis")
}

function hideOthers(){
    var buttonRoom3D = document.getElementsByClassName("buttonRoom3D");
    var nameRoom = document.getElementsByClassName("nameRoom")
    const modaleRoom3D = document.getElementById("modaleRoom3D");
    modaleRoom3D.style.display = "block"
    
    for(var i = 0; i<buttonRoom3D.length; i++){
        buttonRoom3D[i].style.display = "none"
    }

    for(var i = 0; i<nameRoom.length; i++){
        nameRoom[i].style.display = "none"
    }
}

function mouseEventOnMap(name){

    // Concat
    const nameDiv = name.concat('', "Div")
    const roomName = name.concat('', "Titre")
    const roomPoint = name.concat('', "Point")

    // Selectors 
    let nameRoomDiv = document.getElementById(nameDiv);
    let nameRoomTitre = document.getElementById(roomName);
    let roomNamePoint = document.getElementById(roomPoint);
    const modaleRoom = document.getElementById("modaleRoom3D");

    //Show button ( mouse enter )
    roomNamePoint.addEventListener("mouseenter",function(){hideOthers(), nameRoomDiv.style.display="block", nameRoomTitre.style.display="block"});

    // onclick for mobile version
    roomNamePoint.addEventListener('click', event => { nameRoomDiv.style.display="block" });

    // Remove button ( mouse leave )
    nameRoomDiv.addEventListener("mouseleave",function(){nameRoomDiv.style.display="none", nameRoomTitre.style.display="none", modaleRoom.style.display="none"});
}

function initRoom(name){

    // Room name ( first letter in capital )
    const Name = (name+'').charAt(0).toUpperCase()+name.substr(1);

    // Concatenation 
    const nameDiv = name.concat('', "Div")
    const roomName = name.concat('', "Titre")

    // Base path
    const routeBase = "./" + Name + "/"

    // Path for GLB, JPG, USDZ
    const routeGlb = routeBase + Name.concat("", ".glb")
    const routeJpg = routeBase + Name.concat('', ".jpg")
    const routeUsdz = routeBase + Name.concat('', ".usdz")

    // To display the room
    roomGen.displaySalle(Name, nameDiv, roomName, routeGlb, routeJpg, "parentDiv", routeUsdz);
}

function roomName(name){
    // To display room 
    initRoom(name);

    // MouseEvent
    mouseEventOnMap(name);
}
