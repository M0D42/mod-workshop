import React, { useState } from "react";
import "./newblog.css";

const blogs = [
    {
        title: "How I built a steamdeck power rc controller",
        date: "2025-05-30",
        summary: "A deep dive into building and hacking steamdeck, nrf24 and pygame.",
        link: "#"
    },
    {
        title: "How to make projects faster",
        date: "2025-05-20",
        summary: "exploring the ways to make projects faster and more efficient and flow in your creative process.",
        link: "#"
    }
    // Add more blog objects here
];

function NewBlog() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button className="open-blog-menu" onClick={() => setOpen(true)}>
                Open Blogs
            </button>
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