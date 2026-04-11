import { Link } from "react-router-dom";
import { PiggyBank } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 w-full z-50 bg-gradient-to-r from-sky-100 via-blue-100 to-indigo-100 backdrop-blur-md border-b border-blue-200 shadow-sm">
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 rounded-lg bg-gradient-to-r from-sky-500 to-blue-500 text-white text-sm font-semibold shadow">
                 <PiggyBank />
            </div>
            <span className="text-blue-900 text-lg font-semibold tracking-wide">
              Digital Bank
            </span>
          </div>

          {/* Links */}
          <div className="hidden md:flex items-center gap-10 text-[16.5px] font-medium text-blue-900">
            
            <Link 
              to="/" 
              className="relative group transition"
            >
              Dashboard
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link 
              to="/transactions" 
              className="relative group transition"
            >
              Transactions
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link 
              to="/cards" 
              className="relative group transition"
            >
              Cards
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link 
              to="/support" 
              className="relative group transition"
            >
              Support
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>

          </div>

          {/* Button */}
          <div className="hidden md:flex items-center">
            <Link to="/signin">
              <button className="px-5 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-sky-500 to-blue-500 text-white hover:scale-105 hover:shadow-md transition-all duration-300">
                Sign In
              </button>
            </Link>
          </div>

        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden px-6 py-4 flex flex-col gap-4 text-blue-800 bg-sky-100 border-t border-blue-200">
        <Link to="/" className="hover:text-blue-900">Dashboard</Link>
        <Link to="/transactions" className="hover:text-blue-900">Transactions</Link>
        <Link to="/cards" className="hover:text-blue-900">Cards</Link>
        <Link to="/support" className="hover:text-blue-900">Support</Link>

        <Link to="/signin">
          <button className="w-full mt-2 py-2 rounded-lg bg-gradient-to-r from-sky-500 to-blue-500 text-white font-medium hover:shadow transition">
            Sign In
          </button>
        </Link>
      </div>

    </nav>
  );
};

export default Navbar;