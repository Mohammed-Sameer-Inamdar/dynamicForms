import React from "react"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import HomePage from "../components/home";
import ViewForm from "../components/viewForm";
import SimpleFormEditor from "../components/simpleFormEditor";
import InlineFormEditor from "../components/inlineFormEditor";

const RootNavigation = () => {
    return (
        <div className="container">
            <Router>
                <Routes>
                    <Route exact path="/" element={<HomePage />} />
                    <Route exact path="/form/create" element={<SimpleFormEditor />} />
                    <Route exact path="/form/create-inline" element={<InlineFormEditor />} />
                    <Route exact path="/form/:id/edit" element={<SimpleFormEditor />} />
                    <Route exact path="/form/:id/edit-inline" element={<InlineFormEditor />} />
                    <Route exact path="/form/:id" element={<ViewForm />} />
                </Routes>
            </Router>
        </div>
    )
}

export default RootNavigation;