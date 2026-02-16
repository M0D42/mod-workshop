import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom"; // Removed Router import
import "./App.css";
import Navbar from "./navbar.jsx";
import Home from "./home.jsx";
import ContactMe from "./contactme.jsx";

function App() {
    const [showNavbar, setShowNavbar] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Logic to show navbar after scrolling 80% of the viewport height
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
        <> {/* Used a React Fragment instead of <Router> */}
            {showNavbar && <Navbar />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/contact" element={<ContactMe />} />
                <Route
                    path="/blog"
                    element={
                        <div style={{ padding: "2rem", textAlign: "center", color: "white" }}>
                            <h2>Blog</h2>
                            <p>Coming Soon!</p>
                        </div>
                    }
                />
            </Routes>
        </>
    );
}

export default App;
