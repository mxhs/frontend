import React from "react";
import { Link } from "react-router-dom";

export default function LandingPagetest() {
  return (
    <div>
      <Link to="signin">Sign In</Link>
      <Link to="signup">Sign Up</Link>
    </div>
  );
}
