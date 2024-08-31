import React, { useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import LoadMoreBtn from './LoadMoreBtn';
import ImageModal from './ImageModal';
import '../App.css'

interface ImageData {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
  description?: string;
  user: {
    name: string;
  };
  likes: number;
}

const App: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [modalImage, setModalImage] = useState<ImageData | null>(null);

  const fetchImages = async (searchQuery: string, currentPage: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos`,
        {
          params: {
            query: searchQuery,
            page: currentPage,
            orientation: 'landscape',
            client_id: 'IAPoAm_WfHwWd5X8jSOR1FO58wf7-po55kp2wVTHggQ',
          },
        }
      );
      setImages((prevImages) => [...prevImages, ...response.data.results]);
    } catch (err: any) {
      setError(err.message);
      toast.error("Failed to load images.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
    fetchImages(newQuery, 1);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchImages(query, nextPage);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={setModalImage} />
      {loading && <LoadingSpinner />}
      {images.length > 0 && !loading && <LoadMoreBtn onClick={handleLoadMore} />}
      {modalImage && (
        <ImageModal
          isOpen={!!modalImage}
          onRequestClose={() => setModalImage(null)}
          image={modalImage}
        />
      )}
      <Toaster />
    </div>
  );
};

export default App;
