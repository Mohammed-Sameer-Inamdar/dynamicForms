import React from 'react';
import './index.css'; // Import the CSS you wrote above

function Modal({ isOpen, onClose, title, children, footer }) {
    if (!isOpen) return null; // Return null if the modal is not open

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2 className="modal-title">{title}</h2>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
                <div className="modal-footer">
                    {footer}
                </div>
            </div>
        </div>
    );
}
export default Modal;