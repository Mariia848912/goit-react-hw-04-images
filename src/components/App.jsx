import { useEffect, useState } from 'react';
import { Container } from './Container/Container';
import { Searchbar } from './Searchbar/Searchbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getPictures } from '../services/pixabay-api';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { ErrorText } from './ErrorText/ErrorText';
import { NOTIFICATION } from '../constants/notification';

export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [pictures, setPictures] = useState([]);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(null);
  const [isloading, setLoading] = useState(false);
  const [showModal, setshowModal] = useState(false);
  const [selectedPicture, setSelectedPicture] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    setLoading(true);
    fetchPictures(searchQuery, page);
  }, [searchQuery, page]);

  const fetchPictures = async (searchQuery, page) => {
    try {
      setLoading(true);
      const info = await getPictures(searchQuery, page);

      if (info.hits.length === 0) {
        return toast.error(NOTIFICATION.noInfoInTheGallery);
      }
      setTotalHits(info.totalHits);
      setPictures(prevContacts => [...prevContacts, ...info.hits]);
    } catch (error) {
      setError({ error });
    } finally {
      setLoading(false);
    }
  };
  const handleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setPage(1);
    setPictures([]);
  };

  const onLoadMore = () => {
    setPage(page + 1);
  };

  const onShowModal = (largeImageURL, tags) => {
    setshowModal(true);
    setSelectedPicture({ largeImageURL, tags });
  };

  const onCloseModal = () => {
    setshowModal(false);
    setSelectedPicture(null);
  };

  const checkEndList = totalHits / pictures.length;
  return (
    <Container>
      <Searchbar onSubmit={handleFormSubmit} />

      {pictures.length > 0 && (
        <ImageGallery pictures={pictures} onShowModal={onShowModal} />
      )}
      {pictures.length > 0 && !isloading && checkEndList > 1 && (
        <Button onClick={onLoadMore} />
      )}
      {isloading && <Loader />}
      {showModal && (
        <Modal
          largeImageURL={selectedPicture.largeImageURL}
          alt={selectedPicture.tags}
          onClose={onCloseModal}
        />
      )}
      {error && <ErrorText />}
      <ToastContainer autoClose={3000} />
    </Container>
  );
}

