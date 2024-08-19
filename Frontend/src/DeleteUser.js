import React, { useState } from 'react';
import axios from 'axios';
import './DeleteUser.css';

const DeleteUser = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.delete('http://localhost:8080/api/users/delete', {
                params: {
                    username,
                    password
                }
            });
            setResponseMessage(response.data);
        } catch (error) {
            if (error.response) {
                setResponseMessage(error.response.data);
            } else {
                setResponseMessage('An error occurred.');
            }
        }
    };

    return (
        <div className="delete-user-container">
         <div className="del">
           <dotlottie-player src="https://lottie.host/a9203e0b-dd4d-4f50-ae65-72666971a60f/IuoYX9Txra.json" background="transparent" speed="1" loop autoplay></dotlottie-player>
         </div>
            <form onSubmit={handleDelete} className="delete-user-form">
                <h2 className="delete-title">Delete Account</h2>
                <input 
                    type="text" 
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input 
                    type="password" 
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="delete-user-btn">Delete User</button>
            </form>
            {responseMessage && <p className="response-message">{responseMessage}</p>}
        </div>
    );
};

export default DeleteUser;
