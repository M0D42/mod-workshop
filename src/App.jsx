import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom"; // <-- Use HashRouter
import "./App.css";
import Navbar from "./navbar.jsx";
import Home from "./home.jsx";
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
                <Route
                path="/blog"
                element={
                    <div style={{ padding: "2rem", textAlign: "center" }}>
                    <h2>Blog</h2>
                    <p>Coming Soon!</p>
                    </div>
                }
                />
            </Routes>
        </Router>
    );
}

export default App;