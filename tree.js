import {
    getCustomProperty,
    incrementCustomProperty,
    setCustomProperty,
  } from "./updateCustomProperty.js"

const SPEED = 0.035
const TREE_INTERVAL_MIN = 2000
const TREE_INTERVAL_MAX = 10000
const worldElem = document.querySelector("[data-world]")

let nextTreeTime
export function setuptree() {
    nextTreeTime = TREE_INTERVAL_MIN
    document.querySelectorAll("data-tree").forEach(tree => {
        tree.remove()
    })


}

export function updatetree(delta, speedScale) {
    document.querySelectorAll("[data-tree]").forEach(tree => {
      incrementCustomProperty(tree, "--left", delta * speedScale * SPEED * -1)
      if (getCustomProperty(tree, "--left") <= -100) {
        tree.style.bottom = 9;
        tree.remove()
      }
    })
  
    if (nextTreeTime <= 0) {
      createTree()
      nextTreeTime = randomNumberBetween(TREE_INTERVAL_MIN, TREE_INTERVAL_MAX) / speedScale
    }
    nextTreeTime -= delta
  }

export function getTreeRects() {
    return [...document.querySelectorAll("[data-tree]")].map(tree =>
        {   
            return tree.getBoundingClientRect()

        })
}
function createTree() {
    const tree = document.createElement("img")
    tree.dataset.tree = true
    tree.src = "images/tree.png"
    tree.style.bottom = 9 ;
    tree.classList.add("tree")
    tree.style.height= "8%";
    tree.style.bottom = 9;
    
    setCustomProperty(tree,"--left",100)
    worldElem.append(tree)
}

function randomNumberBetween(min,max) {
  return  Math.floor(Math.random() * (max - min +1) + min)
}