import React,{useState, useEffect} from 'react';
import "../styles/modal.css";
import Modal from 'react-modal';

export default function AlertModal(props) {
    const {isOpen, cancelModal, title} = props;

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={cancelModal}
            className="Modal"
            overlayClassName="modal_overlay"
            closeTimeoutMS={500}
        >
            <div id="levana_modal">
                <div className='font-default alert_modal'>
                    <p className="modal_title">
                        {title}
                    </p>
                </div>
            </div>
        </Modal>
    );
}