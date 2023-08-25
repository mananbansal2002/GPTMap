import React from 'react';
import '../../App.css';

import Passion from '../passion/Passion';
import WhyChooseUs from '../whyChooseUs/WhyChooseUs';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Home from '../home/Home';
const About = () => {
  return (
    <div>

        <Header/>
        <Home/>
        <Passion/>
        <WhyChooseUs/>
        <Footer/>

    </div>



  );
}

export default About;
