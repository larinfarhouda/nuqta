"use client"

import { useState } from "react"
import Image, { type ImageProps } from "next/image"

// List of known problematic images that should be replaced with fallbacks
const PROBLEMATIC_IMAGES = ["/woman-portrait.png", "/middle-eastern-man.png"]

interface ImageWithFallbackProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string
}

export default function ImageWithFallback({
  src,
  alt,
  fallbackSrc = "/provider-abstract.png",
  ...rest
}: ImageWithFallbackProps) {
  // Check if the source is a problematic image before setting initial state
  const safeInitialSrc = typeof src === "string" && PROBLEMATIC_IMAGES.includes(src) ? fallbackSrc : src || fallbackSrc

  const [imgSrc, setImgSrc] = useState(safeInitialSrc)

  return (
    <Image
      {...rest}
      src={imgSrc || "/placeholder.svg"}
      alt={alt}
      onError={() => {
        console.log(`Failed to load image: ${imgSrc}, using fallback: ${fallbackSrc}`)
        setImgSrc(fallbackSrc)
      }}
    />
  )
}
