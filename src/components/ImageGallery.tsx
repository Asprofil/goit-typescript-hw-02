import React from 'react';
import ImageCard from './ImageCard.tsx';

interface ImageData {
  id: string;
  urls: { small: string; regular: string };
  alt_description: string;
  description?: string;
  user: { name: string };
  likes: number;
}

interface ImageGalleryProps {
  images: ImageData[];
  onImageClick: (image: ImageData) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onImageClick }) => {
  if (!images.length) return null;

  return (
    <ul>
      {images.map((image) => (
        <li key={image.id}>
          <ImageCard image={image} onImageClick={onImageClick} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
