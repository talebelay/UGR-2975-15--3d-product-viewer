/**
 * interaction.js - Handles user interaction with the 3D product
 */

// Import necessary modules
import * as THREE from "three"

// Variables for raycasting and interaction
let raycaster, mouse
let selectedPart = null
let hoveredPart = null
let clickAnimationInProgress = false
let currentCamera, currentGetChairParts

/**
 * Initialize interaction functionality
 * @param {THREE.Camera} camera - The Three.js camera
 * @param {HTMLElement} canvas - The canvas element
 * @param {function} getChairParts - Function to get the chair parts
 */
function initInteraction(camera, canvas, getChairParts) {
  console.log("Initializing interaction...")

  // Store camera reference
  currentCamera = camera
  currentGetChairParts = getChairParts

  // Create raycaster and mouse vector
  raycaster = new THREE.Raycaster()
  mouse = new THREE.Vector2()

  // Add event listeners for mouse interaction
  canvas.addEventListener("mousemove", onMouseMove)
  canvas.addEventListener("click", onClick)

  // Add event listener for info panel close button
  const closeInfoButton = document.getElementById("close-info")
  closeInfoButton.addEventListener("click", closeInfoPanel)

  console.log("Interaction initialized")
}

/**
 * Handle mouse move events for hover effects
 * @param {Event} event - Mouse event
 */
function onMouseMove(event) {
  // Calculate mouse position in normalized device coordinates
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

  // Update the raycaster
  raycaster.setFromCamera(mouse, currentCamera)

  // Find intersections with chair parts
  const chairParts = currentGetChairParts()
  const intersects = raycaster.intersectObjects(chairParts)

  // Reset cursor style
  document.body.style.cursor = "default"

  // Reset previously hovered part if it's not the selected part
  if (hoveredPart && hoveredPart !== selectedPart) {
    resetPartAppearance(hoveredPart)
    hoveredPart = null
  }

  // Handle new hover
  if (intersects.length > 0) {
    const intersectedObject = intersects[0].object

    // Check if it's a chair part and not the currently selected part
    if (intersectedObject.userData.isChairPart && intersectedObject !== selectedPart) {
      // Set hover effect
      document.body.style.cursor = "pointer"
      hoveredPart = intersectedObject
      setHoverEffect(hoveredPart)
    }
  }
}

/**
 * Handle click events for part selection
 * @param {Event} event - Mouse event
 */
function onClick(event) {
  // Calculate mouse position in normalized device coordinates
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

  // Update the raycaster
  raycaster.setFromCamera(mouse, currentCamera)

  // Find intersections with chair parts
  const chairParts = currentGetChairParts()
  const intersects = raycaster.intersectObjects(chairParts)

  // Reset previously selected part
  if (selectedPart) {
    resetPartAppearance(selectedPart)
    selectedPart = null
  }

  // Close info panel if no new part is selected
  if (intersects.length === 0) {
    closeInfoPanel()
    return
  }

  // Handle new selection
  const intersectedObject = intersects[0].object

  // Check if it's a chair part
  if (intersectedObject.userData.isChairPart) {
    selectedPart = intersectedObject
    setClickEffect(selectedPart)
    showInfoPanel(selectedPart)
  }
}

/**
 * Apply hover effect to a chair part
 * @param {THREE.Mesh} part - The chair part mesh
 */
function setHoverEffect(part) {
  if (!part) return

  // Change material color to orange
  part.material.color.setHex(0xffa500)
  part.material.emissive.setHex(0x221100)

  // Slightly scale up the part
  part.scale.set(1.05, 1.05, 1.05)
}

/**
 * Apply click effect to a chair part
 * @param {THREE.Mesh} part - The chair part mesh
 */
function setClickEffect(part) {
  if (!part) return

  // Change material color to gold
  part.material.color.setHex(0xffd700)
  part.material.emissive.setHex(0x333300)

  // Scale up the part
  part.scale.set(1.1, 1.1, 1.1)

  // Add click animation
  clickAnimationInProgress = true

  // Quick scale down and up animation
  const originalScale = { x: 1.1, y: 1.1, z: 1.1 }
  part.scale.set(0.95, 0.95, 0.95)

  setTimeout(() => {
    part.scale.set(originalScale.x, originalScale.y, originalScale.z)
    clickAnimationInProgress = false
  }, 150)
}

/**
 * Reset a chair part to its original appearance
 * @param {THREE.Mesh} part - The chair part mesh
 */
function resetPartAppearance(part) {
  if (!part) return

  // Reset material color
  part.material.color.setHex(part.userData.originalColor)
  part.material.emissive.setHex(0x000000)

  // Reset scale
  part.scale.set(1, 1, 1)
}

/**
 * Show the info panel with part details
 * @param {THREE.Mesh} part - The chair part mesh
 */
function showInfoPanel(part) {
  if (!part) return

  const infoPanel = document.getElementById("info-panel")
  const partTitle = document.getElementById("part-title")
  const partDescription = document.getElementById("part-description")

  // Set panel content
  partTitle.textContent = part.userData.title
  partDescription.textContent = part.userData.description

  // Show the panel
  infoPanel.classList.remove("hidden")
}

/**
 * Close the info panel
 */
function closeInfoPanel() {
  const infoPanel = document.getElementById("info-panel")
  infoPanel.classList.add("hidden")

  // Reset selected part if there is one
  if (selectedPart) {
    resetPartAppearance(selectedPart)
    selectedPart = null
  }
}

/**
 * Check if click animation is in progress
 * @returns {boolean} True if animation is in progress
 */
function isClickAnimationInProgress() {
  return clickAnimationInProgress
}

/**
 * Get the currently selected part
 * @returns {THREE.Mesh|null} The selected part or null
 */
function getSelectedPart() {
  return selectedPart
}

// Export functions for use in other modules
export { initInteraction, getSelectedPart, isClickAnimationInProgress }
