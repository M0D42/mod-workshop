import React, { useRef } from "react";
import "./contactme.css";
import emailjs from "@emailjs/browser";

function ContactMe() {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        // Set the time input value right before sending
        const timeInput = form.current.querySelector("#form-time");
        if (timeInput) {
            timeInput.value = new Date().toLocaleString();
        }

        emailjs.sendForm(
            "service_o6jokkc",         // Your EmailJS service ID
            "template_a7x0j1x",        // Your EmailJS template ID
            form.current,              // Form reference
            "m8PKPvYOMq-fDRWY3"        // Your public key
        ).then(
            () => {
                console.log("SUCCESS!");
                form.current.reset(); // Clear the form after success
            },
            (error) => {
                console.log("FAILED...", error);
            }
        );
    };

    return (
        <section className="contact-me">
            <h2>Contact Me or Message Me</h2>
            <div className="contact-row">
                <a
                    href="https://github.com/M0D42"
                    className="contact-links"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img src="./github.png" alt="GitHub" />
                </a>
                <form ref={form} onSubmit={sendEmail} className="contact-mail">
                    <h3>Message</h3>

                    {/* Hidden fields */}
                    <input type="hidden" name="title" value="M0D-Worksho" />
                    <input type="hidden" name="time" id="form-time" />

                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        required
                    />
                    <textarea
                        name="message"
                        rows="4"
                        placeholder="Write your message"
                        required
                    />
                    <button type="submit">Send</button>
                </form>
            </div>
        </section>
    );
}

export default ContactMe;
