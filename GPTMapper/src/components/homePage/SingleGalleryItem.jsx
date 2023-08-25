import React, {useState} from 'react'
import './singleGalleryItem.css'
import Tree from '../../assets/roadm.jpg'
import IMG2 from '../../assets/2.jpg'

const SingleGalleryItem = ({IMG}) => {

  return (
    <div className='single-item'>
      <div className='single-portfolio-content'>
        <img src={IMG} alt='tree'/>
        <div class="hover-content">
            <a href={Tree} class="portfolio-img" >+</a>
        </div>
      </div>
      
    </div>

    

  )
}

export default SingleGalleryItem
