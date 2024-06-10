'use strict';
let  indicators = ['Axis', 'Cosine', 'Swirl', 'Static', 'Reach', 'Twist', 'Flip', 'Disperse', 'Whip', 'Bounce', 'Chaos', 'Vacuum', 'Magnet', 'Unwind', 'Orbit', 'Wiggle', 'Swing','Zigzag','Flicker']
for (let i = 0; i < indicators.length; i++) {
    $('#modif').append(`<button name='x'class='tile${i ? ' deselected' : ' selected'}'>${indicators[i]}</button>`)

}
for (let i = 0; i < indicators.length; i++) {
    $('#modif2').append(`<button name='y'class='tile${i ? ' deselected' : ' selected'}'>${indicators[i] === 'Cosine' ? 'Sine' : indicators[i]}</button>`)

}
$('.container2').append(`<div class='grid2'>
<div class='grid2'><span>X Intensity</span><input id='intensitX' type='text' value='1' class='grid2'><button>×2</button><button>÷2</button><br>
 <span>Y Intensity</span><input type='text' id='intensitY' value='1'class='grid2'><button>×2</button><button>÷2</button>
 <span>Spin Speed</span><input type='text' id='spin' value='0.05'  class='grid2'><button>×2</button><button>÷2</button>
 <span>Anim Dura.</span><input type='text' placeholder='Blank = Infinity' id='dura' value='24' class='grid2'><button>×2</button><button>÷2</button>
 <span>Size Mult.</span><input type='text' id='size' value='0.95' class='grid2 f'><button>+.01</button><button>-.01</button>
 <span>Layered </span><input class='check' id='layer' type='checkbox'><br>
 <br>
 <span>Loop</span><input type='checkbox' id='loop' class='check'><br><br>
 <span>Shape <select id='sel'>  
 
 <option value='quarter'>Quarter Circle</option>
 <option value='circle'>Circle</option>

 <option value='half'>Half Circle</option>           
 <option value='ellipse'>Ellipse</option>           
 <option value='2'>2</option>           
 <option value='3'>3</option>           
 <option value='4'>4</option>           
 <option value='5'>5</option>           
 <option value='6'>6</option>           
 <option value='7'>7</option>           
 <option value='8'>8</option>           
 <option value='9'>9</option>           
 <option value='10'>10</option>           

 </select></span><br><br>
 <span>Mirror <select id='mirror'>  
 <option value='none'>None</option>
 <option value='top'>Vertical</option>           
 <option value='left'>Horizontal</option>           
 <option value='both'>Both</option>           
           
 </select></span>
 <br>
 <br>
 <span>Rainbow Style
 <br><input type='radio' value='Cycle' name='color1' checked><label for='color1'>Cycle</label>
 <br><input type='radio' value='Gradual' name='color1'><label>Gradual</label></span>
 
 </div>
</div>`)
$('.container2').children().each(function () {
    let me = $(this)[0]
    if (me.className !== 'bottom' && me.className !== 'bottomDiv' && me.className !== 'scroll' && me.className !== 'grid2') {
        $(this).hide()
    }
})
$('.grid2').children().children().each(function () {
    if (this.innerHTML === '×2') {
        $(this).on({
            click: function () {
                $(this).prev()[0].value *= 2
                updateSettings()
            }
        })
    }
    else if (this.innerHTML === '÷2') {
        $(this).on({
            click: function () { $(this).prev().prev()[0].value
                $(this).prev().prev()[0].value /= 2
                updateSettings()
            }
        })
    }
    else if (this.innerHTML === '+.01') {
        $(this).on({
            click: function () {
                $(this).prev()[0].value = +$(this).prev()[0].value +  .01
                updateSettings()
            }
        })
    }
    else if (this.innerHTML === '-.01') {
        $(this).on({
            click: function () {
                $(this).prev().prev()[0].value -= .01
                updateSettings()
            }
        })
    }
    else {
        $(this).on({
            click: function () {
                updateSettings()
            }
        })
    }
})
function Show(w) {
    $('.container2').children().each(function () {
        let me = $(this)[0]
        if (me.className !== 'bottom' && me.className !== 'bottomDiv' && me.className !== 'scroll') {
            $(this).hide()
        }
    })
    let temp = {
        menu1: function () {
            $('.container2').children().each(function () {
                let me = $(this)[0]
                if (me.className === 'grid') {
                    $(this).show()
                }
            })
        },
        menu2: function () {
            $('.container2').children().each(function () {
                let me = $(this)[0]
                if (me.className === 'grid2') {
                    $(this).show()
                }
            })
        }
    }
    temp[w]()


}
Show('menu1')
let hidden = false
let selectedX = 'Axis',
    selectedY = 'Axis'
$('#modif').children().each(function () {
    $(this).on({
        click: function () {
            $('[name=x]').each(function () {
                this.className = 'tile deselected'
            })
            selectedX = this.innerHTML
            this.className = 'tile selected'
            updateSettings()
        }
    })
})
$('#modif2').children().each(function () {
    $(this).on({
        click: function () {
            $('[name=y]').each(function () {
                this.className = 'tile deselected'
            })
            selectedY = this.innerHTML
            this.className = 'tile selected'
            updateSettings()
        }
    })
})
function hideSettings() {
    if (!hidden) {
        $('.container2').animate({ left: -350 })
        $('.scroll').html('Show')
        console.log(1)
        hidden = true
    }
    else {
        $('.container2').animate({ left: 20 })
        $('.scroll').html('Hide')
        hidden = false
    }
}




let mirrorstyle = 'none'
const choose = (...a) => a[Math.floor(Math.random() * a.length)]



