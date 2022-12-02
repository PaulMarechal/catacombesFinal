export function mobileOrNot(){
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){
        document.getElementById("imgHelp").src="https://paulmarechal.xyz/assets/images/helpMobile.png";

        if(screen.height > screen.width){
            var newModale = document.createElement("div");
            var newContent = document.createElement("h4");
            var content = document.createTextNode("Pour Profiter pleinement de l'expérience merci de tourner votre téléphone en mode paysage ou de vous connecter depuis un ordinateur");
            newContent.appendChild(content);
            newContent.setAttribute("id", "informations")
            newModale.appendChild(newContent)

            // newModale.style.display = 'fixed'; 
            newModale.style.marginTop = "-550%"; 
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
            newModale.style.border = "solid #000 10px";
            newModale.style.textAlign = "justify";





            var mainDoc = document.getElementById("parentMain");
            document.body.insertBefore(newModale, mainDoc);

            const infos = document.getElementById("informations")
            infos.style.padding = "7em 1em"
            
        }
    } else {
        document.getElementById("imgHelp").src="https://paulmarechal.xyz/assets/images/helpDesktop.png";
    }
}