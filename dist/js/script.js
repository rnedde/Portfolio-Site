document.addEventListener("DOMContentLoaded", function () {
    const main = document.querySelector("main");

    // Ensure main is relatively positioned
    main.style.position = "relative";

    // Array of works (as strings matching the IDs)
    let works = [
        "knitworks",
        "murmurine",
        "bendi",
        "seeingtime",
        "linnaeus",
        "parallax",
        "lenticulight",
        "carmencarcass",
        "softsend",
        "290",
        "illustration"
    ];


    // Create a shared image element for the overlay
    const img = document.createElement("img");
    img.style.position = "absolute";
    img.style.top = "50%";
    img.style.left = "50%";
    img.style.transform = "translate(-50%, -50%)";
    img.style.width = "80%";
    img.style.height = "80%";
    img.style.objectFit = "cover";
    img.style.opacity = "0";
    img.style.transition = "opacity 0.3s ease";
    img.style.pointerEvents = "none";
    img.style.zIndex = "10";
    img.style.mixBlendMode = "hard-light";
    img.style.borderRadius = "59% 41% 70% 30% / 71% 66% 34% 29%";

    main.appendChild(img);

    works.forEach(workId => {
        const elem = document.getElementById(workId);
        if (!elem) return;

        elem.style.position = "relative"; // just in case

        elem.addEventListener("mouseenter", () => {
            img.src = `/images/${workId}.gif`;  // assumes image named exactly as id + .jpeg
            img.style.opacity = "1";
        });

        elem.addEventListener("mouseleave", () => {
            img.style.opacity = "0";
        });
    });


    function stretchOverlay() {
        const overlay = document.getElementById('noise-overlay');
        overlay.style.height = document.documentElement.scrollHeight + 'px';
    }

    window.addEventListener('load', stretchOverlay);
    window.addEventListener('resize', stretchOverlay);
    window.addEventListener('scroll', stretchOverlay); // Optional: in case content loads dynamically
});



