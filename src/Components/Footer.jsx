import React from "react";

const date = new Date();

function Footer(){
  return(
    <footer>
      <p> Made by Divyey | Copyright {date.getFullYear()}. </p>
    </footer>
  )
}

export default Footer;
