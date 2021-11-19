import React from "react";
import "./AboutUs.css"
class About extends React.Component
{
    render()
    {
        return (
          <div>
             <div class="cover-photo">
              <div class="upper-text">WE ARE</div>
              <div class="lower-text">MOVIE BUFFS</div>
             </div>
             <div class="content">10 years ago in South Africa a seed of an idea was planted, a dream was shared. Inception happened. 10 years on, we look back at what we've built.<br/> Leave it up to
            us, and we'd love do it all over again. Here's our story.
            <div class="image-container">
              <img src="./assets/images/icon1.png" alt="" height="150px" width="150px"/>
              <img src="./assets/images/icon2.png" alt="" height="150px" width="150px"/>
              <img src="./assets/images/icon3.png" alt="" height="150px" width="150px"/>
            </div>
           <div class="footer">
            Copyright © 2021 Book My Ticket<br/>
            <br/>
                    All rights reserved.
          </div>
          </div>
         
          </div>
        );
 
    }
}

export default About;
