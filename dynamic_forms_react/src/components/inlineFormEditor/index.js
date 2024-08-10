import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createForm, formDetails, updateForm } from '../../service/formService';
import './editor.css'
import { CheckMarkIcon, EditIcon } from '../../utils/icons';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import FieldComponent from './components/FieldComponent';


const AddFieldButton = ({ isRender, addField, toggleDropDown, showDropdown }) => {
    if (!isRender) return null;
    return (
        <div className="add-field-container">
            <button type="button" className='btn btn-primary' onClick={() => toggleDropDown()}>Add Field</button>
            {showDropdown && <DropdownMenu onSelectFieldType={addField} />}
        </div>
    )
}

const DropdownMenu = ({ onSelectFieldType }) => {
    return (
        <div className="dropdown-menu">
            <button type='button' className='btn btn-success' onClick={() => onSelectFieldType('section')}>Section</button>
            <button type='button' className='btn btn-success' onClick={() => onSelectFieldType('text')}>Text</button>
            <button type='button' className='btn btn-success' onClick={() => onSelectFieldType('number')}>Number</button>
            <button type='button' className='btn btn-success' onClick={() => onSelectFieldType('email')}>Email</button>
            <button type='button' className='btn btn-success' onClick={() => onSelectFieldType('password')}>Password</button>
            <button type='button' className='btn btn-success' onClick={() => onSelectFieldType('date')}>Date</button>
        </div>
    );
};

