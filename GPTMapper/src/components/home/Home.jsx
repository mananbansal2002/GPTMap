import React from 'react'
import './home.css';
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div className='section-1-outer'>
      <div className='section-1-inner'>

      <div>
        <h2>About Us</h2>
      </div>
      <div>
        <ol>
            
            <li><Link to='/'><i class="icon_house_alt"></i> Home‎ ‎ &gt; </Link></li>
            <li> ‎ ‎ About</li>
        </ol>
    </div>
      </div>
    </div>
  )
}

export default Home
