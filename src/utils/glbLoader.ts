import {
  Scene,
  SceneLoader,
  Texture,
  StandardMaterial,
  Color3,
} from "@babylonjs/core";

// Simple interface for GLB loading options
interface GLBLoadOptions {
  meshName?: string;
  texturePath?: string;
  materialName?: string;
}

// Simple function to load a GLB file and apply texture
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

// Simple function to apply texture to a specific mesh
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

  // Configure texture (flip if needed)
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

  // Apply material to mesh
  targetMesh.material = material;

  console.log(`Texture applied to ${meshName}!`);
}
