import React, { useState } from "react";
import "./newblog.css";

const blogs = [
    {
        title: "coming soon",
        date: "nd",
        summary: "coming soon!!!!!!!!!!!!!!",
        link: "#"
    },
    {
        title: "coming soon",
        date: "2025-05-20",
        summary: "soon!!!!!!!!!!!!!!.",
        link: "#"
    }
    // Add more blog objects here
];

function NewBlog() {
    const [open, setOpen] = useState(false);

    return (
        
            <div className={`blog-slide-menu${open ? " open" : ""}`}>

                <h2>New Blogs</h2>
                <ul>
                    {blogs.map((blog, idx) => (
                        <li key={idx} className="blog-post">
                            <a href={blog.link}>
                                <h3>{blog.title}</h3>
                            </a>
                            <small>{blog.date}</small>
                            <p>{blog.summary}</p>
                        </li>
                    ))}
                </ul>
            </div>
            {/* Optional: overlay to close menu when clicking outside */}
            {open && <div className="blog-menu-overlay" onClick={() => setOpen(false)}></div>}
        </>
    );
}

export default NewBlog;
