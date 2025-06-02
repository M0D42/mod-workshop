import React from 'react';
import Hero from './hero.jsx';
import Description from './description.jsx';
import NewBlog from './newblog.jsx';
import ContactMe from './contactme.jsx';

function Home() {
    return (
        <>
            <Hero />
            <Description />
            <NewBlog />
            <ContactMe />
        </>
    );
}

export default Home;