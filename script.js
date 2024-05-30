'use strict';
let slot = document.getElementById('slot')

function DISABLE() {
    col.disabled = !col.disabled
    console.log(col.disabled)
}
let mirrorstyle = 'none'
function double(w) {
    switch (w) {
        case 'x':
            document.getElementById('intensityX').value = `${+document.getElementById('intensityX').value * 2}`
            break;
        case 'y':
            document.getElementById('intensityY').value = `${+document.getElementById('intensityY').value * 2}`
            break;
        case 'dur':
            document.getElementById('animlength').value = `${+document.getElementById('animlength').value * 2}`
            break;
        case 'zoom':
            document.getElementById('zoom').value = `${+document.getElementById('zoom').value * 2}`
            return zoom = +document.getElementById('zoom').value
            break;
        case 'anim':
            document.getElementById('animspeed').value = `${+document.getElementById('animspeed').value * 2}`
            break;
        case 'spin':
            document.getElementById('spinSpeed').value = `${+document.getElementById('spinSpeed').value * 2}`
            break;
        case 'size':
            document.getElementById('sizeMultiplier').value = `${+document.getElementById('sizeMultiplier').value + .01}`
            break;
    }
    updateSettings()
}

function half(w) {
    switch (w) {
        case 'x':
            document.getElementById('intensityX').value = `${+document.getElementById('intensityX').value / 2}`
            break;
        case 'y':
            document.getElementById('intensityY').value = `${+document.getElementById('intensityY').value / 2}`
            break;
        case 'dur':
            document.getElementById('animlength').value = `${+document.getElementById('animlength').value / 2}`
            break;
        case 'zoom':
            document.getElementById('zoom').value = `${+document.getElementById('zoom').value / 2}`
            return zoom = +document.getElementById('zoom').value
            break;
        case 'anim':
            document.getElementById('animspeed').value = `${+document.getElementById('animspeed').value / 2}`
            break;
        case 'spin':
            document.getElementById('spinSpeed').value = `${+document.getElementById('spinSpeed').value / 2}`
            break;
        case 'size':
            document.getElementById('sizeMultiplier').value = `${+document.getElementById('sizeMultiplier').value - .01}`
            break;
    }
    updateSettings()
}
((a) => {
    for (let o of Object.values(a)) {
        o['onclick'] = function () {
            updateSettings()
        }
    }
})(document.querySelectorAll('input[type="radio"]'))
document.querySelector('input[type="checkbox"]').onclick = function () {
    updateSettings()
}
const body = document.getElementById('body')
let canvas = document.getElementById('canvas'),
    col = document.getElementById('color'),
    ctx = canvas.getContext('2d')
let rot = 0
const rgb = {
    r: 255,
    b: 0,
    g: 0,
}
let currentSize;
canvas.width = 2000;
canvas.height = 1200
let miniplayer = document.getElementById('miniplayer')
let zoom = +document.getElementById('zoom').value,
    text = "Scroll down for settings ↓",
    text2 = 'Click/Tap for hints & to apply changes',
    animlength = +document.getElementById('animlength').value,
    animspeed = +document.getElementById('animspeed').value,
    intensityX = +document.getElementById('intensityX').value,
    intensityY = +document.getElementById('intensityY').value,
    animstyle = document.getElementById('animstyle').value,
    mini = false,
    offset = {
        x: rot,
        y: rot
    },
    fill = false,
    shape = 'quarter',
    reversed = false,
    spinstyle = null,
    color = '#FFFFFF',
    bgcolor = '#000000',
    sizeMultiplier = 0.95,
    mousepos = {
        x: 0,
        y: 0
    },
    spinSpeed = 0.05;

function cycleColour() {
    if (rgb.r === 255 && rgb.g !== 255 && rgb.b === 0) {
        rgb.g += increase
    }
    if (rgb.r !== 0 && rgb.g === 255 && rgb.b === 0) {
        rgb.r -= increase
    }
    if (rgb.r === 0 && rgb.g === 255 & rgb.b !== 255) {
        rgb.b += increase
    }
    if (rgb.r === 0 && rgb.g !== 0 && rgb.b === 255) {
        rgb.g -= increase
    }
    if (rgb.r !== 255 && rgb.g === 0 && rgb.b === 255) {
        rgb.r += increase
    }
    if (rgb.r === 255 && rgb.g === 0 && rgb.b !== 0) {
        rgb.b -= increase
    }
    if (rgb.r > 255) {
        rgb.r = 255
    }
    if (rgb.r < 0) {
        rgb.r = 0
    }
    if (rgb.g > 255) {
        rgb.g = 255
    }
    if (rgb.g < 0) {
        rgb.g = 0
    }
    if (rgb.b > 255) {
        rgb.b = 255
    }
    if (rgb.b < 0) {
        rgb.b = 0
    }
}
let scroll = 0;
const increase = 1;
let sizemult = 1

