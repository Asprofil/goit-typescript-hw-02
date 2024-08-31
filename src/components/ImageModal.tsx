import React from 'react';
import Modal from 'react-modal';

interface ImageData {
  id: string;
  urls: { small: string; regular: string };
  alt_description: string;
  description?: string;
  user: { name: string };
  likes: number;
}

interface ImageModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  image: ImageData | null;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onRequestClose, image }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    ariaHideApp={false} // Add this line if you encounter issues with screen readers
    contentLabel="Image Modal"
  >
    {image ? (
      <div>
        <img src={image.urls.regular} alt={image.alt_description} />
        <p>{image.description || image.alt_description}</p>
        <p>By {image.user.name}</p>
        <p>{image.likes} likes</p>
      </div>
    ) : (
      <p>No image selected</p>
    )}
  </Modal>
);

export default ImageModal;
