import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ProtectedRoutes from "./utils/ProtectedRoutes";


import HomePage from './components/homepage';
import FriendsPage from './components/friends';
import SignUp from "./components/SignUp";
import Login from "./components/Login";

function App() {

    return (
        <Router>
            <AnimatePresence>
                <Routes>
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<SignUp />} />
                <Route element={<ProtectedRoutes/>} >
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/friends" element={<FriendsPage />} />
                </Route>
                </Routes>
            </AnimatePresence>
        </Router>
    )
}

export default App;