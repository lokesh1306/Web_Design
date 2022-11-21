import React from 'react'
import Card from '../Card'
import Footer from './Footer'
import './Contact.css';
import Navbars from './Navbar'

function Contact() {
        return (
           <React.Fragment>
             <div>
        <Navbars/>
        </div> 
         <div> 
         <Card color={"grey"} title="Contact" content="This is the contact Page"/>
         </div><br></br> 

        <form>
          <label for="fname">First Name</label><br></br>
          <input type="text" id="fname" name="firstname" placeholder="Your name.."/><br></br>

          <label for="lname">Last Name</label><br></br>
          <input type="text" id="lname" name="lastname" placeholder="Your last name.."/><br></br>

         <label for="country">Country</label><br></br>
          <select id="country" name="country">
            <option value="australia">Australia</option>
            <option value="canada">Canada</option>
            <option value="usa">USA</option>
          </select>

       
          <label for="subject">Subject</label><br></br>
          <textarea> Please Enter here......</textarea><br></br>
           {/* <textarea id="subject" name="subject" placeholder="Write something.." style="height:200px"/>  */}

          <input type="submit" value="Submit"/> <br></br>
        
        </form>

         <Footer/>  
        </React.Fragment> 
        )
}
// ReactDOM.render(<Contact />, document.getElementById('root'));


export default Contact