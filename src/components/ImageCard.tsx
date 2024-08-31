import React from 'react';


interface ImageData {
  id: string;
  urls: { small: string; regular: string };
  alt_description: string;
  description?: string;
  user: { name: string };
  likes: number;
}

interface ImageCardProps {
  image: ImageData;
  onImageClick: (image: ImageData) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onImageClick }) => (
  <div onClick={() => onImageClick(image)}>
    <img src={image.urls.small} alt={image.alt_description} />
  </div>
);

export default ImageCard;