function detectScroll() {
    scroll = document.documentElement.scrollTop
}
const main = document.getElementById('canvas')

function Draw(x, y, size, inverse) {
    if (size <= 2 || size >= 10000) {
        return
    }
    let rotation, m = 1;
    rotation = rot
    switch (spinstyle) {
        case 'size':
            m = size / 20;
            break;
        case 'x':
            m = Math.atan2(x, y) * 6;
            break;
        case 'cursor':
            m = Math.atan2(offset.x, offset.y)
            break;
    }
    switch (document.querySelector('input[name="y"]:checked').value) {
        case 'axis':
            offset.y = rot;
            break;
        case 'spin':
            offset.y = Math.sin(rot)
            break
        case 'swirl':
            offset.y = Math.sin(rot / size) * 5
            break;
        case 'wiggle':
            offset.y = (Math.sin(rot * (rot / size)) + rot / size) * 5
            break;
        case 'pulse':
            offset.y = Math.sin(size / (rot + 0.0001)) * 4
            break;
        case 'swirl2':
            offset.y = Math.sin(size)
            break;
        case 'spinswirl':
            offset.y = Math.sin(size + rot)
            break;
        case 'flipswirl':
            offset.y = Math.sin(size) * Math.cos(rot)
            break;
        case 'disperse':
            offset.y = Math.atan2(Math.cos(size), Math.sin(size)) * rot
            break;
        case 'wavy':
            offset.y = ((rot / size) * Math.sin(rot)) - Math.cos(rot)
            break;
        case 'bounce':
            offset.y = Math.abs(Math.sin(rot))
            break;
        case 'chaos':
            offset.y = Math.random()
            break;
        case 'vacuum':
            offset.y = Math.sinh(rot / size)
            break;
        case 'magnet':
            offset.y = size / rot
            break;
        case 'orbit':
            offset.y = ((Math.cos(rot / size) * rot) / (size * 10)) * 50
            break;
        case 'reach':
            offset.y = size
            break;
        case 'swing':
            offset.y = Math.sin(rot / size) * Math.cos(rot / size) * rot
            break;
        case 'test':
            offset.y = Math.cos(rot / size) * Math.cos(rot / size)
            break;
    }
    switch (document.querySelector('input[name="x"]:checked').value) {
        case 'axis':
            offset.x = rot;
            break;
        case 'spin':
            offset.x = Math.cos(rot)
            break
        case 'swirl':
            offset.x = Math.cos(rot / size) * 5
            break;
        case 'wiggle':
            offset.x = (Math.cos(rot * (rot / size)) + rot / size) * 5
            break;
        case 'pulse':
            offset.x = Math.sin(size / (rot + 0.0001)) * 4
            break;
        case 'swirl2':
            offset.x = Math.cos(size)
            break;
        case 'spinswirl':
            offset.x = Math.cos(size + rot)
            break;
        case 'flipswirl':
            offset.x = Math.cos(size) * Math.cos(rot)
            break;
        case 'disperse':
            offset.x = Math.atan2(Math.cos(size), Math.sin(size)) * rot
            break;
        case 'wavy':
            offset.x = ((rot / size) * Math.cos(rot)) - Math.sin(rot)
            break;
        case 'bounce':
            offset.x = Math.abs(Math.cos(rot))
            break;
        case 'chaos':
            offset.x = Math.random()
            break;
        case 'vacuum':
            offset.x = Math.cosh(rot / size)
            break;
        case 'magnet':
            offset.x = size / rot
            break;
        case 'reach':
            offset.x = size
            break;
        case 'orbit':
            offset.x = ((Math.sin(rot / size) * rot) / (size * 10)) * 50
            break;
        case 'swing':
            offset.x = Math.sin(rot / size) * Math.cos(rot / size) * rot
            break;
        case 'test':
            offset.x = Math.abs((Math.cos(rot / size)/size)) * (Math.sin(rot / size)*Math.cos(rot/size))
            break;
    }
    currentSize = size
    ctx.save()
    ctx.translate(x * zoom, y * zoom)
    ctx.translate(zoom, zoom)
    ctx.beginPath()
    ctx.rotate(rotation * (m * spinSpeed))

    ctx.lineWidth = 2.5 * sizemult
    if (document.getElementById('rainbow').checked) {
        ctx.strokeStyle = `rgb(${rgb.r},${rgb.g},${rgb.b})`
    } else {
        ctx.strokeStyle = col.value
    }
    switch (shape) {
        case 'square': {
            ctx.moveTo(size * zoom, size * zoom)
            ctx.lineTo(size * zoom, -size * zoom)
            ctx.lineTo(-size * zoom, -size * zoom)
            ctx.lineTo(-size * zoom, size * zoom)
            ctx.lineTo(size * zoom, size * zoom)
        }
            break;
        case 'circle': {
            ctx.arc(0, 0, size * zoom, 0, 2 * Math.PI)
        }
            break;
        case 'donut': {
            ctx.arc(0, 0, size * zoom, 0, 2 * Math.PI)
            ctx.stroke()
            ctx.beginPath()
            ctx.arc(0, 0, (size * zoom) * 0.65, 0, 2 * Math.PI)
        }
            break;
        case 'quarter': {
            ctx.arc(0, 0, size * zoom, 0, 1.5 * Math.PI)
            ctx.lineTo(0, 0)
            ctx.closePath()
        }
            break;
        case 'half': {
            ctx.arc(0, 0, size * zoom, 0, Math.PI)
            ctx.closePath()
        }
            break;
        case 'ellipse': {
            ctx.ellipse(0, 0, (size * zoom), (size * zoom) / 1.5, Math.PI / 4, 0, 2 * Math.PI);
        }
            break;
        default: {
            ctx.moveTo(0 + ((size * 1.4) * zoom) * Math.cos(0), 0 + ((size * 1.4) * zoom) * Math.sin(0));
            for (var i = 1; i <= +shape; i++) {
                ctx.lineTo(0 + ((size * 1.4) * zoom) * Math.cos(i * 2 * Math.PI / +shape), 0 + ((size * 1.4) * zoom) * Math.sin(i * 2 * Math.PI / +shape));
            }
            ctx.closePath();
        }
    }
    ctx.stroke()
    ctx.restore()
    if (fill) {
        ctx.fill()
    }
    try {
        if (inverse === 0) {      Draw(x - (offset.x * distortion.x * intensityX), y - (offset.y * distortion.y * intensityY), size * sizeMultiplier, 0) }
        else if (inverse === 1) { Draw(x + (offset.x * distortion.x * intensityX), y + (offset.y * distortion.y * intensityY), size * sizeMultiplier, 1) }
        else if (inverse === 2) { Draw(x - (offset.x * distortion.x * intensityX), y + (offset.y * distortion.y * intensityY), size * sizeMultiplier, 2) }
        else if (inverse === 3) { Draw(x + (offset.x * distortion.x * intensityX), y - (offset.y * distortion.y * intensityY), size * sizeMultiplier, 3) }
    }
    catch (e) {
        text = 'An error has occurred:'
        ctx.fillStyle = 'red'
        text2 = e.message + '[error]'
        //  document.getElementById('sizeMultiplier').value = '0.95'
        sizeMultiplier = 0.95
        throw e
        return;
    }

}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
let distortion = {
    x:1,
    y:1
}
function updateSettings() {
    try {

        fill = document.getElementById('fill').checked
        sizeMultiplier = +document.getElementById('sizeMultiplier').value
        color = col.value
        bgcolor = document.getElementById('bgcolor').value
        shape = Math.trunc(+document.getElementById('sides').value) || document.getElementById('shape').value
        spinstyle = document.querySelector('input[name="spin"]:checked').value
        mirrorstyle = document.getElementById('mirror').value
        //  reversed = document.getElementById('reversed').checked
        rot = 0;
        spinSpeed = +document.getElementById('spinSpeed').value
        intensityY = +document.getElementById('intensityY').value
        intensityX = +document.getElementById('intensityX').value
        moving[4] = 0
        moving[5] = 0
        zoom = +document.getElementById('zoom').value
        animlength = +document.getElementById('animlength').value
        if (animlength <= 0) {
            animlength = Infinity
        }
        animspeed = +document.getElementById('animspeed').value
        animstyle = document.getElementById('animstyle').value

        if (animstyle = 'inverse') {
            animspeed = Math.abs(animspeed)
        }
        text = text2 = ''
    } catch (e) {
        text = 'An error has occurred:';
        text2 = e.message + '[error]'
        throw e
    }
}
const moving = [false, false, false, false, 0, 0]

