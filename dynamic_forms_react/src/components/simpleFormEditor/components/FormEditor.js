import React from "react";
import { ucFirstLetter } from "../../../utils/helper";

const FormEditor = ({ editingField, isFormTitleEdit, handleFormTitleChange, handleFieldChange }) => {

    return (
        <div className="editor-container">
            <h2>Form Field Editor</h2>
            {editingField && (
                isFormTitleEdit ? (
                    <div className="input-container">
                        <label className="input-label">Title</label>
                        <input
                            type="text"
                            name="label"
                            value={editingField?.formTitle}
                            onChange={handleFormTitleChange}
                            className="input-field"
                        />
                    </div>
                ) :
                    (<div>
                        <h3>{ucFirstLetter(editingField?.fieldType)}</h3>
                        <div className="input-container">
                            <label className="input-label">Title</label>
                            <input
                                type="text"
                                name="fieldLabel"
                                value={editingField.fieldLabel}
                                onChange={handleFieldChange}
                                className="input-field"
                            />
                        </div>
                        {editingField.fieldName.startsWith('input') &&
                            <div className="input-container">
                                <label className="input-label">Placeholder</label>
                                <input
                                    type="text"
                                    name="fieldPlaceholder"
                                    value={editingField.fieldPlaceholder}
                                    onChange={handleFieldChange}
                                    className="input-field"
                                />
                            </div>
                        }

                    </div>
                    )
            )}
        </div>
    )
}

export default FormEditor;