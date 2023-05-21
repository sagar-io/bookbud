import { testimonialsData } from './testimonialsData'
import HoverTestimonialFactory from './HoverTestimonialFactory'

const HoverTestimonials = () => {
  const hTestimonialsElements = testimonialsData.map((testimonialData, id)=>(
    <HoverTestimonialFactory 
    key = {id}
    id = {id}
    imgUrl = {testimonialData.imgUrl}
    heading = {testimonialData.heading}
    description = {testimonialData.description}
    country = {testimonialData.country}
    name = {testimonialData.name}
    />
  ))
  return (
    <div className='h-testimonials-container'>
        {hTestimonialsElements}
    </div>
  )
}

export default HoverTestimonials