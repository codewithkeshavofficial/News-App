import React from "react";

const Loader = () => {
  return (
    <div className=" d-flex justify-content-evenly align-items-center" >
      <div className="spinner-grow bg-warning text-dark" role="status"></div>
      <div className="spinner-grow bg-danger text-dark" role="status"></div>
      <div className="spinner-grow bg-success text-dark" role="status"></div>
      <span>Please Wait...</span>
    </div>
  );
};

export default Loader;
