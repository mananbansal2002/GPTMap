import React from 'react'
import '../../App.css';
import './whyChooseUs.css'

const WhyChooseUs = () => {
  return (
    <div>
      <section className='section-3'>
            <div className='choose'>
                <div className='heading'>
                    <h1>Why Choose Us ? </h1>
                </div>
                <div className='choose-container'>
                    <div className='single-container-outer'>
                        <div className='single-container'>
                            <div class="chosse-us-icon">
                                <i class="fa fa-film" aria-hidden="true"></i>
                            </div>
                            <h4>AI-Powered Brilliance</h4>
                            <p>Experience the ease of creating powerful roadmaps with our user-friendly interface enhanced by AI technology. Unlock your potential and chart a clear course towards success.</p>
                        </div>
                    </div>
                    <div className='single-container'>
                            <div class="chosse-us-icon">
                                <i class="fa fa-film" aria-hidden="true"></i>
                            </div>
                            <h4>Intuitive UI</h4>
                            <p>Explore the endless possibilities of roadmap creation through our intuitive user interface powered by cutting-edge AI. Easily visualize your goals and navigate your journey with confidence.</p>
                    </div>
                    <div className='single-container'>
                            <div class="chosse-us-icon">
                                <i class="fa fa-film" aria-hidden="true"></i>
                            </div>
                            <h4>On-Demand Guidance</h4>
                            <p>Receive instant AI-driven suggestions and recommendations to enhance your roadmap, ensuring it aligns with your goals and objectives.</p>
                    </div>
                </div>
            </div>
        </section>
        
    </div>
  )
}

export default WhyChooseUs
