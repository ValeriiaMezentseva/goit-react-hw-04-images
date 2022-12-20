import { useEffect} from "react";
import { createPortal } from "react-dom";
import { Backdrop, ModalContent, Image } from "./Modal.styled";
import PropTypes from 'prop-types';


const modalRoot = document.querySelector('#modal-root');

const Modal = ({image, tags, toggle}) => {
    

    useEffect(() => {
        const onKeyDown = e => {
            if (e.code === 'Escape') {
                toggle();
            };
        };
        window.addEventListener('keydown', onKeyDown);
        
        return () => {
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [toggle]);
    
    const clickOnBackdrop = e => {
        if (e.target === e.currentTarget) {
            toggle();
            };
        };

            return createPortal(
                <Backdrop onClick={clickOnBackdrop}>
                    <ModalContent>
                        <Image src={image} alt={tags} />
                    </ModalContent>
                </Backdrop>,
                modalRoot
            );
};

export default Modal; 

Modal.propTypes = {
    image: PropTypes.string.isRequired, 
    tags: PropTypes.string.isRequired, 
    toggle: PropTypes.func.isRequired,
}