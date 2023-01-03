import LocomotiveScroll from 'locomotive-scroll';

export function locomotiveScroll(){
    window.addEventListener("load", () => {
        const scroller = new LocomotiveScroll({
          el: document.querySelector("[data-scroll-container]"),
          smooth: true,
          multiplier: 0.75,
          scrollFromAnywhere: true,
        });
    });
    // setTimeout(() => {
    //     scroller.update();
    // }, 5000);
}

