import React, { useEffect, useRef } from "react";
import "./description.css";

function Description() {


    return (
        <div className="thins" >
            <a href="https://github.com/M0D42" target="_blank" rel="noopener noreferrer" className="fade-in">
                <img src="./M0D.png" alt="profile" className="profile" />
            </a>
            <div className="text">
            <p className="fade-in">
                Hi, I'm M0D.<br />
                I'm a hacker who specializes in modifying and creating tech, especially electronics like NRF24 RC systems and website keychains. I love hacking things and repurposing them for new uses. I also enjoy building websites, including fan pages for my projects.
            </p>
            
            <p >Skills</p>
            <ul className="fade-in">
                <li>Modifying tech</li>
                <li>Web development</li>
                <li>Electronics</li>
                <li>3D printing</li>
                <li>Hacking</li>
            </ul>
            </div>
        </div>
    );
}

export default Description;
