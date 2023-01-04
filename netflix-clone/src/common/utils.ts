type dimension = "width" | "original"

export function createImageURL(path: string, width: number, type: dimension="width") {
    return type==="width"? `${import.meta.env.VITE_BASE_IMAGE_URI}/w${width}/${path}`: `${import.meta.env.VITE_BASE_IMAGE_URI}/${type}/${path}`
  }