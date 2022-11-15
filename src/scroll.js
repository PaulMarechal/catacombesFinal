import LocomotiveScroll from 'locomotive-scroll';

export function locomotiveScroll(){
    const scroller = new LocomotiveScroll({
        el: document.querySelector("[data-scroll-container]"),
        smooth: true
    });
}

