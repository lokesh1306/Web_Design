import React from 'react'
import Card from '../Card'
import Footer from './Footer'
import "./Home.css"
import Navbars from './Navbar'

function Home() {
    return (
        <React.Fragment>
            <div>
        <Navbars/>
        </div>
        <br />
            <div class="about-section">
                <h1>Indeed</h1>
                <p>Most Trusted Job Portal</p>
            </div>
            <br />
            <div className="row">
                <div className="column" style={{backgroundColor:"#ccc"}}>
                    <h2>Recent Job Postings</h2>
                    <p>Front-end Developer</p>
                    <p>Back-end Developer</p>
                    <p>Software Deverloper</p>
                    <p> Cloud Deverloper</p>
                    <p>Data-Engineer</p>
                </div>
                <div className="column" style={{backgroundColor:"#ccc"}}>
                    <h2>Join out premium to get notifications </h2>
                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
                </div>
                <div className="column" style={{backgroundColor:"#ccc"}}>
                    <h2>Blog</h2>
                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
                </div>
            </div>

        <div>
                {/* this is About page  */}
                <Card color={"grey"} title="Home" content="This is the home Page"/>
            </div><Footer />
</React.Fragment>
)

}

export default Home