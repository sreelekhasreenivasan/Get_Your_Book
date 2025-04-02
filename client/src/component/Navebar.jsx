import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi'; 
import logo from '../Images/logo.png';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://127.0.0.1:3000/logout');

      if (response.ok) {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }

    navigate('/login');
  };

  return (
    <>
      <nav className="flex items-center justify-between px-6 py-3 bg-slate-300">
        <div>
          <img src={logo} alt="Get Your Book" className="h-14 w-14" />
        </div>

        <ul className="flex items-center gap-6 ml-auto">
          <li className=" text-green-600 hover:text-indigo-500">
            <Link to="/view-book">Library</Link>
          </li>
          <li className=" text-green-600 hover:text-indigo-500">
            <Link to="/add-book">Add Book</Link>
          </li>

          <button onClick={handleLogout} className="bg-transparent border-none cursor-pointer text-red-800 text-xl hover:text-indigo-500">
            <FiLogOut />
          </button>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
