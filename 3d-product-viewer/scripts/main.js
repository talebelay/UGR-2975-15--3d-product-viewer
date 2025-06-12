/**
 * main.js - Main application entry point that ties everything together
 */

// Import necessary modules (assuming these are defined elsewhere)
import * as THREE from "three"
import { initScene } from "./initScene.js"
import { createProduct, getChairParts } from "./createProduct.js"
import { addLighting } from "./addLighting.js"
import { initInteraction } from "./interaction.js"
import { initCameraAnimation, updateAnimations } from "./cameraAnimation.js"

// Variables for animation
let clock, deltaTime, elapsedTime
let sceneObjects = {}

/**
 * Initialize the application
 */
function init() {
  console.log("Starting 3D Product Viewer initialization...")

  // Check if THREE is available
  if (typeof THREE === "undefined") {
    console.error("THREE.js is not loaded yet. Waiting...")
    setTimeout(init, 100)
    return
  }

  // Initialize clock for animation timing
  clock = new THREE.Clock()

  // Initialize scene, camera, renderer, and controls
  const { scene, camera, renderer, controls } = initScene()

  // Create the chair product
  const chairGroup = createProduct(scene)

  // Add lighting to the scene
  const lights = addLighting(scene)

  // Initialize interaction
  initInteraction(camera, renderer.domElement, getChairParts)

  // Initialize camera animation
  initCameraAnimation(chairGroup)

  // Store all scene objects for later use
  sceneObjects = {
    scene,
    camera,
    renderer,
    controls,
    chairGroup,
    lights,
  }

  // Start the animation loop
  animate()

  console.log("3D Product Viewer initialized successfully!")
}

/**
 * Animation loop
 */
function animate() {
  requestAnimationFrame(animate)

  // Calculate delta time
  deltaTime = clock.getDelta()
  elapsedTime = clock.getElapsedTime()

  // Update controls
  sceneObjects.controls.update()

  // Update animations
  updateAnimations(sceneObjects.chairGroup, elapsedTime)

  // Render the scene
  sceneObjects.renderer.render(sceneObjects.scene, sceneObjects.camera)
}

// Wait for THREE.js to be loaded, then initialize
function waitForThree() {
  if (window.threeReady && typeof THREE !== "undefined") {
    console.log("THREE.js is ready, initializing app...")
    init()
  } else {
    console.log("Waiting for THREE.js to load...")
    setTimeout(waitForThree, 100)
  }
}

// Initialize the application when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded, waiting for THREE.js...")
  waitForThree()
})
