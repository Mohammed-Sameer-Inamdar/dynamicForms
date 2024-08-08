import React from "react";
import { DeleteIcon, EditIcon } from "../../../utils/icons";

export const FormContainer = ({ formTitle, fields, handleEdit, deleteField, addField,fieldIdCounter }) => {
    return (
        <div className="form-container">
            <h2 className="form-title">{formTitle}<span style={{ marginLeft: 10 }} onClick={() => handleEdit(formTitle, true)}><EditIcon width={20} height={20} tintColor={'#007bff'} /></span></h2>
            <div className="fields-container">
                {fields.map((field, index) => (
                    <div key={index} className="field-container">
                        <div className="input-container">
                            <label className="input-label">{field.fieldLabel}</label>
                            <input
                                type={field.fieldType}
                                placeholder={field.fieldPlaceholder}
                                className="input-field"
                                readOnly
                            />
                        </div>
                        <button type="button" onClick={() => handleEdit(field, false)} className="icon-button"><EditIcon width={20} height={20} tintColor={"#007bff"} /></button>
                        <button type="button" onClick={() => deleteField(field.fieldId)} className="icon-button"><DeleteIcon width={20} height={20} tintColor={"red"} /></button>
                    </div>
                ))}
            </div>
            <div className="button-container" style={{ display: (fieldIdCounter > 20) ? 'none' : 'flex' }}>
                <button type="button" disabled={fieldIdCounter > 20} onClick={() => addField('text')} className="btn btn-primary">Text</button>
                <button type="button" disabled={fieldIdCounter > 20} onClick={() => addField('numer')} className="btn btn-primary">Number</button>
                <button type="button" disabled={fieldIdCounter > 20} onClick={() => addField('email')} className="btn btn-primary">Email</button>
                <button type="button" disabled={fieldIdCounter > 20} onClick={() => addField('password')} className="btn btn-primary">Password</button>
                <button type="button" disabled={fieldIdCounter > 20} onClick={() => addField('date')} className="btn btn-primary">Date</button>
            </div>
            <div className="form-action">
                <button type="submit" className="btn btn-success">Submit</button>
            </div>
        </div>
    )
}

export default FormContainer;