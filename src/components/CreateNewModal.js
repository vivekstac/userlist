import React, { useState } from "react";

const userArray = [
    { key: "firstName", type: "text", label: "First Name", placeHolder: "Enter First Name" },
    { key: "lastName", type: "text", label: "Last Name", placeHolder: "Enter Last Name" },
    { key: "email", type: "email", label: "Email", placeHolder: "Enter Email" },
    { key: "avatar", type: "text", label: "Avatar", placeHolder: "Enter Avatar" },
]

const CreateModal = ({ show, onClose, onUpdated, errors, setErrors }) => {
    const [formData, setFormData] = useState({
        email: "",
        avatar: "",
        firstName: "",
        lastName: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        onUpdated(formData);
    };

    const handleClose = () => {
        setErrors({})
        onClose()
    }

    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">

                <div className="modal-header">
                    <span>Create New User</span>
                    <button className="close-btn" onClick={handleClose}>×</button>
                </div>

                {userArray?.map((e) => {
                    return <div key={e.key} className="form-group">
                        <label><span className="req">*</span> {e.label} </label>
                        <input type={e.type} name={e.key} value={formData[e.key] || ""} onChange={handleChange} />
                        {errors[e.key] && <span className="error-text">{errors[e.key]}</span>}
                    </div>
                })}
                <div className="modal-footer">
                    <button className="cancel-btn" onClick={handleClose}>Cancel</button>
                    <button className="submit-btn" onClick={handleUpdate}>Save</button>
                </div>

            </div>
        </div>
    );
};

export default CreateModal;
