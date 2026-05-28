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
    duration: 2,

    scrollTrigger: {
        trigger: ".pessoa",
        start: "0% 70%",
        end: "100% 60%",
        scrub: 2,
    }
});


gsap.from(".creci", {
    opacity: 0,
    filter: "blur(5px)",
})

gsap.to(".creci", {
    x:280,

    scrollTrigger: {
        Trigger: ".creci",
        start: "0% 85%",
        end: "100% 50%",
        scrub: 3
    }
})

//animaçoes cards
gsap.from(".card", {
    opacity: 0,
    stagger: .3,
    y: 30,
    filter: "blur(5px)",

    scrollTrigger: {
        trigger: ".card",
        start: "0% 75%",
        scrub: 2,
        end: "100% 40%" 
    }
});