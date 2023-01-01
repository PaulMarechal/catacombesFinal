export function mobileOrNot(){
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){
        document.getElementById("imgHelp").src="https://paulmarechal.xyz/assets/images/helpMobile.png";
        
        if(screen.height > screen.width){
            var newModale = document.createElement("div");
            var newContent = document.createElement("h4");
            var content = document.createTextNode("Pour profiter pleinement de l'expérience merci de tourner votre téléphone en mode paysage ou de vous connecter depuis un ordinateur / casque VR");
            newContent.appendChild(content);

            var imageRotate = document.createElement("img");
            imageRotate.setAttribute("src", "https://catacombes.xyz/assets/images/rotateScreen.png");
            imageRotate.setAttribute("alt", "Rotate mobile screen");
            imageRotate.setAttribute("id", "rotateScreen");

            newContent.setAttribute("id", "informations"); 
            newModale.setAttribute("id", "modaleMobilePortrait");
            newModale.appendChild(newContent); 
            newModale.appendChild(imageRotate);

            imageRotate.style.width = "50%";
            imageRotate.style.marginRight = "auto";
            imageRotate.style.marginLeft = "26%";
            imageRotate.style.marginLeft = "26%";
            imageRotate.style.marginTop = "2em";

            newModale.style.zIndex = "99999";
            newModale.style.position ="fixed";
            newModale.style.background = "#fff";
            newModale.style.height = "50%";
            newModale.style.width="80%";
            newModale.style.left ="5%!important;"
            newModale.style.marginLeft = "auto";
            newModale.style.marginRight = "auto"; 
            newModale.style.color = "#000"; 
            newModale.style.borderRadius = "10px";
            newModale.style.right = "0";
            newModale.style.left = "0";
            newModale.style.top = "10em";
            newModale.style.border = "solid #000 10px";
            newModale.style.textAlign = "justify";
            newModale.style.boxShadow = "0px 0px 162px 40px rgba(41,41,41,0.75)";
            newModale.style.webKitBoxShadow = "0px 0px 162px 40px rgba(41,41,41,0.75)";
            newModale.style.mozBoxShadow = "0px 0px 162px 40px rgba(41,41,41,0.75)";
            newModale.style.padding = "5px 10px"

            newModale.addEventListener('click', event => {
                newModale.style.display = "none"
            });


            var mainDoc = document.getElementById("parentMain");
            document.body.insertBefore(newModale, mainDoc);

            const rotateScreen = document.getElementById("rotateScreen"); 
            rotateScreen.style.width = "50%";
            rotateScreen.style.marginLeft = "26%";
            rotateScreen.style.marginTop = "-2em";
 

            const infos = document.getElementById("informations")
            infos.style.padding = "3em 1em"
        }
    } else {
        const newModale = document.getElementById("modaleMobilePortrait")
        if(newModale){
            newModale.style.display = "none";
        }
        document.getElementById("imgHelp").src="https://paulmarechal.xyz/assets/images/helpDesktop.png";
    }
}