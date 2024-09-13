// Function to dynamically import images using Vite's import.meta.glob
function importAllImages() {
    const images = import.meta.glob("../../assets/photos/photo-*-airballcup.*");
    return Object.keys(images).map((key) => images[key]);

    
  };
  
  export async function getImages() {
    const imageModules = importAllImages();
    
    return await Promise.all(
        imageModules.map(async (module) => {
          const mod = await module();
          return (mod as { default: string }).default;
        })
      );
  }