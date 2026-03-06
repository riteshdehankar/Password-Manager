import React, { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-blue-300 text-black sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4">

        <div className="flex justify-between items-center h-16">

          {/* LOGO */}
          <div className="font-bold text-xl md:text-2xl">
            <span className="text-red-700">&lt;</span>
            <span className="text-white">Pass</span>
            <span className="text-green-700">OP/&gt;</span>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-6">

            <div className="flex gap-6">
              <a className="hover:font-bold" href="/">Home</a>
              <a className="hover:font-bold" href="/">About</a>
              <a className="hover:font-bold" href="/">Contact</a>
            </div>

            <button className="text-white bg-black rounded-full flex items-center gap-2 px-3 py-1 hover:bg-gray-700 ring-1 ring-white">
              <img className="invert w-5" src="/github.svg" alt="github" />
              <span className="font-bold">Github</span>
            </button>

          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden">
            <button onClick={() => setOpen(!open)} className="text-2xl">
              ☰
            </button>
          </div>

        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden flex flex-col gap-3 pb-4">
            <a className="hover:font-bold" href="/">Home</a>
            <a className="hover:font-bold" href="/">About</a>
            <a className="hover:font-bold" href="/">Contact</a>

            <button className="text-white bg-black rounded-full flex items-center gap-2 px-3 py-1 w-fit hover:bg-gray-700">
              <img className="invert w-5" src="/github.svg" alt="github" />
              <span className="font-bold">Github</span>
            </button>
          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;