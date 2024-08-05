import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex  flex-col justify-center h-screen items-center gap-4">
     <p className="text-8xl font-semibold bg-gray-300 p-4 rounded">404 <span>Page not found</span></p>
      <Link to={'/'}><button className="text-white bg-black p-2 rounded">back to home</button></Link>
    </div>
  );
};

export default PageNotFound;