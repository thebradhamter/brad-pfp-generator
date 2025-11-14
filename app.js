const bradImg = document.getElementById("bradImg");
const bradOverlay = document.getElementById("bradOverlay");
const bradColours = document.getElementById("bradColours");
const bradColoursYellow = document.getElementById("bradColoursYellow");
const bradOverlays = document.getElementById("bradOverlays");
const bradOverlaysNone = document.getElementById("bradOverlaysNone");
const customHueDiv = document.getElementById("customHueDiv");
const hueText = document.getElementById("hueText");
const hueSlider = document.getElementById("hueSlider");
const downloadBtn = document.getElementById("downloadBtn");

function update() {
    customHueDiv.hidden = true;
    if (bradColours.value === "custom") {
        customHueDiv.hidden = false;
        bradImg.src = "./img/brads/yellow.png";
        bradImg.style.filter = `hue-rotate(${hueSlider.value}deg)`;
    } else {
        bradImg.src = `./img/brads/${bradColours.value}.png`;
        bradImg.style.filter = "";
    }
    bradOverlay.src = `./img/overlays/${bradOverlays.value}.png`;
    hueText.innerHTML = `Custom hue (${hueSlider.value}°):`;
}

bradColours.addEventListener("change", update);
bradOverlays.addEventListener("change", update);

hueSlider.addEventListener("input", function () {
    hueText.innerHTML = `Custom hue (${this.value}°):`;
    bradImg.style.filter = `hue-rotate(${this.value}deg)`;
});

downloadBtn.addEventListener("click", function () {
    const baseImg = new Image();
    baseImg.crossOrigin = "anonymous";
    baseImg.src = bradImg.src;

    baseImg.onload = function () {
        const c = document.createElement("canvas");
        c.width = baseImg.width;
        c.height = baseImg.height;
        const ctx = c.getContext("2d");

        if (!customHueDiv.hidden) {
            ctx.filter = `hue-rotate(${hueSlider.value}deg)`;
        }
        ctx.drawImage(baseImg, 0, 0);
        ctx.filter = "none";

        if (bradOverlay.src) {
            const overlayImg = new Image();
            overlayImg.crossOrigin = "anonymous";
            overlayImg.src = bradOverlay.src;
            overlayImg.onload = function () {
                ctx.drawImage(overlayImg, 0, 0, c.width, c.height);

                const link = document.createElement("a");
                link.href = c.toDataURL("image/png");
                link.download = "brad.png";
                link.click();
            };
        } else {
            const link = document.createElement("a");
            link.href = c.toDataURL("image/png");
            link.download = "brad.png";
            link.click();
        };
    };
});

update();