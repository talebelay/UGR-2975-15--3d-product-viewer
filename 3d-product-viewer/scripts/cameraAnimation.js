/**
 * cameraAnimation.js - Handles camera animation and product floating effect
 */

// Variables for animation
let animationTime = 0
let chairFloating = true
let animationChairGroup

function getSelectedPart() {
  return null
}

function isClickAnimationInProgress() {
  // Implementation should be provided elsewhere
  return false
}

/**
 * Initialize camera animation
 * @param {THREE.Group} chairGroup - The chair group to animate
 */
function initCameraAnimation(chairGroup) {
  console.log("Initializing camera animation...")
  // Set initial position for the chair group
  animationChairGroup = chairGroup
  animationChairGroup.position.y = 0
}

/**
 * Update camera and chair animations
 * @param {THREE.Group} chairGroup - The chair group to animate
 * @param {number} elapsedTime - Time elapsed since start
 */
function updateAnimations(chairGroup, elapsedTime) {
  // Update time
  animationTime = elapsedTime

  // Animate chair floating effect
  if (chairFloating && chairGroup) {
    chairGroup.position.y = Math.sin(animationTime * 0.5) * 0.1
  }

  // Animate selected part if there is one
  const selectedPart = getSelectedPart()
  if (selectedPart && !isClickAnimationInProgress()) {
    selectedPart.rotation.y = Math.sin(animationTime * 2) * 0.1
  }
}

/**
 * Toggle chair floating animation
 * @param {boolean} enabled - Whether floating should be enabled
 */
function setChairFloating(enabled) {
  chairFloating = enabled

  // Reset position if disabled
  if (!chairFloating && animationChairGroup) {
    animationChairGroup.position.y = 0
  }
}

// Export functions for use in other modules
export { initCameraAnimation, updateAnimations, setChairFloating }
