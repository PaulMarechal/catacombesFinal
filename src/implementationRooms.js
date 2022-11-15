import * as roomGen from './roomGen.js';

export function catasRooms(){
    // 3D Canvas
    roomGen.displaySalle("Bélier", "belierDiv", "./Belier/portal.glb", "./Belier/baked.jpg", "parentDiv", "./Belier/belier.usdz");
    roomGen.displaySalle("Concrétion", "concretionDiv", "./Concretion/concretion.glb", "./Concretion/concretion.jpg", "parentDiv", "./Concretion/concretion.usdz");
    roomGen.displaySalle("La Plage", "plageDiv", "./Plage/plage.glb", "./Plage/La_Plage.jpg", "parentDiv", "./Plage/plage.usdz");
    roomGen.displaySalle("Cellier", "cellierDiv", "./Cellier/cellier.glb", "./Cellier/Cellier.jpg", "parentDiv", "./Cellier/cellier.usdz");


    // Selectors ( select the IDs of the page )
    let belierDiv = document.getElementById("belierDiv");
    let plageDiv = document.getElementById("plageDiv");
    let cellierDiv = document.getElementById("cellierDiv");
    let concretionDiv = document.getElementById("concretionDiv");

    let belierPoint = document.getElementById("belierPoint");
    let plagePoint = document.getElementById("plagePoint");
    let cellierPoint = document.getElementById("cellierPoint");
    let concretionPoint = document.getElementById("concretionPoint");

    
    //Show button ( mouse enter )
    belierPoint.addEventListener("mouseenter",function(){belierDiv.style.display="block"});
    plagePoint.addEventListener("mouseenter",function(){plageDiv.style.display="block"});
    cellierPoint.addEventListener("mouseenter",function(){cellierDiv.style.display="block"});
    concretionPoint.addEventListener("mouseenter",function(){concretionDiv.style.display="block"});


    // onclick for mobile version
    belierPoint.addEventListener('click', event => { belierDiv.style.display="block" });
    plagePoint.addEventListener('click', event => { plageDiv.style.display="block" });
    cellierPoint.addEventListener('click', event => { cellierDiv.style.display="block" });
    concretionPoint.addEventListener('click', event => { concretionDiv.style.display="block" });


    // Remove button ( mouse leave )
    // belierDiv.addEventListener("mouseleave",function(){setTimeout(belierDiv.style.display="none", 3000)});
    // plageDiv.addEventListener("mouseleave",function(){setTimeout(plageDiv.style.display="none", 3000)});
    // cellierDiv.addEventListener("mouseleave",function(){setTimeout(cellierDiv.style.display="none", 3000)});
    belierDiv.addEventListener("mouseleave",function(){belierDiv.style.display="none"});
    plageDiv.addEventListener("mouseleave",function(){plageDiv.style.display="none"});
    cellierDiv.addEventListener("mouseleave",function(){cellierDiv.style.display="none"});
    concretionDiv.addEventListener("mouseleave",function(){concretionDiv.style.display="none"});
}