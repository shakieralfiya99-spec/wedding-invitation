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
const weddingDate = new Date("August 16, 2026 11:00:00").getTime();

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