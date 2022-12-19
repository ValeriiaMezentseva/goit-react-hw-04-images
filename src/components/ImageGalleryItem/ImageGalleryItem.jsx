import { Item, Image } from "./ImageGalleryItem.styled";
import PropTypes from 'prop-types';
import { useState, memo } from "react";
import Modal from "components/Modal";


const ImageGalleryItem = ({largeImageURL, webformatURL, tags}) => {
    const [showModal, setShowModal] = useState(false);
  
    const toggleModal = () => {
      setShowModal(showModal => !showModal)
    }; 

    return (
      <>
        <Item onClick={toggleModal}>
          <Image src={webformatURL} alt={tags} />
        </Item>
        {showModal && (
          <Modal toggle={toggleModal} image={largeImageURL} tags={tags} />
        )}
      </>
    );
};

export default memo(ImageGalleryItem); 

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired, 
  };