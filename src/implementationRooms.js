import * as roomGen from './roomGen.js';

export function catasRooms(){
    // 3D Canvas
    roomGen.displaySalle("Bélier", "belierDiv", "./Belier/portal.glb", "./Belier/baked.jpg", "parentDiv", "./Belier/belier.usdz");
    roomGen.displaySalle("Concrétion", "concretionDiv", "./Concretion/concretion.glb", "./Concretion/concretion.jpg", "parentDiv", "./Concretion/concretion.usdz");
    roomGen.displaySalle("La Plage", "plageDiv", "./Plage/plage.glb", "./Plage/La_Plage.jpg", "parentDiv", "./Plage/plage.usdz");
    roomGen.displaySalle("Cellier", "cellierDiv", "./Cellier/cellier.glb", "./Cellier/Cellier.jpg", "parentDiv", "./Cellier/cellier.usdz");
    roomGen.displaySalle("Soleil", "soleilDiv", "./Soleil/Soleil.glb", "./Soleil/Soleil.jpg", "parentDiv", "./Soleil/Soleil.usdz");
    roomGen.displaySalle("Anubis (Chaumière)", "anubisDiv", "./Anubis/Anubis.glb", "./Anubis/Anubis.jpg", "parentDiv", "./Anubis/Anubis.usdz");
    roomGen.displaySalle("Boutik", "boutikDiv", "./Boutik/Boutik.glb", "./Boutik/Boutik.jpg", "parentDiv", "./Boutik/Boutik.usdz");
    roomGen.displaySalle("Ossa Arida", "ossaDiv", "./Ossa/Ossa.glb", "./Ossa/Ossa.jpg", "parentDiv", "./Ossa/Ossa.usdz");


    // Selectors ( select the IDs of the page )
    let belierDiv = document.getElementById("belierDiv");
    let plageDiv = document.getElementById("plageDiv");
    let cellierDiv = document.getElementById("cellierDiv");
    let concretionDiv = document.getElementById("concretionDiv");
    let soleilDiv = document.getElementById("soleilDiv");
    let anubisDiv = document.getElementById("anubisDiv");
    let boutikDiv = document.getElementById("boutikDiv");
    let ossaDiv = document.getElementById("ossaDiv");

    let belierPoint = document.getElementById("belierPoint");
    let plagePoint = document.getElementById("plagePoint");
    let cellierPoint = document.getElementById("cellierPoint");
    let concretionPoint = document.getElementById("concretionPoint");
    let soleilPoint = document.getElementById("soleilPoint");
    let anubisPoint = document.getElementById("anubisPoint");
    let boutikPoint = document.getElementById("boutikPoint");
    let ossaPoint = document.getElementById("ossaPoint");
    
    //Show button ( mouse enter )
    belierPoint.addEventListener("mouseenter",function(){belierDiv.style.display="block"});
    plagePoint.addEventListener("mouseenter",function(){plageDiv.style.display="block"});
    cellierPoint.addEventListener("mouseenter",function(){cellierDiv.style.display="block"});
    concretionPoint.addEventListener("mouseenter",function(){concretionDiv.style.display="block"});
    soleilPoint.addEventListener("mouseenter",function(){soleilDiv.style.display="block"});
    anubisPoint.addEventListener("mouseenter",function(){anubisDiv.style.display="block"});
    boutikPoint.addEventListener("mouseenter",function(){boutikDiv.style.display="block"});
    ossaPoint.addEventListener("mouseenter",function(){ossaDiv.style.display="block"});


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
    belierDiv.addEventListener("mouseleave",function(){belierDiv.style.display="none"});
    plageDiv.addEventListener("mouseleave",function(){plageDiv.style.display="none"});
    cellierDiv.addEventListener("mouseleave",function(){cellierDiv.style.display="none"});
    concretionDiv.addEventListener("mouseleave",function(){concretionDiv.style.display="none"});
    soleilDiv.addEventListener("mouseleave",function(){soleilDiv.style.display="none"});
    anubisDiv.addEventListener("mouseleave",function(){anubisDiv.style.display="none"});
    boutikDiv.addEventListener("mouseleave",function(){boutikDiv.style.display="none"});
    ossaDiv.addEventListener("mouseleave",function(){ossaDiv.style.display="none"});
}