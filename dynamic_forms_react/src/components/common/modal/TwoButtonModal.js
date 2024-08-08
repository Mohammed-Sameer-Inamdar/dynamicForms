import React from 'react';
import Modal from './index'
function TwoButtonModal({ isOpen, onClose, title, message, button1Text, button2Text, onButton1Click, onButton2Click, button1Class,button2Class }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title}>
            <div className="modal-body">
                <p>{message}</p>
            </div>
            <div className="modal-footer">
                <button onClick={onButton1Click} className={button1Class}>{button1Text}</button>
                <button onClick={onButton2Click} className={button2Class}>{button2Text}</button>
            </div>
        </Modal>
    );
}

export default TwoButtonModal;