export function arDisplay(linkAR){
    
    var elementDiv = document.createElement("div");
    var elementA = document.createElement("a");

    // If AR available on mobile

    if (elementA.relList.supports("ar")){
        elementA.setAttribute("id", "arLink")
        elementA.setAttribute("rel", "ar");
        const parentDiv = document.getElementById("body");

        elementA.setAttribute("href", linkAR);
        elementA.style.color = "#FFFFFF"; 
        elementA.textContent = "ENTER AR"
        elementDiv.setAttribute("id", "ARButton");
        
        parentDiv.appendChild(elementDiv);
        elementDiv.appendChild(elementA);
    }
}