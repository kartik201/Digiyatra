import React from 'react';
import './welcome.css';

const WelcomeModal = ({ onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Welcome to Digi Yatra!</h2>
                <p>
                    Get ready to embark on a virtual flight journey, experiencing seamless travel and witnessing the power of AI-driven face detection.
                </p>
                <button className="modal-button" onClick={onClose}>
                    OK
                </button>
            </div>
        </div>
    );
};

export default WelcomeModal;
