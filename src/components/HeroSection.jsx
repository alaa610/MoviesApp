import React from "react";
function HeroSection() {
  return (
    <section className="hero-wrapper  position-relative herosection">
      <div
        className="hero-bg"
        style={{
          backgroundImage: "url('/images/bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight:"500px"
        }}
      >
        <div className="hero-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
        >
          <div className="container text-center text-white px-3">
            <h1 className="display-5 fw-bold mb-3">
              Unlimited <span style={{color:"#ef3120ff"}}>Movies</span>, TV Shows and more.
            </h1>
            <p className="lead mb-4">
              Watch anywhere. Cancel at any time.
            </p>
            <p className="mb-4" style={{color:"#999696ff"}}>
              Ready to watch? Click Button to create or restart your membership.
            </p>
            
            <div className="d-flex justify-content-center">
              
              <button className="btn btn-lg heroBtn">
                 START YOUR MEMBER NOW &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection


