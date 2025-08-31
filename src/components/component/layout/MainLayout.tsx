import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
// import { useState } from "react";





const MainLayout = () => {

  // const [darkMode, setDarkMode] = useState(false);
  // const toggleDarkMode = () => {
  //   setDarkMode(!darkMode);
  // }

  return (
    // ${darkMode && 'dark'}
  <div className={` w-full  overflow-x-hidden`}>
        <Navbar/>
      <div className="">
      <Outlet/>

      </div>
      <div className="absolute  top-4 right-4 bg-white rounded-full">
        {/* <button 
        className=""
        onClick={toggleDarkMode}
        >
          {darkMode ? "LHT" : 'DRK'}
        </button> */}
      </div>
  </div>

  );
};

export default MainLayout;
