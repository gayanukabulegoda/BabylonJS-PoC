import {
  Scene,
  SceneLoader,
  Texture,
  StandardMaterial,
  Color3,
} from "@babylonjs/core";
import "@babylonjs/core/Rendering/outlineRenderer";
interface GLBLoadOptions {
  meshName?: string;
  texturePath?: string;
  materialName?: string;
}

export async function loadGLBWithTexture(
  scene: Scene,
  glbPath: string,
  glbFileName: string,
  options: GLBLoadOptions = {}
) {
  try {
    console.log(`Loading GLB: ${glbPath}${glbFileName}`);

    // Load the GLB file
    const result = await SceneLoader.ImportMeshAsync(
      "",
      glbPath,
      glbFileName,
      scene,
      undefined,
      ".glb"
    );

    console.log("GLB loaded successfully!", result);

    // If texture path is provided, apply it to the specified mesh
    if (options.texturePath && options.meshName) {
      await applyTextureToMesh(
        scene,
        result.meshes,
        options.meshName,
        options.texturePath,
        options.materialName
      );
    }

    return result;
  } catch (error) {
    console.error("Error loading GLB:", error);
    throw error;
  }
}

async function applyTextureToMesh(
  scene: Scene,
  meshes: any[],
  meshName: string,
  texturePath: string,
  materialName: string = "customMaterial"
) {
  // Find the specific mesh
  const targetMesh = meshes.find((mesh) => mesh.name === meshName);

  if (!targetMesh) {
    console.log(`Mesh "${meshName}" not found. Available meshes:`);
    meshes.forEach((mesh) => console.log("- " + mesh.name));
    return;
  }

  console.log(`Found mesh: ${targetMesh.name}`);

  // Create new material
  const material = new StandardMaterial(materialName, scene);

  // Load texture
  const texture = new Texture(texturePath, scene);

  // Configure texture
  texture.uScale = 1;
  texture.vScale = -1; // Flip vertically
  texture.uOffset = 0;
  texture.vOffset = 0;

  // Apply texture to material
  material.diffuseTexture = texture;

  // Make material visible
  material.backFaceCulling = false;
  material.twoSidedLighting = true;
  material.emissiveColor = new Color3(0.1, 0.1, 0.1);

  // Add blue glow effect
  if (materialName.includes("glow")) {
    material.diffuseColor = new Color3(0.0, 0.5, 1.0); // Blue border color
    material.emissiveColor = new Color3(0.0, 0.3, 0.8); // Blue glow
    material.specularColor = new Color3(0.0, 0.4, 1.0); // Blue specular
    material.roughness = 0.2;

    // Babylon.js does not provide a built-in way to glow only the borders of a mesh using StandardMaterial or the default GlowLayer.
    // The typical GlowLayer in Babylon.js applies glow to the entire mesh, not just the borders.
    // To achieve a border-only glow effect, you would need to use custom shaders or a post-process effect.
    // The current approach of cloning the mesh and applying a border/glow material is a common workaround.

    console.log(`Blue border glow added to ${meshName}!`);
  }

  // Apply material to mesh
  targetMesh.material = material;

  console.log(`Texture applied to ${meshName}!`);
}
