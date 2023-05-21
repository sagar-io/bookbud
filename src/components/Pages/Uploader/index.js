import {useState, useEffect} from 'react'
import { withFirebase } from '../../Firebase/context'
import UploadForm from './UploadForm'

const FileUploader = (props) => { 
    const [file, setFile] = useState({
        eBookName: '',
        eBook: '',
        eBookCover: '',
    })
    let [progressLevel, setProgressLevel] = useState({
       eBookProgressLevel: 0,
       eBookCoverProgressLevel: 0,
       avgProgressLevel: 0
    })
    const [showProgressBar, setShowProgressBar] = useState(false)
    const [error, setError] = useState('')
    const eBookCoverSupportedType = ['.png', '.jpeg']
    // const [isUploaded, setIsUploaded] = useState(false)

    function handleFile(e) {
       if(e.target.name === 'eBook' && !e.target.files[0].type.includes('pdf')){
        setError('Only PDF format is supported for eBook')
        return
       }
       else if(e.target.name === 'eBookCover' && !eBookCoverSupportedType.includes(cutTheSuffix(e.target.files[0].type))){
        setError('Only PNG/JPEG format is supported for eBook Cover')
        return
       }
        setError(null)
        const iseBookName = e.target.name === 'eBookName'
        setFile(prev =>  ({...prev,[e.target.name]: iseBookName ? e.target.value : e.target.files[0]}))
    }
    function cutTheSuffix(name) {
      const cutRegex = /image\/|application\//
      const updatedName = name.replace(cutRegex, '.')
      return updatedName
    }
    async function handleUpload() {
       await props.firebase.uploadEBookFiles(file, setProgressLevel)

      // not working setIsUploaded(isUploaded)
    }

    useEffect(() => {
      if(file.eBook){
        Object.defineProperty(file.eBook, 'name', {
          writable: true,
          value: `${file.eBookName}${cutTheSuffix(file.eBook.type)}`
        })
      }
      if(file.eBookCover) {
        Object.defineProperty(file.eBookCover, 'name', {
          writable: true,
          value: `${file.eBookName}-cover${cutTheSuffix(file.eBookCover.type)}`
        })
      }
    }, [file.eBook, file.eBookCover])


    useEffect(() => {
      progressLevel.avgProgressLevel = (progressLevel.eBookProgressLevel + progressLevel.eBookCoverProgressLevel) / 2
      if(progressLevel.avgProgressLevel != 0 && progressLevel.avgProgressLevel != 100)
        setShowProgressBar(true)
      else 
        setShowProgressBar(false)
    }, [progressLevel])

  return (
    <>
    <UploadForm 
      file = {file}
      setFile = {setFile}
      handleFile = {handleFile}
      handleUpload = {handleUpload}
      error = {error}
    />

    {
      // !(progressLevel.avgProgressLevel == 0 || progressLevel.avgProgressLevel == 100)
      showProgressBar
      &&
      <progress className='progress-bar' value={progressLevel.avgProgressLevel} max="100" min="0"></progress>
    }
    
    </>
  )
}

export default withFirebase(FileUploader)