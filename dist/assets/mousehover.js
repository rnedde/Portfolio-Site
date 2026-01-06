document.addEventListener("DOMContentLoaded", function () {
    const main = document.querySelector("main");

    // Ensure main is relatively positioned
    main.style.position = "relative";

    // Array of works (as strings matching the IDs)
    let works = [
        "knitworks",
        "murmurine",
        "seeingtime",
        "linnaeus",
        "parallax",
        "lenticulight",
        "carcass",
        "send",
        "twoninety",
        "illustration",
        "makingitvisible",
        "bendi"
    ];


    // Create a shared image element for the overlay
    const img = document.createElement("img");
    img.style.position = "absolute";
    img.style.top = "50%";
    img.style.left = "50%";

    // INITIAL STATE (hidden)
    img.style.opacity = "0";
    img.style.transform = "translate(-50%, -48%) scale(0.97)";

    img.style.width = "80%";
    img.style.height = "80%";
    img.style.objectFit = "cover";
    img.style.pointerEvents = "none";
    img.style.zIndex = "10";
    img.style.mixBlendMode = "multiply";
    img.style.borderRadius = "1rem";

    img.style.transition = `
  opacity 0.5s ease,
  transform 0.8s cubic-bezier(.16,1,.3,1)
`;
    main.appendChild(img);

    works.forEach(workId => {
        const elem = document.getElementById(workId);
        if (!elem) return;

        elem.style.position = "relative";

        elem.addEventListener("mouseenter", () => {
            img.src = `assets/images/cover_images/${workId}.jpeg`;
            img.style.opacity = "1";
            img.style.transform = "translate(-50%, -50%) scale(1)";
        });

        elem.addEventListener("mouseleave", () => {
            img.style.opacity = "0";
                  img.style.transform = "translate(-50%, -48%) scale(0.97)";

        });
    });

})