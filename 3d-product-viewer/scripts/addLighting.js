/**
 * addLighting.js - Sets up the lighting for the 3D scene
 */

import * as THREE from "three"

/**
 * Add lighting to the scene
 * @param {THREE.Scene} scene - The Three.js scene
 */
function addLighting(scene) {
  console.log("Adding lighting to scene...")

  // Add ambient light for general illumination
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
  scene.add(ambientLight)

  // Add directional light for main illumination and shadows
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
  directionalLight.position.set(10, 10, 5)
  directionalLight.castShadow = true

  // Configure shadow properties for better quality
  directionalLight.shadow.mapSize.width = 2048
  directionalLight.shadow.mapSize.height = 2048
  directionalLight.shadow.camera.near = 0.5
  directionalLight.shadow.camera.far = 50
  directionalLight.shadow.camera.left = -10
  directionalLight.shadow.camera.right = 10
  directionalLight.shadow.camera.top = 10
  directionalLight.shadow.camera.bottom = -10

  scene.add(directionalLight)

  // Add spotlight for highlights and additional shadows
  const spotLight = new THREE.SpotLight(0xffffff, 0.5)
  spotLight.position.set(-5, 5, 5)
  spotLight.angle = 0.3
  spotLight.penumbra = 0.5
  spotLight.castShadow = true
  spotLight.shadow.mapSize.width = 1024
  spotLight.shadow.mapSize.height = 1024

  scene.add(spotLight)

  // Add a subtle blue rim light from behind
  const rimLight = new THREE.PointLight(0x6495ed, 0.5)
  rimLight.position.set(0, 3, -5)
  scene.add(rimLight)

  console.log("Lighting added successfully")
  return { ambientLight, directionalLight, spotLight, rimLight }
}

// Export the addLighting function
export { addLighting }
