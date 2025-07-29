document.addEventListener("keypress", (event) => {
    let text = event.key;
    document.querySelector(".message").innerHTML += `${text}`;
});

let interval = null;
let elapsedSeconds = 0;
let charCount = 0;

document.addEventListener("keypress", (event) => {
    if (event.key.length === 1) {
        charCount++;
    }
    document.querySelector(".message").innerHTML += `${event.key}`;
});

function update() {
    elapsedSeconds++;
    const hours = String(Math.floor(elapsedSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((elapsedSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(elapsedSeconds % 60).padStart(2, '0');
    document.getElementById('ScreenBtn').textContent = `${hours}:${minutes}:${seconds}`;
}

document.querySelector("#StartBtn").addEventListener("click", () => {
    if (interval === null) {
        interval = setInterval(update, 1000);
    }
});

document.querySelector("#StopBtn").addEventListener("click", () => {
    clearInterval(interval);
    interval = null;

    let speed = elapsedSeconds > 0 ? ((charCount / elapsedSeconds) * 60).toFixed(2) : 0;
    const speedMessage = `Typing Speed: ${speed} CPM (Characters Per Minute)`;
    
    const speedDisplay = document.createElement("div");
    speedDisplay.className = "speed";
    speedDisplay.textContent = speedMessage;
    document.querySelector(".message").appendChild(speedDisplay);
});

document.querySelector("#clearBtn").addEventListener("click", () => {
    document.querySelector(".message").innerHTML = ``;
    document.getElementById('ScreenBtn').textContent = `00:00:00`; 
    clearInterval(interval); 
    interval = null;
    elapsedSeconds = 0;
    charCount = 0;

    const existingSpeed = document.querySelector(".speed");
    if (existingSpeed) {
        existingSpeed.remove();
    }
});

document.querySelector("#backspaceBtn").addEventListener("click", () => {
    let content = document.querySelector(".message").innerHTML;
    document.querySelector(".message").innerHTML = content.slice(0, -1);
    if (charCount > 0) charCount--;
});
