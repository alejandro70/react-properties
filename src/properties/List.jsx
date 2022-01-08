import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { propertyService } from '@/_services';

function List({ match }) {
    const { path } = match;
    const [properties, setProperties] = useState(null);

    useEffect(() => {
        propertyService.getAll().then(x => setProperties(x.items));
    }, []);

    function deleteProperty(propertyId) {
        if (!prompt("Are you sure to remove this property?", "OK DELETE"))
            return;

        setProperties(properties.map(x => {
            if (x.propertyId === propertyId) { x.isDeleting = true; }
            return x;
        }));
        propertyService.delete(propertyId).then(() => {
            setProperties(properties => properties.filter(x => x.propertyId !== propertyId));
        });
    }

    const dollars = (num) => new Intl.NumberFormat(`en-US`, { currency: `USD`, style: 'currency', }).format(num);

    return (
        <div>
            <h1>Properties</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Property</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '20%' }}>Image</th>
                        <th style={{ width: '20%' }}>Name</th>
                        <th style={{ width: '25%' }}>Address</th>
                        <th style={{ width: '15%' }}>Price</th>
                        <th style={{ width: '15%' }}>Owner</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {properties && properties.map(property =>
                        <tr key={property.propertyId}>
                            <td><img src={property.image} alt={property.name} width="150" /> </td>
                            <td>{property.name}</td>
                            <td>{property.address}</td>
                            <td>{dollars(property.price)}</td>
                            <td>{property.ownerName}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${property.propertyId}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteProperty(property.propertyId)} className="btn btn-sm btn-danger btn-delete-property" disabled={property.isDeleting}>
                                    {property.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!properties &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {properties && !properties.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Properties To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { List };