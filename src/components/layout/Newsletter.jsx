import React from "react";

function Newsletter() {
  return (
    <div className="newsletter">
      <h1 className="newsletterTitle">Save time, save money!</h1>
      <h2 className="newsletterSubtitle">
        Sign up and we'll send the best deals to you
      </h2>
      <div className="subscribeContainer">
        <input type="email" name="" id="" placeholder="Your email" />
        <button>Subscribe</button>
        <div className="confirmation">
          <input type="checkbox" name="" id="" />
          <span>Send me information</span>
        </div>
      </div>
    </div>
  );
}

export default Newsletter;
