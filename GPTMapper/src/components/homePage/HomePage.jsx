


import React, { useState } from 'react';
import './homePage.css';
import Header from '../header/Header';
import SingleGalleryItem from './SingleGalleryItem';
import Footer from '../footer/Footer';
import IMG1 from '../../assets/roadm.jpg';
import IMG2 from '../../assets/roadm2.jpg';
import IMG3 from '../../assets/roadm3.jpg';
import IMG4 from '../../assets/roadm4.jpg';
import IMG5 from '../../assets/roadm5.jpg';
import IMG6 from '../../assets/roadm6.jpg';

const HomePage = () => {
  function base64ToBlob(base64String) {
    const byteCharacters = atob(base64String);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
      const slice = byteCharacters.slice(offset, offset + 1024);
      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: 'image/jpeg' });
  }

  const [imageUrl, setImageUrl] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchPhotoData = async (topic) => {
    try {
      setLoading(true);
      const response = await fetch(`https://gptmapper.onrender.com/getRoadmap?topic=${topic}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      });
      const data = await response.json();
      const blob = base64ToBlob(data.photo);
      const url = URL.createObjectURL(blob);
      setImageUrl(url);
      showModal();
    } catch (error) {
      console.error('Error fetching photo data:', error);
    } finally {
      setLoading(false);
    }
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const [inputValue, setInputValue] = useState('');

  const handleButtonClick = () => {
    fetchPhotoData(inputValue);
  };

  return (
    <>
      <Header />
      <div className="home-area">
        <div className="big-container">
          <div className="middle-container">
            <div className="small-container">
              <h2>Hello, <br/> Need Guidance?</h2>
              <p>You reached the right place. We provide instant roadmaps essential to ace your career.</p>
              <div className="btn-container">
                <input className="btn-1" placeholder="Enter Topic" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                <button className="btn-2" onClick={handleButtonClick}>Get</button>
              </div>
            </div>
          </div>
        </div>
        <div className="roadmap_samples_container">
          <div className="left-side">
            <h3>Roadmap Samples</h3>
          </div>
          <div className="roadmap_samples_block">
            {loading ? <div className="loader">Loading...</div> : null}
            <SingleGalleryItem IMG={IMG1} />
            <SingleGalleryItem IMG={IMG2} />
            <SingleGalleryItem IMG={IMG3} />
            <SingleGalleryItem IMG={IMG4} />
            <SingleGalleryItem IMG={IMG5} />
            <SingleGalleryItem IMG={IMG6} />
          </div>
          <div className="view_more">
            <div className="view-more-inner">
              <a href="#" className="btna">View More</a>
            </div>
          </div>
        </div>
      </div>
      {modalVisible && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="close-icon" onClick={hideModal}>x</span>
            {loading ? (
              <div className="loader">Loading...</div>
            ) : (
              <img src={imageUrl} alt="Modal" className="modal-image" />
            )}
            <a href={imageUrl} download="modal_image.jpg" className="download-btn">Download</a>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default HomePage;
