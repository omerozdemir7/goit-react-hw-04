import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import Modal from "react-modal";

import { fetchImages } from "./unsplash-api";

import SearchBar from "./components/SearchBar/SearchBar";
import FilterBar from "./components/FilterBar/FilterBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";

import "./App.css";

Modal.setAppElement("#root");

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filter, setFilter] = useState("all");

  const fetchData = async (searchQuery, pageNum, activeFilter) => {
    try {
        setLoading(true);
        setError(false);
        
        // Filtreye göre query'yi modifiye edebiliriz (opsiyonel)
        let effectiveQuery = searchQuery;
        if (activeFilter === 'svgs') effectiveQuery += ' svg';
        if (activeFilter === 'patterns') effectiveQuery += ' pattern';

        const data = await fetchImages(effectiveQuery, pageNum);

        if (pageNum === 1) {
             setImages(data.results);
        } else {
             setImages((prev) => [...prev, ...data.results]);
        }
        
        setTotalPages(data.total_pages);
    } catch (err) {
        setError(true);
        toast.error("Görseller yüklenirken bir hata oluştu.");
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(query, page, filter);
  }, [query, page, filter]);


  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
  };

  const handleFilterChange = (newFilter) => {
    if (newFilter === filter && page === 1) return;

    setFilter(newFilter);
    setPage(1);
    setImages([]); 
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const openModal = (image, index) => {
    setSelectedImageIndex(index);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImageIndex(null);
  };

  const showNext = (e) => {
    if (e) e.stopPropagation();
    if (selectedImageIndex !== null && selectedImageIndex < images.length - 1) {
        setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const showPrev = (e) => {
    if (e) e.stopPropagation();
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
        setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const selectedImage = selectedImageIndex !== null ? images[selectedImageIndex] : null;

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <FilterBar activeFilter={filter} onSelectFilter={handleFilterChange} />
      
      {error && (
        <ErrorMessage message="Görseller yüklenirken bir sorun oluştu." />
      )}

      {images.length > 0 ? (
        <ImageGallery images={images} onImageClick={openModal} />
      ) : (
        !loading && <div style={{textAlign: 'center', marginTop: '40px', color: '#888'}}>
            Sonuç bulunamadı.
        </div>
      )}

      {loading && <Loader />}

      {images.length > 0 && !loading && page < totalPages && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}

      <ImageModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        image={selectedImage}
        onNext={showNext}
        onPrev={showPrev}
        hasNext={selectedImageIndex !== null && selectedImageIndex < images.length - 1}
        hasPrev={selectedImageIndex !== null && selectedImageIndex > 0}
      />
      
      <Toaster position="top-right" />
    </>
  );
}

export default App;
