import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formDetails } from '../../service/formService';
import './viewForm.css'
import { saveResponse } from '../../service/responseService';

function ViewForm() {
    const params = useParams();
    const { id } = params ?? {};

    const [formData, setFormData] = useState()

    const fetchFormDetails = useCallback(() => {
        if (id)
            formDetails(id, (response) => {
                const { status, statusText, data } = response ?? {};
                if (status === 200) {
                    setFormData(data);
                } else {
                    alert(statusText);
                }
            })
    }, [id])

    useEffect(() => {
        fetchFormDetails();
    }, [id])

    const handleSubmit = (event) => {
        event.preventDefault();
        saveResponse(formData, (response) => {
            const { status, statusText, message } = response ?? {};
            if (status === 200) {
                setFormData(null);
                fetchFormDetails();
                alert('form submitted successfully')
            } else {
                alert(message || statusText);
            }
        })
    }

    const handleValueChange = (e) => {
        const { name, value } = e.target;
        const fields = formData.fields;
        const newfields = fields.map(field => (field.fieldName === name ? { ...field, fieldValue: value } : field));

        setFormData({ ...formData, fields: newfields });
    };

    return (
        <div className="view-form-container">
            <h2>{formData?.formTitle}</h2>
            <form onSubmit={handleSubmit}>
                <div className="view-form-fields">
                    {formData?.fields.map((field, index) => field.fieldName.startsWith('input') ?
                        (
                            <div key={index} className="view-form-field-input">
                                <label>{field.fieldLabel}</label>
                                <input
                                    onChange={handleValueChange}
                                    type={field.fieldType}
                                    placeholder={field.fieldPlaceholder}
                                    name={field.fieldName}
                                />
                            </div>
                        ) : (
                            <div className="view-form-field-section"><h4>{field.fieldLabel}</h4></div>
                        ))}
                </div>
                <button type="submit" className='btn btn-success' style={{marginTop:20}} >Submit</button>
            </form>
        </div>
    );
}

export default ViewForm;
