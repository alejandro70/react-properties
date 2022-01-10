import React, { useState } from 'react';
import PropTypes from 'prop-types';
import 'regenerator-runtime/runtime'
import { loginService, alertService } from '@/_services';

function Login({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        //const response = await loginUser({ username, password });
        const response = await loginUser({ username: 'admin', password: 'pwd' });
        localStorage.setItem("token", response.token);
        setToken(response.token);
    }

    function loginUser(credentials) {
        return fetch('https://localhost:44398/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
            .then(data => data.json())
    }

    return (
        <div className="login-wrapper">
            <h1>Please Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={e => setUserName(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}

export { Login };