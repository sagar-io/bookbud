import { useNavigate } from 'react-router-dom'
import * as ROUTES from '../../../../constants/routes'
import {useRef} from 'react'

const HeroSection = () => {
  const navigateTo = useNavigate()
  const bgRef = useRef()

  function handleGetStarted() {
      navigateTo(ROUTES.SIGN_IN)
  }
  function handleHoverOnBG(e) {
    bgRef.current.style.backgroundPositionX = -e.clientX/2+"px"
    bgRef.current.style.backgroundPositionY = -e.clientY/2+"px"
  }

  return (
    <div className='hero-section' ref={bgRef} onMouseMove={handleHoverOnBG}>
        <div className='hero-text'>
         <p className='hero-description'>Choosing "eBook Store" can allow you to read the best selling books which are being written by some of the most popular authors. Apart from the numerous advantages of choosing us, most important advantage is that <span className='highlight'>All eBooks are free of cost</span></p>
        </div>
        <button className='start-btn btn-x' onClick={handleGetStarted}>Get Started &#8594;</button>
    </div>
  )
}

export default HeroSection