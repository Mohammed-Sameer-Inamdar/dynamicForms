import React, { useCallback, useEffect, useState } from 'react';
import './newForm.css'
import { createForm, formDetails, updateForm } from '../../service/formService';
import { useNavigate, useParams } from 'react-router-dom';
import FormContainer from './components/FormContainer';
import FormEditor from './components/FormEditor';


const DynamicForm = () => {

    const params = useParams();
    const { id } = params ?? {};

    const navigate = useNavigate();

    const [fields, setFields] = useState([]);
    const [editingField, setEditingField] = useState(null);
    const [fieldIdCounter, setFieldIdCounter] = useState(1);
    const [formTitle, setFormTitle] = useState('Untitled Form');
    const [isFormTitleEdit, setFormTitleEdit] = useState(false);

    const fetchFormDetails = useCallback(() => {
        if (id)
            formDetails(id, (response) => {
                const { status, statusText, data } = response ?? {};
                if (status === 200) {
                    setFormTitle(data?.formTitle);
                    setFields(data?.fields)
                    setFieldIdCounter(data?.fields?.length + 1)
                } else {
                    alert(statusText);
                }
            })
    }, [id])

    useEffect(() => {
        fetchFormDetails();
    }, [id])

    const addField = (type) => {
        const id = fieldIdCounter;
        const label = `Label`;
        const placeholder = `Place holder`;
        const position = fieldIdCounter;
        setFields([...fields, { fieldId: id, fieldType: type, fieldName: `input_${id}`, fieldLabel: label, fieldPlaceholder: placeholder, fieldPosition: position }]);
        setFieldIdCounter(fieldIdCounter + 1);
    };

    const deleteField = (id) => {
        setFields(fields.filter(field => field.fieldId !== id));
        setFieldIdCounter(fieldIdCounter - 1)
    };

    const handleEdit = (field, isFormEdit = false) => {
        setFormTitleEdit(isFormEdit);
        setEditingField(field);
    };

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setEditingField({ ...editingField, [name]: value });
        setFields(fields.map(field => (field.fieldId === editingField.fieldId ? { ...field, [name]: value } : field)));
    };

    const handleFormTitleChange = (e) => {
        setEditingField(e.target.value)
        setFormTitle(e.target.value)
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = { formTitle: formTitle, fields: fields };

        if (id) {
            updateForm(id, data, updateCallBack);
        } else {
            createForm(data, (response) => {
                const { status, statusText, data } = response ?? {};
                if (status === 200) {
                    navigate('/');
                } else {
                    alert(statusText);
                }
            })
        }

    }

    const updateCallBack = (response) => {
        const { status, message, statusText } = response ?? {};
        if (status === 200) {
            setFormTitle('Untitled Form');
            setFields([])
            fetchFormDetails();
        } else {
            alert(message || statusText)
        }
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>

                <h1 className="heading">Create New Form</h1>
                <div className="flex-container">
                    <FormContainer formTitle={formTitle} fields={fields} handleEdit={handleEdit} deleteField={deleteField} addField={addField} fieldIdCounter={fieldIdCounter} />
                    <FormEditor editingField={editingField} isFormTitleEdit={isFormTitleEdit} handleFormTitleChange={handleFormTitleChange} handleFieldChange={handleFieldChange} />
                </div >
                <div className="form-action">   <button className="btn btn-success">Create Form</button></div>
            </form>
        </div >
    );
};

export default DynamicForm;
