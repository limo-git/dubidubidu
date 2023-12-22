import {getCustomProperty,
        incrementCustomProperty, 
        setCustomProperty,} from "./updateCustomProperty.js"


const catElem = document.querySelector("[data-cat]");
const JUMP_SPEED = 0.40
const GRAVITY = 0.0045
const CAT_FRMAE_COUNT = 2
const FRAME_TIME = 225

let isJumping
let catFrame 
let currentFrameTime
let yVelocity



export function setupCat() {
    isJumping = false
    catFrame = 0
    currentFrameTime = 0
    yVelocity=0 
    
    setCustomProperty(catElem,"--bottom",12)
    document.removeEventListener("keydown", onJump)
    document.addEventListener("keydown", onJump)

}

export function updateCat(delta,speedScale) {
handleRun(delta, speedScale)
handleJump(delta)
}

export function getCatRect(){
    return catElem.getBoundingClientRect()
}

export function setCatLose (){
    catElem.src = "images/cat-station.png"
}
function handleRun(delta,speedScale) {
    if (isJumping) {
    catElem.src = `images/cat-run-1.png`
    catElem.style.height="10%";
    return
} if (currentFrameTime >= FRAME_TIME) {
    catFrame = (catFrame + 1) % CAT_FRMAE_COUNT
    catElem.src = `images/cat-run-${catFrame}.png`
    currentFrameTime -= FRAME_TIME


    catElem.style.height="10%";
    catElem.style.bottom= 15;
    
    
}
currentFrameTime += delta * speedScale

}

function handleJump(delta){
    if (!isJumping) return
    incrementCustomProperty(catElem, "--bottom", yVelocity*delta)

    if (getCustomProperty(catElem,"--bottom") <= 12) {
        setCustomProperty(catElem,"--bottom",12)
        isJumping = false
    }
    yVelocity -= GRAVITY * delta

}

function onJump(e) {
    if (e.code !== "Space" || isJumping) return
    yVelocity = JUMP_SPEED
    isJumping = true
}