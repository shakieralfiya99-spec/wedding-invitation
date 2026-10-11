const glow = document.getElementById("glow");
const cover = document.getElementById("cover");
const website = document.getElementById("website");
const music = document.getElementById("bgMusic");
const doors = document.getElementById("doors");

    cover.addEventListener("click", () => {

    music.play().catch(error => {
    console.log(error);
});
    
    for (let i = 0; i < 20; i++) {
        setTimeout(createPetal, i * 120);
    }

    doors.classList.add("open");
    glow.style.opacity = "1";
    console.log(doors.className);

   setTimeout(() => {

    cover.style.opacity = "0";

},1000);

setTimeout(() => {

    cover.style.display = "none";

},1800);

});

// Change this to your wedding date
const weddingDate = new Date("December 30, 2026 11:00:00").getTime();

function updateCountdown(){

const now = new Date().getTime();

const distance = weddingDate - now;

const days = Math.floor(distance/(1000*60*60*24));

const hours = Math.floor((distance%(1000*60*60*24))/(1000*60*60));

const minutes = Math.floor((distance%(1000*60*60))/(1000*60));

const seconds = Math.floor((distance%(1000*60))/1000);

document.getElementById("days").textContent=days;
document.getElementById("hours").textContent=hours;
document.getElementById("minutes").textContent=minutes;
document.getElementById("seconds").textContent=seconds;

}

updateCountdown();

setInterval(updateCountdown,1000);

function createPetal(){

    const petal = document.createElement("div");

    petal.className = "petal";

    petal.innerHTML = "🌹";

    petal.style.left = Math.random() * 100 + "vw";

    petal.style.animationDuration = (3 + Math.random() * 3) + "s";

    document.getElementById("petals").appendChild(petal);

    setTimeout(() => {

        petal.remove();

    },6000);

}

/* ========================================= */
/* SCRATCH CARD */
/* ========================================= */

const scratchCanvas = document.getElementById("scratchCanvas");
const scratchReveal = document.getElementById("scratchReveal");
const rsvpBtn = document.getElementById("rsvpBtn");

if (scratchCanvas && scratchReveal) {

    const ctx = scratchCanvas.getContext("2d");

    const scratchImage = new Image();
    scratchImage.src = "scratch-card.png";

    let isDrawing = false;
    let revealed = false;

    function resizeCanvas() {

        scratchCanvas.width = scratchReveal.offsetWidth;
        scratchCanvas.height = scratchReveal.offsetHeight;

        ctx.drawImage(
            scratchImage,
            0,
            0,
            scratchCanvas.width,
            scratchCanvas.height
        );

    }

    scratchImage.onload = resizeCanvas;

    window.addEventListener("resize", resizeCanvas);

    function getPosition(e) {

        const rect = scratchCanvas.getBoundingClientRect();

        if (e.touches) {

            return {

                x: e.touches[0].clientX - rect.left,
                y: e.touches[0].clientY - rect.top

            };

        }

        return {

            x: e.clientX - rect.left,
            y: e.clientY - rect.top

        };

    }

    function scratch(e) {

        if (!isDrawing || revealed) return;

        const pos = getPosition(e);

        ctx.globalCompositeOperation = "destination-out";

        ctx.beginPath();

        ctx.arc(pos.x, pos.y, 30, 0, Math.PI * 2);

        ctx.fill();

        checkReveal();

    }

    function checkReveal() {

        const imageData = ctx.getImageData(
            0,
            0,
            scratchCanvas.width,
            scratchCanvas.height
        );

        let transparent = 0;

        for (let i = 3; i < imageData.data.length; i += 4) {

            if (imageData.data[i] === 0) {

                transparent++;

            }

        }

        const percent =
            (transparent / (scratchCanvas.width * scratchCanvas.height)) * 100;

       if (percent > 10 && !revealed) {

    revealed = true;

    createShinyPopper();

    scratchCanvas.style.transition = ".6s";
    scratchCanvas.style.opacity = "0";

    setTimeout(() => {

        rsvpBtn.classList.add("show");

    }, 500);

}

    }

    /* Desktop */

    scratchCanvas.addEventListener("mousedown", () => {

        isDrawing = true;

    });

    scratchCanvas.addEventListener("mouseup", () => {

        isDrawing = false;

    });

    scratchCanvas.addEventListener("mouseleave", () => {

        isDrawing = false;

    });

    scratchCanvas.addEventListener("mousemove", scratch);

    /* Mobile */

    scratchCanvas.addEventListener("touchstart", e => {

        isDrawing = true;

        scratch(e);

    });

    scratchCanvas.addEventListener("touchmove", e => {

        e.preventDefault();

        scratch(e);

    }, { passive:false });

    scratchCanvas.addEventListener("touchend", () => {

        isDrawing = false;

    });

}

function createShinyPopper() {

    const wrapper = document.querySelector(".scratch-wrapper");

    for (let i = 0; i < 70; i++) {

        const sparkle = document.createElement("div");

        sparkle.className = "sparkle";

        const angle = Math.random() * Math.PI * 2;
        const distance = 80 + Math.random() * 120;

        sparkle.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
        sparkle.style.setProperty("--y", `${Math.sin(angle) * distance}px`);

        sparkle.style.left = "50%";
        sparkle.style.top = "56%";

        sparkle.style.animationDelay = `${Math.random() * 0.2}s`;

        wrapper.appendChild(sparkle);

        sparkle.addEventListener("animationend", () => sparkle.remove());

    }

}