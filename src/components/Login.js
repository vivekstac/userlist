import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userName: "",
        password: "",
    });
    const [error, setError] = useState({
        userName: "",
        password: "",
        rememberMe: false,
    });
    // const [showPw, setShowPwd] = useState(false)
    // const [isNewUser, setIsNewUser] = useState(false);

    // const validatePassword = (pwd) => {
    //     const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    //     return regex.test(pwd);
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        let newError = { userName: "", password: "" };

        if (!formData.userName) {
            newError.userName = "Username is required";
        }

        // if (!validatePassword(formData.password)) {
        //     newError.password = "Must be 8+ chars, 1 Cap, 1 Num, & 1 Symbol";
        // }

        setError(newError);

        if (!newError.userName && !newError.password) {
            navigate("/home");
            if (formData.rememberMe) {
                localStorage.setItem("user", formData.userName);
            } else {
                sessionStorage.setItem("user", formData.userName);
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="form-login-container">
            <div className="form-container">
                <div className="input-container">
                    <span className="icons">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </span>
                    <input
                        type="text"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                    />
                    {error.userName && <p>{error.userName}</p>}
                </div>
                <div className="input-container">
                    <span className="icons">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                    </span>
                    <input
                        type={"password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {/* {error.password && <p className="">{error.password}</p>} */}
                </div>
                <div className="checkbox-container b-none">
                    <input type="checkbox" id="myCheckbox" name="option1" value="yes" />
                    <label htmlFor="myCheckbox">Remember Me</label>
                    {error.password && <p>{error.password}</p>}
                </div>
                <button className={"btn"} onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}

export default Login;
