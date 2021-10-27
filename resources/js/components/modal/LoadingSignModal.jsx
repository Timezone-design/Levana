import React,{useState, useEffect} from 'react';
import "../styles/modal.css";
import Modal from 'react-modal';

export default function Confirm(props) {
    const {isOpen} = props;
    useEffect(() => {
        Modal.setAppElement('#App');
    })
    return (
        <Modal
            isOpen={isOpen}
            className="Modal"            
            overlayClassName="modal_overlay"
            closeTimeoutMS={500}
        >
            <div id='levana_modal'>
                <div className="loading_sign"></div>
            </div>
        </Modal>
    );
}      