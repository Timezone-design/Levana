import React,{useState, useEffect} from 'react';
import "../styles/modal.css";
import Modal from 'react-modal';

export default function Confirm(props) {
    const {isOpen, cancelModal, title, confirm} = props;
    useEffect(() => {
        Modal.setAppElement('#App');
    })
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={cancelModal}
            className="Modal"
            overlayClassName="modal_overlay"
            closeTimeoutMS={500}
        >
            <div id="levana_modal">
                <div className='font-default confirm_modal'>
                    <p className="modal_title">
                        {title}
                    </p>
                    <div className="p-2 text-center bg-yellow-500 text-white my-2 w-9/12" onClick={(e) => confirm()}>
                        Confirm
                    </div>
                    <p className="px-4 w-9/12 text-center" onClick={(e) => cancelModal()}>
                        Cancel
                    </p>
                </div>
            </div>
        </Modal>
    );
}