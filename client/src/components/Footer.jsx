import React from 'react';

const Footer = () => {
return (
    <footer className="bg-gray-800 text-white py-4 mt-8 text-center text-sm">
        <p>© {new Date().getFullYear()} PersonaChat AI. All rights reserved.</p>
        <div className="mt-2 space-x-4">
            <a href="#" className="hover:text-indigo-400">About</a>
            <a href="#" className="hover:text-indigo-400">Contact</a>
            <a href="#" className="hover:text-indigo-400">LinkedIn</a>
            <a href="#" className="hover:text-indigo-400">Instagram</a>
        </div>
    </footer>
);
};

export default Footer;

