import React from "react";
import { DeleteIcon, EditIcon } from "../../../utils/icons";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

export const FormContainer = ({ formTitle, fields, handleEdit, deleteField, addField, totalFields, handleOnDragEnd }) => {

    return (
        <div className="form-container">
            <h2 className="form-title">{formTitle}<span style={{ marginLeft: 10 }} onClick={() => handleEdit({ formTitle: formTitle }, true)}><EditIcon width={20} height={20} tintColor={'#007bff'} /></span></h2>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="fields">
                    {(provided) => (
                        <div className="fields-container" ref={provided.innerRef} {...provided.droppableProps}>

                            {fields && fields.map((field, index) =>
                                field.fieldType.startsWith('section') ? (
                                    <Draggable key={field.fieldId} draggableId={field.fieldId.toString()} index={index}>
                                        {((provided) => (
                                            <div className="section-container" ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps} >
                                                <h3 className="section-title">{field.fieldLabel}</h3>
                                                <button type="button" onClick={() => handleEdit(field, false)} className="icon-button"><EditIcon width={20} height={20} tintColor={"#007bff"} /></button>
                                                <button type="button" onClick={() => deleteField(field)} className="icon-button"><DeleteIcon width={20} height={20} tintColor={"red"} /></button>
                                            </div>
                                        ))}
                                    </Draggable>
                                ) :
                                    (
                                        <Draggable key={field.fieldId} draggableId={field.fieldId.toString()} index={index}>
                                            {((provided) => (
                                                <div className="field-container" ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
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
                                                    <button type="button" onClick={() => deleteField(field)} className="icon-button"><DeleteIcon width={20} height={20} tintColor={"red"} /></button>
                                                </div>
                                            ))}
                                        </Draggable>
                                    ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <div className="button-container" style={{ display: (totalFields >= 20) ? 'none' : 'flex' }}>
                <button type="button" onClick={() => addField('section')} className="btn btn-primary">Section</button>
                <button type="button" onClick={() => addField('text')} className="btn btn-primary">Text</button>
                <button type="button" onClick={() => addField('numer')} className="btn btn-primary">Number</button>
                <button type="button" onClick={() => addField('email')} className="btn btn-primary">Email</button>
                <button type="button" onClick={() => addField('password')} className="btn btn-primary">Password</button>
                <button type="button" onClick={() => addField('date')} className="btn btn-primary">Date</button>
            </div>
            <div className="form-action">
                <button type="button" className="btn btn-success">Submit</button>
            </div>
        </div>
    )
}

export default FormContainer;