import React, { useCallback, useEffect, useState } from 'react';
import './newForm.css'
import { createForm, formDetails, updateForm } from '../../service/formService';
import { useNavigate, useParams } from 'react-router-dom';
import FormContainer from './components/FormContainer';
import FormEditor from './components/FormEditor';


const SimpleFormEditor = () => {

    const params = useParams();
    const { id } = params ?? {};

    const navigate = useNavigate();

    const [fields, setFields] = useState([]);
    const [editingField, setEditingField] = useState(null);
    const [fieldIdCounter, setFieldIdCounter] = useState(1);
    const [formTitle, setFormTitle] = useState('Untitled Form');
    const [isFormTitleEdit, setFormTitleEdit] = useState(false);
    const [totalFields, setTotalFields] = useState(0);

    const fetchFormDetails = useCallback(() => {
        if (id)
            formDetails(id, (response) => {
                const { status, statusText, data } = response ?? {};
                if (status === 200) {
                    setFormTitle(data?.formTitle);
                    setFields(data?.fields)
                    const maxFieldId = data.fields.length > 0 ? Math.max(...data.fields.map(field => field.fieldId)) : 0;
                    setFieldIdCounter(maxFieldId + 1);
                    const inputFieldCount = fields.filter(field => field.fieldName.startsWith('input')).length;
                    setTotalFields(inputFieldCount);
                } else {
                    alert(statusText);
                }
            })
    }, [id])

    useEffect(() => {
        fetchFormDetails();
    }, [id])

    const addField = (type) => {
        const isSection = type === 'section';
        const id = fieldIdCounter;
        const label = `Label`;
        const fieldName = isSection ? `section_${id}` : `input_${id}`;
        const placeholder = `Placeholder`;
        const position = fieldIdCounter;
        setFields([...fields, { fieldId: id, fieldType: type, fieldName: fieldName, fieldLabel: label, fieldPlaceholder: placeholder, fieldPosition: position }]);
        if (!isSection) setTotalFields(totalFields + 1);
        setFieldIdCounter(fieldIdCounter + 1);
    };

    const deleteField = (deleteField) => {
        setFields(fields.filter(field => field.fieldId !== deleteField.fieldId));
        setFieldIdCounter(fieldIdCounter - 1);
        if (deleteField.fieldName.startsWith('input')) setTotalFields(totalFields - 1);
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
        const resetFields = fields.map((field, index) => ({
            ...field,
            fieldId: index + 1
        }));
        const data = { formTitle: formTitle, fields: resetFields };
        if (id) {
            updateForm(id, data, updateCallBack);
        } else {
            createForm(data, (response) => {
                const { status, statusText } = response ?? {};
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
            alert('Form saved successfully');
        } else {
            alert(message || statusText)
        }
    }

    const handleOnDragEnd = (result) => {

        if (!result.destination) return;

        const items = Array.from(fields);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setFields(items);
    }


    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h1 style={{ textAlign: 'center' }} >Create New Form</h1>
                <div className="flex-container">
                    <FormContainer formTitle={formTitle} fields={fields} handleEdit={handleEdit} deleteField={deleteField} addField={addField} totalFields={totalFields} handleOnDragEnd={handleOnDragEnd} />
                    <FormEditor editingField={editingField} isFormTitleEdit={isFormTitleEdit} handleFormTitleChange={handleFormTitleChange} handleFieldChange={handleFieldChange} />
                </div >
                <div className="form-action">   <button className="btn btn-success">Create Form</button></div>
            </form>
        </div >
    );
};

export default SimpleFormEditor;
