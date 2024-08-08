import React from "react"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import HomePage from "../components/home";
import DynamicForm from "../components/newForm";
import ViewForm from "../components/viewForm";

const RootNavigation = () => {
    return (
        <div sx={{ height: '100vh', backgroungColor: 'lightGrey', width: '100vw' }}>
            <Router>
                <Routes>
                    <Route exact path="/" element={<HomePage />} />
                    <Route exact path="/form/create" element={<DynamicForm />} />
                    <Route exact path="/form/:id/edit" element={<DynamicForm />} />
                    <Route exact path="/form/:id" element={<ViewForm />} />
                </Routes>
            </Router>
        </div>
    )
}

export default RootNavigation;