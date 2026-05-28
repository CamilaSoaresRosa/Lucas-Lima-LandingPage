gsap.registerPlugin(ScrollTrigger,ScrollSmoother,SplitText);

ScrollSmoother.create({
    smooth: 1.5,
    effects: true
});

//animações hero
gsap.from(".hero", {
    opacity: 0,
    duration: 1
});

gsap.from(".pessoa", {
    x: 200,
    duration: 2
});

//animaçoes cards
gsap.from(".card", {
    opacity: 0,
    stagger: .3,
    y: 30,
    filter: "blur(5px)",

    scrollTrigger: {
        trigger: ".card",
        markers: true,
        start: "0% 75%",
        scrub: true,
        end: "100% 40%" 
    }
})