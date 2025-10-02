"use client";

import { useEffect, useRef } from "react";
import {
  Engine,
  Scene,
  ArcRotateCamera,
  HemisphericLight,
  Vector3,
  Color4,
} from "@babylonjs/core";
import "@babylonjs/loaders/glTF";
import { loadGLBWithTexture } from "@/utils/glbLoader";

export default function BabylonScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Create the Babylon.js engine
    const engine = new Engine(canvasRef.current, true);

    // Create a scene
    const scene = new Scene(engine);

    // Set a professional light brown background
    scene.clearColor = new Color4(0.8, 0.7, 0.6, 1.0); // Light brown color with full opacity

    // Create a camera positioned closer to see the model better
    const camera = new ArcRotateCamera(
      "camera",
      -Math.PI / 2,
      Math.PI / 2.5,
      5, // Closer to the model
      Vector3.Zero(),
      scene
    );

    // Attach camera controls to the canvas
    camera.attachControl(canvasRef.current, true);

    // Add click handler to print mesh ID when clicked
    scene.onPointerObservable.add((pointerInfo) => {
      if (pointerInfo.pickInfo?.hit && pointerInfo.pickInfo.pickedMesh) {
        const clickedMesh = pointerInfo.pickInfo.pickedMesh;
        console.log("Clicked mesh ID:", clickedMesh.name);
        console.log("Mesh details:", clickedMesh);
      }
    });

    // Create a brighter light for better visibility
    const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    light.intensity = 1.5; // Brighter light

    // Load the billboard GLB model with texture
    loadGLBWithTexture(scene, "/3D assets/", "billboard.glb", {
      meshName: "Billboard_1920x1080_001_primitive2",
      texturePath: "/images/happy_dog.jpg",
      materialName: "billboardMaterial",
    }).then((result) => {
      // Scale the model to a smaller, more visible size
      result.meshes.forEach((mesh) => {
        mesh.scaling = new Vector3(0.5, 0.5, 0.5); // Smaller size for better visibility
        mesh.position = Vector3.Zero(); // Center the model
      });
      console.log("Model scaled and positioned for better visibility!");
    });

    // Load the same GLB model with different texture for primitive1
    loadGLBWithTexture(scene, "/3D assets/", "billboard.glb", {
      meshName: "Billboard_1920x1080_001_primitive1",
      texturePath: "/images/bad_meow.jpg",
      materialName: "badMeowMaterial",
    });

    // Start the render loop
    engine.runRenderLoop(() => {
      scene.render();
    });

    // Handle window resize
    const handleResize = () => {
      engine.resize();
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
      engine.dispose();
    };
  }, []);

  return (
    <div className="w-full h-screen">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ outline: "none" }}
      />
    </div>
  );
}
