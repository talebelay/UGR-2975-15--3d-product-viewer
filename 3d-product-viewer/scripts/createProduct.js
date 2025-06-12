/**
 * createProduct.js - Creates the 3D product (chair) using basic Three.js geometries
 */

import * as THREE from "three"

// Chair parts data with information for each component
const chairPartsData = [
  // Seat
  {
    name: "seat",
    geometry: "box",
    args: [2, 0.2, 2],
    position: [0, 0, 0],
    color: 0x8b4513,
    title: "Chair Seat",
    description:
      "The main seating surface designed for comfort and durability. Made from solid oak wood with a smooth sanded finish.",
  },
  // Backrest
  {
    name: "backrest",
    geometry: "box",
    args: [2, 1.5, 0.2],
    position: [0, 0.85, -0.9],
    color: 0xa0522d,
    title: "Backrest",
    description:
      "Provides lumbar support and comfort for extended sitting. Features an ergonomic curve for optimal back support.",
  },
  // Front Left Leg
  {
    name: "front-left-leg",
    geometry: "cylinder",
    args: [0.08, 0.08, 1.5, 16],
    position: [-0.8, -0.75, 0.8],
    color: 0x654321,
    title: "Front Left Leg",
    description: "Sturdy front left leg made from solid wood with anti-slip base and reinforced joints for stability.",
  },
  // Front Right Leg
  {
    name: "front-right-leg",
    geometry: "cylinder",
    args: [0.08, 0.08, 1.5, 16],
    position: [0.8, -0.75, 0.8],
    color: 0x654321,
    title: "Front Right Leg",
    description: "Sturdy front right leg made from solid wood with anti-slip base and reinforced joints for stability.",
  },
  // Back Left Leg
  {
    name: "back-left-leg",
    geometry: "cylinder",
    args: [0.08, 0.08, 2.5, 16],
    position: [-0.8, -0.25, -0.8],
    color: 0x654321,
    title: "Back Left Leg",
    description:
      "Extended back left leg supporting both the seat and backrest with reinforced construction for durability.",
  },
  // Back Right Leg
  {
    name: "back-right-leg",
    geometry: "cylinder",
    args: [0.08, 0.08, 2.5, 16],
    position: [0.8, -0.25, -0.8],
    color: 0x654321,
    title: "Back Right Leg",
    description:
      "Extended back right leg supporting both the seat and backrest with reinforced construction for durability.",
  },
  // Armrest Left
  {
    name: "armrest-left",
    geometry: "box",
    args: [0.15, 0.1, 1.2],
    position: [-1.1, 0.3, -0.1],
    color: 0x8b4513,
    title: "Left Armrest",
    description:
      "Comfortable left armrest for relaxed arm positioning. Features a smooth surface and ergonomic height.",
  },
  // Armrest Right
  {
    name: "armrest-right",
    geometry: "box",
    args: [0.15, 0.1, 1.2],
    position: [1.1, 0.3, -0.1],
    color: 0x8b4513,
    title: "Right Armrest",
    description:
      "Comfortable right armrest for relaxed arm positioning. Features a smooth surface and ergonomic height.",
  },
]

// Store references to all chair parts
const chairParts = []
let chairGroup

/**
 * Create the chair product using basic Three.js geometries
 * @param {THREE.Scene} scene - The Three.js scene
 * @returns {THREE.Group} The chair group containing all parts
 */
function createProduct(scene) {
  console.log("Creating chair product...")

  // Create a group to hold all chair parts
  chairGroup = new THREE.Group()

  // Create each chair part based on the data
  chairPartsData.forEach((partData) => {
    const part = createChairPart(partData)
    chairGroup.add(part)
    chairParts.push(part)
  })

  // Add the chair group to the scene
  scene.add(chairGroup)

  // Create a ground plane for shadows
  const groundGeometry = new THREE.PlaneGeometry(20, 20)
  const groundMaterial = new THREE.MeshStandardMaterial({
    color: 0x1a1a1a,
    transparent: true,
    opacity: 0.3,
  })
  const ground = new THREE.Mesh(groundGeometry, groundMaterial)
  ground.rotation.x = -Math.PI / 2
  ground.position.y = -2
  ground.receiveShadow = true
  scene.add(ground)

  console.log("Chair created with", chairParts.length, "parts")
  return chairGroup
}

/**
 * Create a single chair part based on the provided data
 * @param {Object} partData - Data for the chair part
 * @returns {THREE.Mesh} The created mesh
 */
function createChairPart(partData) {
  // Create geometry based on the type
  let geometry

  switch (partData.geometry) {
    case "box":
      geometry = new THREE.BoxGeometry(...partData.args)
      break
    case "cylinder":
      geometry = new THREE.CylinderGeometry(...partData.args)
      break
    case "sphere":
      geometry = new THREE.SphereGeometry(...partData.args)
      break
    default:
      geometry = new THREE.BoxGeometry(...partData.args)
  }

  // Create material
  const material = new THREE.MeshStandardMaterial({
    color: partData.color,
    roughness: 0.3,
    metalness: 0.1,
  })

  // Create mesh
  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.set(...partData.position)

  // Enable shadows
  mesh.castShadow = true
  mesh.receiveShadow = true

  // Store part data in the mesh for interaction
  mesh.userData = {
    isChairPart: true,
    name: partData.name,
    title: partData.title,
    description: partData.description,
    originalColor: partData.color,
    originalScale: { x: 1, y: 1, z: 1 },
  }

  return mesh
}

/**
 * Get all chair parts
 * @returns {Array} Array of chair part meshes
 */
function getChairParts() {
  return chairParts
}

/**
 * Get the chair group
 * @returns {THREE.Group} The chair group
 */
function getChairGroup() {
  return chairGroup
}

// Export functions for use in other modules
export { createProduct, getChairParts, getChairGroup, createChairPart }
