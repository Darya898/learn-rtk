import {useRef} from 'react';
import styles from './modal.module.css';

const Modal = ({children}) => {
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