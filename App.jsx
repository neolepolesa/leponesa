import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import UserForm from './components/UserForm';
import ProductForm from './components/ProductForm';
import Dashboard from './components/Dashboard';


const NotFound = () => {
    return <div>404 - Page Not Found</div>;
};

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/usermanagement" element={<UserForm />} />
                <Route path="/productmanagement" element={<ProductForm />} />
                <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
            </Routes>
        </Router>
    );
};

export default App;
