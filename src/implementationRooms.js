import * as roomGen from './roomGen.js';
import jquery from 'jquery';

export function catasRooms(){
    // 3D Canvas
    roomGen.displaySalle("Bélier", "belierDiv", "belierTitre", "./Belier/portal.glb", "./Belier/baked.jpg", "parentDiv", "./Belier/belier.usdz");
    roomGen.displaySalle("Concrétion", "concretionDiv", "concretionTitre", "./Concretion/concretion.glb", "./Concretion/concretion.jpg", "parentDiv", "./Concretion/concretion.usdz");
    roomGen.displaySalle("La Plage", "plageDiv", "plageTitre", "./Plage/plage.glb", "./Plage/La_Plage.jpg", "parentDiv", "./Plage/plage.usdz");
    roomGen.displaySalle("Cellier", "cellierDiv", "cellierTitre", "./Cellier/cellier.glb", "./Cellier/Cellier.jpg", "parentDiv", "./Cellier/cellier.usdz");
    roomGen.displaySalle("Soleil", "soleilDiv", "soleilTitre", "./Soleil/Soleil.glb", "./Soleil/Soleil.jpg", "parentDiv", "./Soleil/Soleil.usdz");
    roomGen.displaySalle("Anubis (Chaumière)", "anubisDiv", "anubisTitre", "./Anubis/Anubis.glb", "./Anubis/Anubis.jpg", "parentDiv", "./Anubis/Anubis.usdz");
    roomGen.displaySalle("Boutik", "boutikDiv", "boutikTitre", "./Boutik/Boutik.glb", "./Boutik/Boutik.jpg", "parentDiv", "./Boutik/Boutik.usdz");
    roomGen.displaySalle("Ossa Arida", "ossaDiv", "ossaTitre", "./Ossa/Ossa.glb", "./Ossa/Ossa.jpg", "parentDiv", "./Ossa/Ossa.usdz");


    // Selectors ( select the IDs of the page )
    let belierDiv = document.getElementById("belierDiv");
    let belierTitre = document.getElementById("belierTitre");

    let plageDiv = document.getElementById("plageDiv");
    let plageTitre = document.getElementById("plageTitre");

    let cellierDiv = document.getElementById("cellierDiv");
    let cellierTitre = document.getElementById("cellierTitre");

    let concretionDiv = document.getElementById("concretionDiv");
    let concretionTitre = document.getElementById("concretionTitre");

    let soleilDiv = document.getElementById("soleilDiv");
    let soleilTitre = document.getElementById("soleilTitre");

    let anubisDiv = document.getElementById("anubisDiv");
    let anubisTitre = document.getElementById("anubisTitre");

    let boutikDiv = document.getElementById("boutikDiv");
    let boutikTitre = document.getElementById("boutikTitre");

    let ossaDiv = document.getElementById("ossaDiv");
    let ossaTitre = document.getElementById("ossaTitre");

    

    let belierPoint = document.getElementById("belierPoint");
    let plagePoint = document.getElementById("plagePoint");
    let cellierPoint = document.getElementById("cellierPoint");
    let concretionPoint = document.getElementById("concretionPoint");
    let soleilPoint = document.getElementById("soleilPoint");
    let anubisPoint = document.getElementById("anubisPoint");
    let boutikPoint = document.getElementById("boutikPoint");
    let ossaPoint = document.getElementById("ossaPoint");
    let modaleRoom = document.getElementById("modaleRoom3D")
    
    //Show button ( mouse enter )
    belierPoint.addEventListener("mouseenter",function(){hideOthers(), belierDiv.style.display="block", belierTitre.style.display="block"});
    plagePoint.addEventListener("mouseenter",function(){hideOthers(), plageDiv.style.display="block", plageTitre.style.display="block"});
    cellierPoint.addEventListener("mouseenter",function(){hideOthers(), cellierDiv.style.display="block", cellierTitre.style.display="block"});
    concretionPoint.addEventListener("mouseenter",function(){hideOthers(), concretionDiv.style.display="block", concretionTitre.style.display="block"});
    soleilPoint.addEventListener("mouseenter",function(){hideOthers(), soleilDiv.style.display="block", soleilTitre.style.display="block"});
    anubisPoint.addEventListener("mouseenter",function(){hideOthers(), anubisDiv.style.display="block", anubisTitre.style.display="block"});
    boutikPoint.addEventListener("mouseenter",function(){hideOthers(), boutikDiv.style.display="block", boutikTitre.style.display="block"});
    ossaPoint.addEventListener("mouseenter",function(){hideOthers(), ossaDiv.style.display="block", ossaTitre.style.display="block"});


    // onclick for mobile version
    belierPoint.addEventListener('click', event => { belierDiv.style.display="block" });
    plagePoint.addEventListener('click', event => { plageDiv.style.display="block" });
    cellierPoint.addEventListener('click', event => { cellierDiv.style.display="block" });
    concretionPoint.addEventListener('click', event => { concretionDiv.style.display="block" });
    soleilPoint.addEventListener('click', event => { soleilDiv.style.display="block" });
    anubisPoint.addEventListener('click', event => { anubisDiv.style.display="block" });
    boutikPoint.addEventListener('click', event => { boutikDiv.style.display="block" });
    ossaPoint.addEventListener('click', event => { ossaDiv.style.display="block" });


    // Remove button ( mouse leave )
    // belierDiv.addEventListener("mouseleave",function(){setTimeout(belierDiv.style.display="none", 3000)});
    // plageDiv.addEventListener("mouseleave",function(){setTimeout(plageDiv.style.display="none", 3000)});
    // cellierDiv.addEventListener("mouseleave",function(){setTimeout(cellierDiv.style.display="none", 3000)});

    belierDiv.addEventListener("mouseleave",function(){belierDiv.style.display="none", belierTitre.style.display="none", modaleRoom.style.display="none"});
    plageDiv.addEventListener("mouseleave",function(){plageDiv.style.display="none", plageTitre.style.display="none", modaleRoom.style.display="none"});
    cellierDiv.addEventListener("mouseleave",function(){cellierDiv.style.display="none", cellierTitre.style.display="none", modaleRoom.style.display="none"});
    concretionDiv.addEventListener("mouseleave",function(){concretionDiv.style.display="none", concretionTitre.style.display="none", modaleRoom.style.display="none"});
    soleilDiv.addEventListener("mouseleave",function(){soleilDiv.style.display="none", soleilTitre.style.display="none", modaleRoom.style.display="none"});
    anubisDiv.addEventListener("mouseleave",function(){anubisDiv.style.display="none", anubisTitre.style.display="none", modaleRoom.style.display="none"});
    boutikDiv.addEventListener("mouseleave",function(){boutikDiv.style.display="none", boutikTitre.style.display="none", modaleRoom.style.display="none"});
    ossaDiv.addEventListener("mouseleave",function(){ossaDiv.style.display="none", ossaTitre.style.display="none", modaleRoom.style.display="none"});
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
