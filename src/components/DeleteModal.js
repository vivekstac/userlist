import React from "react";

const DeleteModal = ({ show, onClose, user, onDeleted }) => {
    console.log(user)
    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">

                <div className="modal-header">
                    <span>Delete User</span>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>

                <p>Are you sure you want to delete <b>{user?.email}</b>?</p>

                <div className="modal-footer">
                    <button className="cancel-btn" onClick={onClose}>Cancel</button>
                    <button className="submit-btn" onClick={() => onDeleted(user.id)}>Yes, Delete</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
