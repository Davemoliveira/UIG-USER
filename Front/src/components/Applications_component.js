// src/ManageApplications.js
import React, { useState, useEffect } from 'react';
import '../index.css';

const Applications_component = () => {
    const [applications, setApplications] = useState([]);
    const [name, setName] = useState('');
    const [uri, setUri] = useState('');

    useEffect(() => {
        loadApplications();
    }, []);

    const fetchData = async (url, method = 'GET', data = null) => {
        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: data ? JSON.stringify(data) : null
            });
            return await response.json();
        } catch (error) {
            console.error(`Error fetching data from ${url}:`, error);
            return null;
        }
    };

    const loadApplications = async () => {
        const data = await fetchData('/api/user/applications');
        if (data) {
            setApplications(data);
        }
    };

    const addApplication = async (event) => {
        event.preventDefault();
        const data = { name, uri };
        await fetchData('/api/user/applications', 'POST', data);
        setName('');
        setUri('');
        loadApplications();
    };

    const deleteApplication = async (id) => {
        await fetch(`/api/user/applications/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        });
        loadApplications();
    };

    return (
        <div>
            <div className="container">
                <form id="application-form" onSubmit={addApplication}>
                    <div className="form-group">
                        <label htmlFor="name" className="font-semibold">Application Name</label>
                        <input className=""
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="uri" className="font-semibold">Application URL</label>
                        <input
                            type="text"
                            id="uri"
                            value={uri}
                            onChange={(e) => setUri(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="text-white">Add Application</button>
                </form>
                <table>
                    <thead>
                        <tr>
                            <th className="font-semibold">Name</th>
                            <th className="font-semibold">URL</th>
                            <th className="font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map(app => (
                            <tr key={app.id}>
                                <td>{app.name}</td>
                                <td>{app.uri}</td>
                                <td>
                                    <button
                                        className="btn-danger"
                                        onClick={() => deleteApplication(app.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Applications_component;