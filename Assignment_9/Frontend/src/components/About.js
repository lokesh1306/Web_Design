import React from 'react'
import Card from '../Card'
import Footer from './Footer'
import './About.css';
import Navbars from './Navbar'

function About() {
        return (
  <React.Fragment>   
    <div>
        <Navbars/>
        </div>     
  <div class="about-section">
    <h1>About Us Page</h1>
    <p>Some text about who we are and what we do.</p>
    <p>Resize the browser window to see that this page is responsive by the way.</p>
  </div>

{/* <h2 style="text-align:center">Our Team</h2> */}
<div class="row">
  <div class="column">
    <div class="card">
      {/* <img src="/w3images/team1.jpg" alt="Jane" style="width:100%"> */}
      <div class="container">
        <h2>Jane Doe</h2>
        <p class="title">CEO and Founder</p>
        <p>Some text that describes me lorem ipsum ipsum lorem.</p>
        <p>jane@example.com</p>
        <p><button class="button">Contact</button></p>
      </div>
    </div>
  </div>

  <div class="column">
    <div class="card">
      {/* <img src="/w3images/team2.jpg" alt="Mike" style="width:100%"> */}
      <div class="container">
        <h2>Mike Ross</h2>
        <p class="title">Art Director</p>
        <p>Some text that describes me lorem ipsum ipsum lorem.</p>
        <p>mike@example.com</p>
        <p><button class="button">Contact</button></p>
      </div>
    </div>
  </div>

  <div class="column">
    <div class="card">
      {/* <img src="/w3images/team3.jpg" alt="John" style="width:100%"> */}
      <div class="container">
        <h2>John Doe</h2>
        <p class="title">Designer</p>
        <p>Some text that describes me lorem ipsum ipsum lorem.</p>
        <p>john@example.com</p>
        <p><button class="button">Contact</button></p>
      </div>
    </div>
  </div>
  
</div>
  <div>
      {/* this is About page  */}
      <Card color={"grey"} title="About" content="This is the about Page"/>
  </div>
 <Footer/>
</React.Fragment>
  )

}

export default About