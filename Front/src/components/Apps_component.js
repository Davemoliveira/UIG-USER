import React, { useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

const ManageApplications = () => {
  const [applications, setApplications] = useState([]);
  const [name, setName] = useState('');
  const [uri, setUri] = useState('');

  useEffect(() => {
    loadApplications();
  }, []);

  const fetchData = (url, method = 'GET', data = null) => {
    return fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: data ? JSON.stringify(data) : null
    })
    .then(response => response.json())
    .catch(error => console.error(`Error fetching data from ${url}:`, error));
  };

  const loadApplications = () => {
    fetchData('/api/user/applications')
      .then(data => setApplications(data))
      .catch(error => console.error('Error loading applications:', error));
  };

  const addApplication = (event) => {
    event.preventDefault();
    const data = { name, uri };

    fetchData('/api/user/applications', 'POST', data)
      .then(() => {
        loadApplications();
        setName('');
        setUri('');
      })
      .catch(error => console.error('Error adding application:', error));
  };

  const deleteApplication = (id) => {
    fetch(`/api/user/applications/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    })
    .then(() => loadApplications())
    .catch(error => console.error('Error deleting application:', error));
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Dashboard</a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="/dashboard">Dashboard</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/deployments">Manage Deployments</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/cloud-connections">Manage Cloud Connections</a>
            </li>
          </ul>
        </div>
        <a className="btn btn-outline-danger" href="/logout">Logout</a>
      </nav>
      <div className="container mt-4">
        <h1>Manage Applications</h1>
        <form id="application-form" className="mb-4" onSubmit={addApplication}>
          <div className="form-group">
            <label htmlFor="name">Application Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="uri">Application URI</label>
            <input
              type="text"
              className="form-control"
              id="uri"
              value={uri}
              onChange={(e) => setUri(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Add Application</button>
        </form>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>URI</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="applications-table-body">
            {applications.map(app => (
              <tr key={app.id}>
                <td>{app.name}</td>
                <td>{app.uri}</td>
                <td>
                  <button
                    className="btn btn-danger"
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
    </>
  );
};

export default ManageApplications;
