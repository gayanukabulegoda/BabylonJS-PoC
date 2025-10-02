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

    // Set backgroundcolor to the scene
    scene.clearColor = new Color4(0.75, 0.75, 0.75, 1.0);

    // Create a camera
    const camera = new ArcRotateCamera(
      "camera",
      -Math.PI / 2,
      Math.PI / 2.5,
      5,
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

    // Create a light
    const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    light.intensity = 1.5;

    const glbConfigs = [
      {
        glbFile: "billboard.glb",
        textures: [
          {
            meshName: "Billboard_1920x1080_001_primitive2",
            texturePath: "/images/bad_meow_01.jpg",
            materialName: "happyDogMaterial",
            isVideo: false,
          },
          {
            meshName: "Billboard_1920x1080_001_primitive1",
            texturePath: "/images/bad_meow_02.jpg",
            materialName: "badMeowMaterial",
            isVideo: false,
          },
        ],
      },
      {
        glbFile: "billboardGlow.glb",
        textures: [
          {
            meshName: "Billboard_1920x1080_001_primitive2",
            texturePath: "/images/bad_meow_01.jpg",
            materialName: "glowHappyDogMaterial",
            isVideo: false,
          },
          {
            meshName: "Billboard_1920x1080_001_primitive1",
            texturePath: "/images/bad_meow_02.jpg",
            materialName: "glowBadMeowMaterial",
            isVideo: false,
          },
        ],
      },
      {
        glbFile: "billboardForVideos.glb",
        textures: [
          {
            meshName: "Billboard_1920x1080_001_primitive2",
            texturePath: "/videos/hehe_emoji_video.mp4",
            materialName: "heheVideoMaterial",
            isVideo: true,
          },
          {
            meshName: "Billboard_1920x1080_001_primitive1",
            texturePath: "/videos/oops_emoji_video.mp4",
            materialName: "oopsVideoMaterial",
            isVideo: true,
          },
        ],
      },
    ];

    // Load all GLB files with their textures
    glbConfigs.forEach((config, index) => {
      config.textures.forEach((textureConfig) => {
        loadGLBWithTexture(scene, "/3D assets/", config.glbFile, {
          meshName: textureConfig.meshName,
          texturePath: textureConfig.texturePath,
          materialName: textureConfig.materialName,
          isVideo: textureConfig.isVideo,
        }).then((result) => {
          // Scale and position models side by side
          result.meshes.forEach((mesh) => {
            mesh.scaling = new Vector3(0.5, 0.5, 0.5);
            // Position first GLB on the left, second GLB on the right with more gap
            mesh.position = new Vector3(index * 12, 0, 0);
          });
          console.log(
            `${config.glbFile} loaded and positioned at x: ${index * 12}!`
          );
        });
      });
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
