import LocomotiveScroll from 'locomotive-scroll';

export function locomotiveScroll() {
  const el = document.querySelector("[data-scroll-container]")

    if (el) {
        const scroller = new LocomotiveScroll({
        el: el,
        smooth: true,
        multiplier: 0.75,
        scrollFromAnywhere: true,
        });

        const scrollDivElement = document.getElementById("mouseScroll");

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
    } else {
        console.error("Il y a un probleme avec l'attribut : data-scroll-container");
    }
}


