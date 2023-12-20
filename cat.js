import {getCustomProperty,
        incrementCustomProperty, 
        setCustomProperty,} from "./updateCustomProperty.js"


const catElem = document.querySelector("[data-cat]")
const JUMP_SPEED = 0.45
const GRAVITY = 0.015

let isJumping
let yVelocity
export function setupCat() {
    isJumping = false
    yVelocity=0
    setCustomProperty(catElem,"--bottom",6)
    document.removeEventListener("keydown", onJump)
    document.addEventListener("keydown", onJump)

}

export function updateCat(delta,speedScale) {
handleRun(delta, speedScale)
handleJump(delta)
}

function handleRun(delta,speedScale) {
    if (isJumping)
    catElem.src = `images/cat.png`
    return
}

function handleJump(delta){
    if (!isJumping) return
    incrementCustomProperty(catElem, "--bottom", yVelocity*delta)

    if (getCustomProperty(catElem,"--bottom") <= 6) {
        setCustomProperty(catElem,"--bottom",6)
        isJumping = false
    }
    yVelocity -= GRAVITY * delta

}

function onJump(e) {
    if (e.code !== "space" || isJumping) return
    yVelocity = JUMP_SPEED
    isJumping = true
}