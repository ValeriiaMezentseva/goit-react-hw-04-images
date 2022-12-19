import ImageGallery from "components/ImageGallery";
import SearchBar from "components/SearchBar";
import Loader from "components/Loader";
import Button from "components/Button";
import { useState, useEffect } from "react";
import fetchImages from "services/api";
import toast, { Toaster } from 'react-hot-toast';




export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);



  useEffect(() => {
    const fetchData = async () => {
      const { hits: images } = await fetchImages(query, page);
      setImages(prevImages => [...prevImages, ...images]);
      setIsLoading(false);

      if (images.length === 0) {
        toast.error("Sorry, we couldn't find anything on your request")
        return; 
      }
    };

     if (query) {
        fetchData(); 
    };
  }, [page, query]);

  const handleSubmit = async e => {
    e.preventDefault();
    const input = e.target.elements.search.value.trim();

      if (input === '') {
      toast.error("You didn't enter anything, try again!");
      return;
      }
    
    if (input !== query) {
      setQuery(input); 
      setImages([]);
      setPage(1);
      setIsLoading(true);
    };
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
    setIsLoading(true);
  };

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      {images.length !== 0 && (
        <ImageGallery images={images} />
      )}
      {images.length > 0 && !isLoading && (
        <Button onClick={onLoadMore} />
      )}
      {isLoading && <Loader />}
      <Toaster />
    </>
  );
};
