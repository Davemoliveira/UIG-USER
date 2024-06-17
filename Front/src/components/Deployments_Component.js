import React, { useState, useEffect } from 'react';
import '../index.css';

const Deployments_Component = () => {
    const [deployments, setDeployments] = useState([]);
    const [applications, setApplications] = useState([]);
    const [cloudConnections, setCloudConnections] = useState([]);
    const [name, setName] = useState('');
    const [applicationId, setApplicationId] = useState('');
    const [cloudConnectionId, setCloudConnectionId] = useState('');
    const [deploymentDetails, setDeploymentDetails] = useState('');

    useEffect(() => {
        loadApplicationsAndConnections();
        loadDeployments();
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

    const loadDeployments = async () => {
        const data = await fetchData('/api/user/deployments');
        if (data) {
            setDeployments(data);
        }
    };

    const loadApplicationsAndConnections = async () => {
        const applicationsData = await fetchData('/api/user/applications');
        if (applicationsData) {
            setApplications(applicationsData);
        }

        const connectionsData = await fetchData('/api/user/cloud-connections');
        if (connectionsData) {
            setCloudConnections(connectionsData);
        }
    };

    const addDeployment = async (event) => {
        event.preventDefault();
        const data = { name, applicationId, cloudConnectionId, deploymentDetails, status: 'NEW' };
        await fetchData('/api/user/deployments', 'POST', data);
        setName('');
        setApplicationId('');
        setCloudConnectionId('');
        setDeploymentDetails('');
        loadDeployments();
    };

    const deleteDeployment = async (id) => {
        await fetchData(`/api/user/deployments/${id}`, 'DELETE');
        loadDeployments();
    };

    const startDeployment = async (id) => {
        await fetchData(`/api/user/deployments/${id}/start`, 'GET');
        loadDeployments();
    };

    const stopDeployment = async (id) => {
        await fetchData(`/api/user/deployments/${id}/stop`, 'GET');
        loadDeployments();
    };

    const getConnectionInfo = async (id) => {
        const data = await fetchData(`/api/user/deployments/${id}/connection-info`);
        if (data) {
            const infoCell = document.getElementById(`info-${id}`);
            infoCell.innerHTML = `
                <p><strong>Public IP:</strong> ${data.publicIp}</p>
                <p><strong>SSH Key:</strong> <a href="/download/key?deploymentId=${id}&type=private" target="_blank">Download Private Key</a> |
                <a href="/download/key?deploymentId=${id}&type=public" target="_blank">Download Public Key</a></p>
            `;
        }
    };

    const updateTemplate = () => {
        const template = {
            "vmName": "demoVm",
            "region": "Europe",
            "vmSize": "small",
            "image": "ubuntu-18.04",
            "networkConfiguration": {
                "networkId": "network-12345",
                "subnetId": "subnet-67890",
                "securityIds": ["sec-12345", "sec-67890"]
            },
            "storageConfiguration": {
                "diskSize": "100GB",
                "diskType": "SSD"
            },
            "tags": {
                "project": "MyProject",
                "environment": "production"
            },
            "keyConfiguration": {
                "generateNewKey": true,
                "keyName": "my-key"
            },
            "environmentVariables": {
                "ENV_VAR1": "value1",
                "ENV_VAR2": "value2"
            }
        };

        setDeploymentDetails(JSON.stringify(template, null, 2));
    };

    return (
        <div>

            <div className="container">
                <form id="deployment-form" onSubmit={addDeployment}>
                    <div className="form-group">
                        <label htmlFor="name">Deployment Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="application">Application</label>
                        <select
                            id="application"
                            value={applicationId}
                            onChange={(e) => setApplicationId(e.target.value)}
                            required
                        >
                            <option value="" disabled>Select Application</option>
                            {applications.map(app => (
                                <option key={app.id} value={app.id}>
                                    {app.id} - {app.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="cloudConnection">Cloud Connection</label>
                        <select
                            id="cloudConnection"
                            value={cloudConnectionId}
                            onChange={(e) => setCloudConnectionId(e.target.value)}
                            required
                        >
                            <option value="" disabled>Select Cloud Connection</option>
                            {cloudConnections.map(conn => (
                                <option key={conn.id} value={conn.id}>
                                    {conn.id} - {conn.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="deploymentDetails">Deployment Details</label>
                        <textarea
                            id="deploymentDetails"
                            value={deploymentDetails}
                            onFocus={updateTemplate}
                            onChange={(e) => setDeploymentDetails(e.target.value)}
                            rows="3"
                            required
                        ></textarea>
                    </div>
                    <button type="submit">Add Deployment</button>
                </form>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Application</th>
                            <th>Cloud Connection</th>
                            <th>Connection Info</th>
                            <th>Actions</th>
                            <th>Start</th>
                            <th>Stop</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deployments.map(dep => (
                            <React.Fragment key={dep.id}>
                                <tr>
                                    <td>{dep.name}</td>
                                    <td>{dep.status}</td>
                                    <td>{dep.application ? dep.application.name : 'N/A'}</td>
                                    <td>{dep.cloudConnection ? dep.cloudConnection.name : 'N/A'}</td>
                                    <td>
                                        <button
                                            className="btn-info"
                                            onClick={() => getConnectionInfo(dep.id)}
                                        >
                                            Get Connection Info
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="btn-danger"
                                            onClick={() => deleteDeployment(dep.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="btn-success"
                                            onClick={() => startDeployment(dep.id)}
                                        >
                                            Start
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="btn-warning"
                                            onClick={() => stopDeployment(dep.id)}
                                        >
                                            Stop
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="8" id={`info-${dep.id}`}></td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Deployments_Component;
