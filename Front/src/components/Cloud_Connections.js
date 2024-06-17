import React, { useState, useEffect } from 'react';
import '../index.css';

const Cloud_Connections = () => {
    const [cloudConnections, setCloudConnections] = useState([]);
    const [name, setName] = useState('');
    const [providerName, setProviderName] = useState('AWS');
    const [connectionDetails, setConnectionDetails] = useState('');

    useEffect(() => {
        loadCloudConnections();
    }, []);

    const fetchData = async (url, method = 'GET', data = null) => {
        try {
            const response = await fetch(url, {
                method,
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

    const loadCloudConnections = async () => {
        const data = await fetchData('/api/user/cloud-connections');
        if (data) {
            setCloudConnections(data);
        }
    };

    const addCloudConnection = async (event) => {
        event.preventDefault();
        const data = { name, providerName, connectionDetails };
        await fetchData('/api/user/cloud-connections', 'POST', data);
        setName('');
        setProviderName('AWS');
        setConnectionDetails('');
        loadCloudConnections();
    };

    const testCloudConnection = async (id) => {
        try {
            const response = await fetch(`/api/user/cloud-connections/test/${id}`, {
                method: 'GET',
                credentials: 'include'
            });
            const result = await response.text();
            alert(result);
        } catch (error) {
            console.error('Error testing cloud connection:', error);
        }
    };

    const deleteCloudConnection = async (id) => {
        await fetch(`/api/user/cloud-connections/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        });
        loadCloudConnections();
    };

    const updateTemplate = (e) => {
        const value = e.target.value.toLowerCase();
        let template = '';
        switch (value) {
            case 'azure':
                template = JSON.stringify({
                    clientId: "<clientId>",
                    subscriptionId: "<subscriptionId>",
                    clientSecret: "<clientSecret>",
                    tenantId: "<tenantId>"
                }, null, 2);
                break;
            case 'aws':
                template = JSON.stringify({
                    accessKey: "<accessKey>",
                    secretKey: "<secretKey>",
                    region: "<Europe/USA>"
                }, null, 2);
                break;
            default:
                template = '';
                break;
        }
        setConnectionDetails(template);
    };

    return (
        <div>

            <div className="container">
                <form id="cloud-connection-form" onSubmit={addCloudConnection}>
                    <div className="form-group">
                        <label htmlFor="name">Connection Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="providerName">Provider Name</label>
                        <select
                            id="providerName"
                            value={providerName}
                            onChange={(e) => {
                                setProviderName(e.target.value);
                                updateTemplate(e);
                            }}
                            required
                        >
                            <option value="AWS">AWS</option>
                            <option value="Azure">Azure</option>
                            <option value="GCP">GCP</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="connectionDetails">Connection Details (JSON format)</label>
                        <textarea
                            id="connectionDetails"
                            value={connectionDetails}
                            onChange={(e) => setConnectionDetails(e.target.value)}
                            rows="3"
                            required
                        ></textarea>
                    </div>
                    <button type="submit">Add Cloud Connection</button>
                </form>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Provider Name</th>
                            <th>Connection Details</th>
                            <th>Test</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cloudConnections.map(conn => (
                            <tr key={conn.id}>
                                <td>{conn.name}</td>
                                <td>{conn.providerName}</td>
                                <td>{conn.connectionDetails}</td>
                                <td>
                                    <button
                                        className="btn-info"
                                        onClick={() => testCloudConnection(conn.id)}
                                    >
                                        Test Connection
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="btn-danger"
                                        onClick={() => deleteCloudConnection(conn.id)}
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

export default Cloud_Connections;
