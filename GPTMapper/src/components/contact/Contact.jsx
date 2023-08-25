import React from 'react'
import Home from '../home/Home'
import './contact.css'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import { Link } from 'react-router-dom'
const Contact = () => {
  return (
    <>
    <Header/>
    {/* <Home/> */}
    <div className='section-1-outer' id='contact'>
      <div className='section-1-inner'>

      <div>
        <h2>Contact Us</h2>
      </div>
      <div>
        <ol>
            
            <li><Link to='/'><i class="icon_house_alt"></i> Home ‎ ‎ &gt; </Link></li>
            <li> ‎ ‎ Contact</li>
        </ol>
    </div>
      </div>
    </div>
    <div className='contact-area'>
      <div className='contact-area-container' >
        <div className='first'>
          <h2>Let's Work Together</h2>
        </div>
        <div className='second'>
          <div className='second-inner'>
            <p>Email</p>
            <a href='#'>info.microcoders@gmail.com</a>
          </div>
          <div className='second-inner'>
            <p>Call Us</p>
            <a href='#'>+6511.188.888</a>
          </div>
        </div>
        <div className='third'>
          <div className='second-inner'>
            <p>Visit Us</p>
            <a href='#'>60-49 Road 11378 New Delhi</a>
          </div>
        </div>
      </div>

    </div>

    <div className='map-area'>
      <div className='map'>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12309.440717226664!2d24.094896788114085!3d56.9484200464499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46eecfb0e5073ded%3A0x400cfcd68f2fe30!2sRiga%2C+Latvia!5e0!3m2!1sen!2sbd!4v1550835159592" allowfullscreen=""></iframe>
      </div>
    </div>
      <Footer/>
    </>
  )
}

export default Contact
