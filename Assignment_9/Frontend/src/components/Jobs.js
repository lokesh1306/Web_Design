import React from 'react'
import Card from '../Card'
import Map from "./Map";
import Navbars from './Navbar'
import Footer from './Footer';


const data = [
    { id: 1, name: "Front-end Developer" },
    { id: 2, name: "Back-end Developer" },
    { id: 3, name: "Software Deverloper" },
    { id: 3, name: "Cloud Deverloper" },
    { id: 3, name: "Data-Engineer" },
  ];

function Jobs() {
        return (
            <React.Fragment>
            <div>
        <Navbars/>
        </div>
           <br />
            <br />
            <Card color={"grey"} title="This page consists of various job postings"/> 
            <div>List of jobs <br></br> 
            {data.map((item) => {
                return <Map id={item.id} key={item.id} name={item.name} />; })}    
            </div>
            <Footer/>
            </React.Fragment>
        )
}

export default Jobs