import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>React - Properties APP with React Hook Form</h1>
            <p>An Real Estate company API to manage properties in the United States with React.</p>
            <p><Link to="properties">&gt;&gt; Manage Properties</Link></p>
        </div>
    );
}

export { Home };