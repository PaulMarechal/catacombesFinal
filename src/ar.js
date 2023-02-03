export function arDisplay(linkAR){
    
    var elementDiv = document.createElement("div");

    var elementA = document.createElement("a");

    var elementImg = document.createElement("img"); 

    // If AR available on mobile
    if (elementA.relList.supports("ar")){
        elementA.setAttribute("rel", "ar");
        elementA.setAttribute("id", "arLink");
        const parentDiv = document.getElementById("body");

        elementA.setAttribute("href", linkAR);
        elementA.style.color = "#FFFFFF"; 
        elementA.textContent = "ENTER AR" 
        elementDiv.setAttribute("id", "ARButton");


        elementImg.setAttribute("src", "https://catacombes.xyz/assets/images/couloirCatacombes.png");
        elementImg.setAttribute("id", "imageAR");

        parentDiv.appendChild(elementDiv);
        elementDiv.appendChild(elementA);
        elementA.appendChild(elementImg);
    }
}