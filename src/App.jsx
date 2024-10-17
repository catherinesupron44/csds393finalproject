import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";


import HomePage from './components/homepage';
import FriendsPage from './components/friends';

function App() {

    return (
        <Router>
            <AnimatePresence>
                <Routes>
                <Route path="" element={<HomePage />} />
                <Route path="/friends" element={<FriendsPage />} />
                </Routes>
            </AnimatePresence>
        </Router>
    )
}

export default App;