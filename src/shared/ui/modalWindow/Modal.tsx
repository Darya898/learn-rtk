import React, {useRef} from 'react';
import styles from './modal.module.css';
interface ModalProps{
    children:React.ReactElement;
}
const Modal:React.FC<ModalProps> = ({children}) => {
    const modalRef=useRef(null);

    return (
        <div className={styles.modal}
             ref={modalRef}>
            <div className={styles['modal-content']}>
                {children}
            </div>
        </div>
    );
};

export default Modal;