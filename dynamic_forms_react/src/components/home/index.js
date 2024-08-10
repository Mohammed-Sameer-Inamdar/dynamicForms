import React, { useCallback, useEffect, useState } from 'react';
import './home.css'
import { deleteFrom, fetchFormsList } from '../../service/formService';
import { useNavigate } from 'react-router-dom';
import TwoButtonModal from '../common/modal/TwoButtonModal';

const HomePage = () => {

    const navigate = useNavigate();
    const [forms, setForms] = useState([]);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteFormId, setDeleteFormId] = useState();

    const loadForms = useCallback(() => {
        fetchFormsList((response) => {
            const { status, statusText: message, data } = response ?? {};
            if (status === 200) {
                setForms(data);
            } else {
                alert(message);
            }
        });
    }, [])

    useEffect(() => {
        loadForms();
    }, [])

    const handleNewForm = (isInline) => {
        if (isInline) {
            navigate('form/create-inline');
        } else {
            navigate('form/create');
        }
    }

    const handleEdit = (id) => {
        navigate(`form/${id}/edit`);
    }
    const handleInlineEdit = (id) => {
        navigate(`form/${id}/edit-inline`);
    }

    const handleView = (id) => {
        navigate(`/form/${id}`)
    }

    const handleDelete = (id) => {
        setDeleteModalOpen(true);
        setDeleteFormId(id);
    }

    const onDeleteConfirm = () => {

        deleteFrom(deleteFormId, (response) => {
            const { status, message, statusText } = response ?? {};
            if (status === 200) {
                loadForms();
                setDeleteFormId(null);
                setDeleteModalOpen(false);
                alert('Deleted successfully')
            } else {
                alert(message || statusText);
            }

        })
    }

    const onCancleDelete = () => {
        setDeleteModalOpen(false);
        setDeleteFormId(null);
    }

    return (
        <div className="home-container">
            <h1>Welcome to Forms World</h1>
            <span>
                <button className="btn btn-primary" onClick={() => handleNewForm(false)}>New Form Simple</button>
                <button className="btn btn-primary" onClick={() => handleNewForm(true)}>New Form Inline</button>
            </span>
            <h1>Forms</h1>

            <div className="forms-container">
                {forms && forms.map((form, index) => (
                    <div key={index} className="form-card">
                        <h3>{form?.formTitle}</h3>
                        <button className='btn icon-button' onClick={() => handleView(form._id)}>View</button>
                        <button className='btn icon-button' onClick={() => handleEdit(form._id)}>Edit</button>
                        <button className='btn icon-button' onClick={() => handleInlineEdit(form._id)}>Inline Edit</button>
                        <button className='btn icon-button' onClick={() => handleDelete(form._id)} style={{ color: 'red' }}>Delete</button>
                    </div>
                ))}
            </div>

            <TwoButtonModal
                isOpen={deleteModalOpen}
                onClose={onCancleDelete}
                title="Confirm Delete"
                message="Are you sure you want to delete this form?"
                button1Text="Yes"
                button2Text="No"
                onButton1Click={onDeleteConfirm}
                onButton2Click={onCancleDelete}
                button1Class={"btn btn-danger"}
                button2Class={"btn btn-primary"}
            />
        </div>

    );
};

export default HomePage;
