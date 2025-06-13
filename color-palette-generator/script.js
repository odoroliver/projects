const generateBtn = document.getElementById("generateBtn")
const paletteContainer = document.querySelector(".paletteContainer")

generateBtn.addEventListener("click", generatePalette)

paletteContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("copyBtn")) {
        const hexValue = e.target.previousElementSibling.textContent

        navigator.clipboard
            .writeText(hexValue)
            .then(() => {
                showCopySuccess(e.target)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    else if (e.target.classList.contains("colorBox")) {
        const hexValue = e.target.nextElementSibling.querySelector(".hexValue").textContent

        navigator.clipboard
            .writeText(hexValue)
            .then(() => {
                showCopySuccess(e.target.nextElementSibling.querySelector(".copyBtn"))
            })
            .catch((err) => {
                console.log(err)
            })
    }
})

function showCopySuccess(element) {
    element.classList.remove("fa-copy")
    element.classList.add("fa-check")

    element.style.color = "#48bb78";

    setTimeout(() => {
        element.classList.add("fa-copy")
        element.classList.remove("fa-check")
        element.style.color = "";
    }, 1500)
}

function generatePalette() {
    const colors = []

    for (let i = 0; i < 5; i++) {
        colors.push(generateRandomColor())
    }

    updatePaletteDisplay(colors)
}

function generateRandomColor() {
    const letters = "0123456789ABCDEF"
    let color = "#"

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

function updatePaletteDisplay(colors) {
    const paletteBoxes = document.querySelectorAll(".paletteBox")

    paletteBoxes.forEach((box, index) => {
        const color = colors[index]
        const colorDiv = box.querySelector(".colorBox")
        const hexValue = box.querySelector(".hexValue")

        colorDiv.style.backgroundColor = color
        hexValue.textContent = color
    })
}

generatePalette()