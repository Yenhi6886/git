// src/pages/AuthPage.jsx

import React, { useState } from 'react';
import '../styles/AuthPage.css'; // Import file CSS cho trang này

function AuthPage() {
    // State để quản lý việc hiển thị form Đăng ký (true) hay Đăng nhập (false)
    const [isRegisterActive, setIsRegisterActive] = useState(false);

    const handleRegisterClick = () => {
        setIsRegisterActive(true);
    };

    const handleLoginClick = () => {
        setIsRegisterActive(false);
    };

    // Hàm này để ngăn form submit và tải lại trang
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isRegisterActive) {
            console.log('Submitting Register Form...');
            // Xử lý logic đăng ký ở đây
        } else {
            console.log('Submitting Login Form...');
            // Xử lý logic đăng nhập ở đây
        }
    };

    return (
        // Sử dụng state `isRegisterActive` để tự động thêm/xóa class 'active'
        <div className={`container ${isRegisterActive ? 'active' : ''}`}>

            {/* === FORM ĐĂNG NHẬP === */}
            <div className="form-box login">
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type="text" placeholder="Username" required />
                        <i className='bx bxs-user'></i>
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Password" required />
                        <i className='bx bxs-lock-alt'></i>
                    </div>
                    <div className="forgot-link">
                        <a href="#">Forgot Password?</a>
                    </div>
                    <button type="submit" className="btn">Login</button>
                    <p>or login with social platforms</p>
                    <div className="social-icons">
                        <a href="#"><i className='bx bxl-google'></i></a>
                        <a href="#"><i className='bx bxl-facebook'></i></a>
                        <a href="#"><i className='bx bxl-github'></i></a>
                        <a href="#"><i className='bx bxl-linkedin'></i></a>
                    </div>
                </form>
            </div>

            {/* === FORM ĐĂNG KÝ === */}
            <div className="form-box register">
                <form onSubmit={handleSubmit}>
                    <h1>Registration</h1>
                    <div className="input-box">
                        <input type="text" placeholder="Username" required />
                        <i className='bx bxs-user'></i>
                    </div>
                    <div className="input-box">
                        <input type="email" placeholder="Email" required />
                        <i className='bx bxs-envelope'></i>
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Password" required />
                        <i className='bx bxs-lock-alt'></i>
                    </div>
                    <button type="submit" className="btn">Register</button>
                    <p>or register with social platforms</p>
                    <div className="social-icons">
                        <a href="#"><i className='bx bxl-google'></i></a>
                        <a href="#"><i className='bx bxl-facebook'></i></a>
                        <a href="#"><i className='bx bxl-github'></i></a>
                        <a href="#"><i className='bx bxl-linkedin'></i></a>
                    </div>
                </form>
            </div>

            {/* === CÁC PANEL CHUYỂN ĐỔI === */}
            <div className="toggle-box">
                <div className="toggle-panel toggle-left">
                    <h1>Hello, Welcome!</h1>
                    <p>Don't have an account?</p>
                    {/* Gắn sự kiện onClick vào button Register */}
                    <button type="button" className="btn register-btn" onClick={handleRegisterClick}>Register</button>
                </div>
                <div className="toggle-panel toggle-right">
                    <h1>Welcome Back!</h1>
                    <p>Already have an account?</p>
                    <button type="button" className="btn login-btn" onClick={handleLoginClick}>Login</button>
                </div>
            </div>
        </div>
    );
}

export default AuthPage;