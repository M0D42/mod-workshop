import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar.jsx";
import Home from "./Home.jsx";
import ContactMe from "./contactme.jsx";
// import Blog from './Blog.jsx'; // Uncomment if you have a Blog page

function App() {
    const [showNavbar, setShowNavbar] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > window.innerHeight * 0.8) {
                setShowNavbar(true);
            } else {
                setShowNavbar(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Router>
            {showNavbar && <Navbar />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/contact" element={<ContactMe />} />
                <Route path="/blog" element={<div>Blog Page (Coming Soon)</div>} />
                
                {/* <Route path="/blog" element={<Blog />} /> */}
                {/* Add more routes here as needed */}
            </Routes>
        </Router>
    );
}

export default App;