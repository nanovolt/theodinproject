let container = document.querySelector(".container");

createContainer(2304, container);
container.style.gridTemplateColumns = "repeat(48, 1fr)";

function getRandomInteger(low, high) {
    let r = Math.floor(Math.random() * (high - low + 1)) + low;
    return r;
}

function createContainer(size, container) {
    for(let i=0; i< size; i++) {
        let pixel = document.createElement("div");
        pixel.classList.add("pixel");
        pixel.setAttribute("draggable", false);
        pixel.setAttribute("ondragstart", "return false");
        container.appendChild(pixel);
    }
    const pixels = document.querySelectorAll(".pixel");

    for (let pixel of pixels) {
        let opacityLevel = 0.2;
        pixel.addEventListener("mouseover", ()=> {
            if (isPressed) {
                if (color.classList.contains("toggle")) {

                    pixel.style.backgroundColor = `#${getRandomInteger(0, 999)}`;
                } else {
                    pixel.style.backgroundColor = `rgba(0,0,0,${opacityLevel})`;
                    opacityLevel += 0.2;
                }
                
            }
        })
        pixel.addEventListener("click", ()=> {
            pixel.style.backgroundColor = "#222";
        })
    }
}

let isPressed = false;
window.addEventListener("mousedown", () => {
    isPressed = true;
})
window.addEventListener("mouseup", () => {
    isPressed = false;
})


document.querySelector(".size48").onclick = ()=> {
    container.remove();
    container = document.createElement("div");
    document.body.appendChild(container);
    container.classList.add("container");
    createContainer(2304, container);
    container.style.gridTemplateColumns = "repeat(48, 1fr)";
}

document.querySelector(".size64").onclick = ()=> {
    container.remove();
    container = document.createElement("div");
    document.body.appendChild(container);
    container.classList.add("container");
    createContainer(4096, container);
    container.style.gridTemplateColumns = "repeat(64, 1fr)";
}

document.querySelector(".size100").onclick = ()=> {
    container.remove();
    container = document.createElement("div");
    document.body.appendChild(container);
    container.classList.add("container");
    createContainer(10000, container);
    container.style.gridTemplateColumns = "repeat(100, 1fr)";
}

const color = document.querySelector(".color");

color.addEventListener("click", (e)=> {
    console.log(e.target);
    e.target.classList.toggle("toggle");
})