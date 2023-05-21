import EBook from '../../Home/EBooks/EBook'
import {ebooksList} from '../../Home/EBooks/ebooksData'

const FeaturedBooks = () => {
  const ebookElements = ebooksList.map((ebook, id) => {
    if(ebook.tags.includes('best')){
      return <EBook 
      key = {id}
      imgUrl = {ebook.imgUrl}
      title = {ebook.title}
      downloadAddress = {ebook.downloadAddress}
      categories= {ebook.categories}
      /> 
    }
})
  return (
    <div className='hidden standard best-ebooks-container'>
      <h1>Best Collection</h1>
      <h4 >We've best collection of Books !</h4>
      <div className='all-ebooks best-ebooks'>
          {ebookElements}
      </div>
    </div>
  )
}

export default FeaturedBooks