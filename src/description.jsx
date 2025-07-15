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
               Leader of hacker gang <strong>BotSec</strong> from the moon, I specialize in creative hardware hacks, IoT automation, and web development. My projects range from Nerf turrets and Wi-Fi badges to ESP32 camera keychains and automated plant watering systems. I’m passionate about open-source collaboration, sharing guides and code under the MIT license, and infusing every project with a playful, rebellious edge. "Don’t ask or get hacked."
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
