import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { propertyService, alertService } from '@/_services';

function AddEdit({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;

    // form validation rules 
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required'),
        address: Yup.string()
            .required('Address is required'),
        price: Yup.number()
            .required('Price is required'),
        codeInternal: Yup.string()
            .required('Code is required'),
        year: Yup.number()
            .required('Year is required'),
        ownerId: Yup.number(),
        ownerName: Yup.string()
            .required('Owner Name is required'),
        ownerAddress: Yup.string()
            .required('Owner Address is required'),
        image: Yup.string()
            .required('Image URL is required'),
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, errors, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });

    function onSubmit(data) {
        return isAddMode
            ? createProperty(data)
            : updateProperty(id, data);
    }

    function createProperty(data) {
        return propertyService.create(data)
            .then(() => {
                alertService.success('Property added', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(err => alertService.error(err));
    }

    function updateProperty(id, data) {
        return propertyService.update(id, data)
            .then(() => {
                alertService.success('Property updated', { keepAfterRouteChange: true });
                history.push('..');
            })
            .catch(alertService.error);
    }

    useEffect(() => {
        if (!isAddMode) {
            // get property and set form fields
            propertyService.getById(id).then(property => {
                const fields = [
                    'name',
                    'address',
                    'price',
                    'codeInternal',
                    'year',
                    'ownerId',
                    'ownerName',
                    'ownerAddress',
                    'image'];
                fields.forEach(field => setValue(field, property[field]));
            });
        }
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Add Property' : 'Edit Property'}</h1>
            <div className="form-row">
                <div className="form-group col-5">
                    <label>Name</label>
                    <input name="name" type="text" ref={register} className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.name?.message}</div>
                </div>
                <div className="form-group col-7">
                    <label>Address</label>
                    <input name="address" type="text" ref={register} className={`form-control ${errors.address ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.address?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-4">
                    <label>Code</label>
                    <input name="codeInternal" type="text" ref={register} className={`form-control ${errors.codeInternal ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.codeInternal?.message}</div>
                </div>
                <div className="form-group col-4">
                    <label>Price</label>
                    <input name="price" type="text" ref={register} className={`form-control ${errors.price ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.price?.message}</div>
                </div>
                <div className="form-group col-4">
                    <label>Year</label>
                    <input name="year" type="text" ref={register} className={`form-control ${errors.year ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.year?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-5">
                    <label>Owner Name</label>
                    <input name="ownerName" type="text" ref={register} className={`form-control ${errors.ownerName ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.ownerName?.message}</div>
                </div>
                <div className="form-group col-7">
                    <label>Owner Address</label>
                    <input name="ownerAddress" type="text" ref={register} className={`form-control ${errors.ownerAddress ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.ownerAddress?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-12">
                    <label>Image URL</label>
                    <input name="image" type="text" ref={register} className={`form-control ${errors.image ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.image?.message}</div>
                </div>
            </div>
            <div className="form-group">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Save
                </button>
                <Link to={isAddMode ? '.' : '..'} className="btn btn-link">Cancel</Link>
            </div>
        </form>
    );
}

export { AddEdit };