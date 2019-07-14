import React from 'react';

function Modal(props) {
    return (
        <div className="modal">
            <h2>{props.title}</h2>
            <h4>{props.message}</h4>
            <button
                id="modalClose"
                onClick={props.title === 'Not Quite.' ?
                    () => props.closeModal(false) :
                    () => props.closeModal(true)}
            >Close
            </button>
        </div>
    )
}

export default Modal;