// src/JavaVersionFetcher.js
import React, { useEffect, useState } from 'react';

const JavaVersionFetcher = () => {
    const [javaVersion, setJavaVersion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJavaVersion = async () => {
            try {
                const response = await fetch('http://localhost:3001/java-version');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setJavaVersion(data.javaVersion);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchJavaVersion();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h1>Java Version</h1>
            <p>The Java version specified in pom.xml is: {javaVersion}</p>
        </div>
    );
};

export default JavaVersionFetcher;