const InlineFormEditor = () => {
    const params = useParams();
    const { id } = params ?? {};
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ formTitle: "Untitled Form" })
    const [fields, setFields] = useState([]);
    const [selectedFieldId, setSelectedFieldId] = useState()
    const [fieldIdCounter, setFieldIdCounter] = useState(1);
    const [isFormTitleEdit, setFormTitleEdit] = useState(false);
    const [isEditView, setEditView] = useState(true);
    const [showDropdown, setShowDropdown] = useState(false);
    const [totalFields, setTotalFields] = useState(0);

    const fetchFormDetails = useCallback(() => {
        if (id)
            formDetails(id, (response) => {
                const { status, statusText, data } = response ?? {};
                if (status === 200) {
                    setFormData(data);
                    setFields(data.fields);
                    const maxFieldId = data.fields.length > 0 ? Math.max(...data.fields.map(field => field.fieldId)) : 0;
                    setFieldIdCounter(maxFieldId + 1);
                    setTotalFields(data.fields.length);
                    setEditView(false);
                } else {
                    alert(statusText);
                }
            })
    }, [id])

    useEffect(() => {
        fetchFormDetails();
    }, [id])


    const resetForm = () => {
        setFormData({ formTitle: 'Untitled Form' });
        setFields([])
        setFormTitleEdit(false);
        setEditView(false);
        setFieldIdCounter(1);
        setTotalFields(0);
    }

    const handleSubmit = () => {
        const resetFields = fields.map((field, index) => ({ ...field, fieldId: index + 1 }));

        const body = { ...formData, fields: resetFields };

        if (id) {
            updateForm(id, body, updateCallBack);
        } else {
            createForm(body, (response) => {
                const { status, statusText } = response ?? {};
                if (status === 200) {
                    alert('Form saved successfully');
                    navigate('/')
                } else {
                    alert(statusText);
                }
            })
        }

    }

    const updateCallBack = (response) => {
        const { status, message, statusText } = response ?? {};
        if (status === 200) {
            resetForm();
            fetchFormDetails();
            alert('Form saved successfully');
        } else {
            alert(message || statusText)
        }
    }

    const toggleDropDown = () => {
        setShowDropdown(!showDropdown);
    }

    const onSave = () => {
        toggleMode(false);
        handleSubmit();
    }

    const toggleMode = (isEdit) => {
        setEditView(isEdit)
        setShowDropdown(false)
    }


    const handleOnDragEnd = (result) => {

        if (!result.destination) return;

        const items = Array.from(fields);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setFields(items);
    }

    const addField = (type) => {
        const isSection = type === 'section';
        const id = fieldIdCounter;
        const label = `Label`;
        const fieldName = isSection ? `section_${id}` : `input_${id}`;
        const placeholder = `Placeholder`;
        const position = fieldIdCounter;
        setFields([...fields, { fieldId: id, fieldType: type, fieldName: fieldName, fieldLabel: label, fieldPlaceholder: placeholder, fieldPosition: position }]);
        setFieldIdCounter(fieldIdCounter + 1);
        if (!isSection) setTotalFields(totalFields + 1);
        setShowDropdown(false);
    };

    const deleteField = (deleteField) => {
        setFields(fields.filter(field => field.fieldId !== deleteField.fieldId));
        setFieldIdCounter(fieldIdCounter - 1);
        if (deleteField.fieldName.startsWith('input')) setTotalFields(totalFields - 1);
    };

    const handleEdit = (fieldId, isFormTitleEdit = false) => {
        if (!isEditView) return;

        setFormTitleEdit(isFormTitleEdit);
        if (!isFormTitleEdit) {
            setSelectedFieldId(fieldId)
            setFields(fields.map(field => (field.fieldId === fieldId ? { ...field, isEditing: true } : { ...field, isEditing: false })));
        }

    };

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setFields(fields.map(field => (field.fieldId === selectedFieldId ? { ...field, [name]: value } : field)));
    };

    const handleFormTitleChange = (e) => {
        setFormData({ ...formData, formTitle: e.target.value });
    };

    const viewMode = () => {
        setFormTitleEdit(false);
        setFields(fields.map(field => ({ ...field, isEditing: false })));
        setShowDropdown(false);
    }

    return (
        <div className="editor-form-container">
            {isEditView ? (
                <button className='btn btn-success' onClick={() => onSave()}>Save</button>
            ) : (
                <button className='btn btn-primary' onClick={() => toggleMode(true)}>Edit</button>
            )}

            <div className='title-editor'>
                <input
                    onDoubleClick={() => handleEdit(formData?.formTitle, true)}
                    readOnly={isEditView && isFormTitleEdit ? false : true}
                    value={formData?.formTitle}
                    className={isFormTitleEdit ? "h2" : "h2 non-edit"}
                    onChange={handleFormTitleChange}
                    onBlur={() => viewMode()}
                    type={'label'}
                    placeholder={"Enter form title"}
                    name={'fieldLabel'}
                />
                {isEditView && (isFormTitleEdit ? (
                    <button type="button" onClick={() => viewMode()} className="icon-button">
                        <CheckMarkIcon width={20} height={20} tintColor={"var(--success-color)"} />
                    </button>
                ) : (
                    <button type="button" onClick={() => handleEdit(formData?.formTitle, true)} className="icon-button"><EditIcon width={20} height={20} tintColor={"#007bff"} /></button>
                ))}

            </div>

            <form>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="fields">
                        {(provided) => (
                            <div className="editor-form-fields" ref={provided.innerRef} {...provided.droppableProps}>
                                {fields && fields.map((field, index) =>
                                (
                                    <Draggable key={index} draggableId={index.toString()} index={index}>
                                        {((provided) => (
                                            <FieldComponent ref={provided.innerRef}
                                                field={field}
                                                isEditView={isEditView}
                                                handleEdit={handleEdit}
                                                deleteField={deleteField}
                                                handleFieldChange={handleFieldChange}
                                                viewMode={viewMode}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps} />
                                        ))}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                                <AddFieldButton isRender={isEditView && totalFields < 20} toggleDropDown={toggleDropDown} showDropdown={showDropdown} addField={addField} />
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
                <button type="button" className='btn btn-success' style={{ marginTop: 20 }} >Submit</button>
            </form>
        </div>
    );



}

export default InlineFormEditor;