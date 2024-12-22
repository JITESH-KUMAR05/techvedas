import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white h-full flex items-center">
      <div className="container px-10 py-2 mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} My Blog. All rights reserved.</p>
        <div className="mt-2">
          <a href="/privacy" className="hover:text-gray-400 mx-2">Privacy Policy</a>
          <a href="/terms" className="hover:text-gray-400 mx-2">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;