const body = $('body')[0]
let canvas = $('canvas')[0],
    col = 'red',
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
let zoom = 0.5,
    text = "",
    text2 = '',
    animlength = 24,
    animspeed = 0.3,
    intensityX = 1,
    intensityY = 1,
    animstyle = false,
    mini = false,
    offset = {
        x: rot,
        y: rot
    },
    fill = false,
    shape = 'quarter',
    reversed = false,
    spinstyle = 'size',
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

const main = document.getElementById('canvas')
let rainbowType = 'Cycle'
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
    const formulasx = {
        axis: rot,
        cosine: Math.cos(rot),
        swirl: Math.sin(rot / size) * 5,
        wiggle: (Math.sin(rot * (rot / size)) + rot / size) * 5,
        unwind: Math.sin(size / (rot + 0.0001)) * 4,
        static: Math.sin(size),
        flip: Math.sin(size + rot),
        twist: Math.sin(size) * Math.cos(rot) * 50,
        disperse: Math.atan2(Math.cos(size), Math.sin(size)) * rot,
        whip: ((rot / size) * Math.sin(rot)) - Math.cos(rot),
        bounce: Math.abs(Math.sin(rot)),
        chaos: Math.random(),
        vacuum: Math.sinh(rot / size),
        magnet: size / rot,
        orbit: ((Math.cos(rot / size) * rot) / (size * 10)) * 50,
        reach: size,
        swing: Math.sin(rot / size) * Math.cos(rot / size) * rot,
        zigzag: Math.cos(rot/size) * Math.sin(rot/size) * Math.cos(rot/size) * Math.tan(rot/size),    },
        formulasy = {
            test:rot,
            axis: rot,
            sine: Math.sin(rot),
            zigzag: Math.sin(rot/size) * Math.cos(rot/size) * Math.sin(rot/size) * Math.tan(rot/size),
            swirl: Math.cos(rot / size) * 5,
            wiggle: (Math.cos(rot * (rot / size)) + rot / size) * 5,
            unwind: Math.cos(size / (rot + 0.0001)) * 4,
            static: Math.cos(size),
            flip: Math.cos(size + rot),
          //  twist: Math.cos(size) * Math.sin(rot) * 50,
            disperse: Math.atan2(Math.sin(size), Math.cos(size)) * rot,
            whip: ((rot / size) * Math.cos(rot)) - Math.sin(rot),
            bounce: Math.abs(Math.cos(rot)),
            chaos: Math.random(),
            vacuum: Math.cosh(rot / size),
            magnet: size / rot,
            orbit: ((Math.sin(rot / size) * rot) / (size * 10)) * 50,
            reach: size,
            swing: Math.cos(rot / size) * Math.sin(rot / size) * rot,
            twist: Math.sin(rot / size) * Math.sin(rot / size),
        }
    formulasy.flicker = frame % 2 ? formulasy.swirl : formulasy.orbit
    formulasx.flicker = frame % 2 ? formulasy.swirl : formulasy.orbit

    console.log(rotation)
    offset.x = formulasx[selectedX.toLowerCase()];
    offset.y = formulasy[selectedY.toLowerCase()];
    currentSize = size
    ctx.save()
    ctx.translate(x * zoom, y * zoom)
    ctx.translate(zoom, zoom)
    ctx.beginPath()
    ctx.rotate(rotation * (m * spinSpeed))

    ctx.lineWidth = 2.5 * sizemult
        if (rainbowType === 'Cycle') {
            ctx.strokeStyle = `rgb(${rgb.r},${rgb.g},${rgb.b})`
        }
       else { ctx.strokeStyle = `hsl(${100-size*2},100%,50%)`}

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
        if (inverse === 0) { Draw(x - (offset.x * distortion.x * intensityX), y - (offset.y * distortion.y * intensityY), size * sizeMultiplier, 0) }
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
    x: 1,
    y: 1
}
function updateSettings() {
    try {

        /*  fill = document.getElementById('fill').checked
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
          animlength = +document.getElementById('animlength').value*/
          spinSpeed = $('#spin')[0].value
          shape = $('#sel')[0].value
          fill = $('#layer')[0].checked
          mirrorstyle = $('#mirror')[0].value
          sizeMultiplier = $('#size')[0].value
          animlength = $('#dura')[0].value
          rainbowType = $('input:radio:checked')[0].value
          intensityY = $('#intensitY')[0].value
          intensityX = $('#intensitX')[0].value
          animstyle = $('#loop')[0].checked

        rot = 0
        if (animlength <= 0) {
            animlength = Infinity
        }
        //  animspeed = +document.getElementById('animspeed').value
        //animstyle = document.getElementById('animstyle').value

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
let frame = 0
function Update() {
   frame= requestAnimationFrame(Update)
    cycleColour()

    canvas.height = window.innerHeight
    canvas.width = window.innerWidth
    if (reversed) {
        rot -= animspeed
    } else {
        rot += animspeed
    }


    if (Math.abs(rot) > Math.PI * animlength) {
        /*switch (animstyle) {
            default:
                rot = 0;
                break;
            case 'reverse':
                animspeed *= -1;
                break;
            case 'inverse':
                rot *= -1;
                break;
        }*/
        animstyle ? rot = 0 : animspeed *= -1   
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

    ctx.textAlign = 'center'
    ctx.font = "60px lexend";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    if (text2.includes('[error]')) {
        ctx.fillStyle = '#FF3333'
    }
    ctx.fillText(text2.replace('[error]', ''), canvas.width / 2, (canvas.height / 2) + 100);


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
    if (e.key.toLowerCase() === 'r') {
        random()
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
$('canvas').on({
    mousedown: updateSettings
})
$(document).on({
    wheel: function (event) {
        zoom += Math.sign(event.originalEvent.wheelDeltaY) * 0.01
        zoom = Math.max(0.004, zoom)
    }
})