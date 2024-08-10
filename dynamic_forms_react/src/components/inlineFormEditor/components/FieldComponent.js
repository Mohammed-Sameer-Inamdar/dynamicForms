import React, { forwardRef } from 'react';
import { CheckMarkIcon, DeleteIcon, DragIcon, EditIcon } from '../../../utils/icons';

const FieldComponent = forwardRef(({ field, isEditView, handleEdit, deleteField, handleFieldChange, viewMode, ...props }, ref) => {
    const isInput = field.fieldName.startsWith('input');
    const labelClass = field.isEditing ? (isInput ? "label" : "heading") : (isInput ? "label non-edit" : "heading non-edit");
    const readOnly = isEditView && field.isEditing ? false : true;
    return (
        <div ref={ref} className={isInput ? "editor-form-field-input" : "editor-form-field-section"} {...props}>
            <div style={{display:'flex', alignItems:'center'}}>
                {isEditView && <div style={{ display: 'inline-flex' }}><DragIcon width={30} height={20} /></div>}
                <input
                    onDoubleClick={() => handleEdit(field.fieldId, false)}
                    readOnly={readOnly}
                    value={field.fieldLabel}
                    className={labelClass}
                    onChange={handleFieldChange}
                    type="text"
                    placeholder={isInput ? "Label" : "Title"}
                    name="fieldLabel"
                />
                {isEditView && (
                    <span>
                        {field.isEditing ? (
                            <button type="button" onClick={() => viewMode()} className="icon-button">
                                <CheckMarkIcon width={20} height={20} tintColor={"var(--success-color)"} />
                            </button>
                        ) : (
                            <span style={{ display: 'flex' }}>
                                <button type="button" onClick={() => handleEdit(field.fieldId, false)} className="icon-button">
                                    <EditIcon width={20} height={20} tintColor={"#007bff"} />
                                </button>
                                <button type="button" onClick={() => deleteField(field)} className="icon-button">
                                    <DeleteIcon width={20} height={20} tintColor={"red"} />
                                </button>
                            </span>
                        )}
                    </span>
                )}
            </div>
            {isInput && (
                <input
                    className={field.isEditing ? 'input-field' : 'input-field gray-placeholder'}
                    value={field.isEditing ? field.fieldPlaceholder : ""}
                    onDoubleClick={() => handleEdit(field.fieldId, false)}
                    readOnly={isEditView && field.isEditing ? false : true}
                    onChange={handleFieldChange}
                    type={field.isEditing ? "text" : field.fieldType}
                    placeholder={field.isEditing ? "Enter placeholder" : field.fieldPlaceholder}
                    name={field.isEditing ? "fieldPlaceholder" : field.fieldName}
                />
            )}
        </div>
    );
});

export default FieldComponent;