function Update() {
    requestAnimationFrame(Update)

    cycleColour()
    if (reversed) {
        rot -= animspeed
    } else {
        rot += animspeed
    }
    if (scroll > +window.innerHeight / 2 && miniplayer.checked) {
        canvas.className = 'smallCanvas'
        slot.className = 'bigCanvas';
        canvas.style.position = 'fixed'
        slot.width = canvas.width
        slot.height = canvas.height
        canvas.style.width = `${400 * 1.5}px`
        canvas.style.height = `${225 * 1.5}px`
        sizemult = 3
    }
    if (scroll < +window.innerHeight / 2 || !miniplayer.checked) {
        slot.className = ''
        canvas.className = 'bigCanvas'
        canvas.style.position = ''
        canvas.style.width = `100%`
        canvas.style.height = slot.style.height
        slot.height = '0';
        slot.width = '0'
        sizemult = 3
    }
    if (mini) {
        canvas.style.width = `${window.innerWidth / 4}px`
    }
    if (Math.abs(rot) > Math.PI * animlength) {
        switch (animstyle) {
            case 'loop':
                rot = 0;
                break;
            case 'reverse':
                animspeed *= -1;
                break;
            case 'inverse':
                rot *= -1;
                break;
        }
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = bgcolor
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    if (moving[0]) {
        moving[4] -= 3 / zoom
    }
    if (moving[1]) {
        moving[4] += 3 / zoom
    }
    if (moving[2]) {
        moving[5] -= 3 / zoom
    }
    if (moving[3]) {
        moving[5] += 3 / zoom
    }
    try {
        switch (mirrorstyle) {
            case 'both':
                Draw((canvas.width / 2 / zoom) + moving[5], (canvas.height / 2 / zoom) + moving[4], 100, 3)

                Draw((canvas.width / 2 / zoom) + moving[5], (canvas.height / 2 / zoom) + moving[4], 100, 1)
            case 'top':
                Draw((canvas.width / 2 / zoom) + moving[5], (canvas.height / 2 / zoom) + moving[4], 100, 2)
                break;
            case 'left':
                Draw((canvas.width / 2 / zoom) + moving[5], (canvas.height / 2 / zoom) + moving[4], 100, 3)
                break;
        }
        Draw((canvas.width / 2 / zoom) + moving[5], (canvas.height / 2 / zoom) + moving[4], 100, 0)


    } catch (e) {
        text = 'An error has occurred:'
        ctx.fillStyle = 'red'
        text2 = e.message + '[error]'
        //  document.getElementById('sizeMultiplier').value = '0.95'
        sizeMultiplier = 0.95
        throw e
    }
    ctx.fillStyle = '#FFFFFF'
    ctx.textAlign = 'left'
    ctx.font = "50px lexend";
    if (slot.className !== 'bigCanvas') {
        ctx.fillText(text, 50, 90);
        if (text2.includes('[error]')) {
            ctx.fillStyle = '#FF3333'
        }
        ctx.fillText(text2.replace('[error]', ''), 50, 170);
    } else {
        ctx.textAlign = 'center'
        ctx.font = "100px lexend";
        ctx.fillText(text, canvas.width / 2, canvas.height / 2);
        if (text2.includes('[error]')) {
            ctx.fillStyle = '#FF3333'
        }
        ctx.fillText(text2.replace('[error]', ''), canvas.width / 2, (canvas.height / 2) + 100);
    }

}
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
        moving[0] = true;
        moving[1] = false;
    }
    if (e.key === 'ArrowDown') {
        moving[1] = true;
        moving[0] = false;
    }
    if (e.key === 'ArrowLeft') {
        moving[2] = true;
        moving[3] = false;
    }
    if (e.key === 'ArrowRight') {
        moving[2] = false;
        moving[3] = true;
    }
})
window.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowUp') {
        moving[0] = false;
    }
    if (e.key === 'ArrowDown') {
        moving[1] = false;
    }
    if (e.key === 'ArrowLeft') {
        moving[2] = false;
    }
    if (e.key === 'ArrowRight') {
        moving[3] = false;
    }
})
requestAnimationFrame(Update)
canvas.addEventListener('mousemove', (e) => {
    mousepos.x = e.x
    mousepos.y = e.y
})
window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
    }
})