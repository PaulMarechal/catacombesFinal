import LocomotiveScroll from 'locomotive-scroll';

export function locomotiveScroll() {
    const el = document.querySelector("[data-scroll-container]");
    const scrollDivElement = document.getElementById("mouseScroll");

    if (el) {
        window.addEventListener("load", () => {
            const scroller = new LocomotiveScroll({
              el: document.querySelector("[data-scroll-container]"),
              smooth: true,
              multiplier: 0.75,
              scrollFromAnywhere: true,
            });

            scroller.on('scroll', ({ limit, scroll }) => {
                const progress = scroll.y / limit.y * 100;
                
                if(progress <= 0.3){
                    scrollDivElement.style.display="block";
                    scrollDivElement.style.opacity = "1";
                } else if (progress === 0 ){
                    scrollDivElement.style.display="block";
                    scrollDivElement.style.opacity = "1";
                }else {
                    scrollDivElement.style.transitionTiming="function: ease-in-out";
                    scrollDivElement.style.transition= "opacity 1s";
                    scrollDivElement.style.opacity = "0";
                    scrollDivElement.style.transition="opacity 1s";
    
                    setTimeout(() => {
                        scrollDivElement.style.display="none";
                    }, 500);
                }
            });
        });

        
    } else {
        console.error("Il y a un probleme avec l'attribut : data-scroll-container");
    }

    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){
        scrollDivElement.style.display = "none";
    }

}


