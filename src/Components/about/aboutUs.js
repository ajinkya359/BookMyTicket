import React from "react";
import "./aboutUs.css";
class AboutUs extends React.Component
{
    render()
    {
        return (
            <div>
                <div class="menu">Home</div>
    <div class="grid-container">
    <div class="grid-items" id="about">About Us</div>
  <div class='gird-items' id="wrapper"><div  id="text">Our talented teams craft the best code and design amazing user experiences for our clients.</div></div>
    <div class="grid-items" id="image" ><img src="about-us-assets/images/pexels-startup-stock-photos-7096.jpg" width="500px" height="350px" alt=""/></div>
  </div>
            </div>
                );
    }
}

export default AboutUs;
