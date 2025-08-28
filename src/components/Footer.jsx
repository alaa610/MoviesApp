import React from "react";

function Footer() {
  return (
    <footer className="mt-5 py-4 border-top" style={{background:'#0f131a'}}>
      <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between">
        <div className="text-white-50">© <sppan style={{color:"rgba(216, 51, 36, 0.917)"}}>Movies</sppan>. All rights reserved.</div>
        <div className="d-flex gap-3 mt-3 mt-md-0">
          <a href="#" className="text-decoration-none footbtn">Twitter</a>
          <a href="#" className="text-decoration-none footbtn">Instagram</a>
          <a href="#" className="text-decoration-none footbtn">YouTube</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;


