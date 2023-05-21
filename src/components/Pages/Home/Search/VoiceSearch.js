import { HiOutlineMicrophone } from "react-icons/hi";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useState, useEffect } from "react";

export const VoiceSearch = ({ setSearchQuery }) => {
  const [showPrompt, setShowPrompt] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript, 
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  return (
    <div>
      {     
      browserSupportsSpeechRecognition 
      &&
      <HiOutlineMicrophone
        className="speech-icon"
        onClick={() => {
          setShowPrompt(true);
          SpeechRecognition.startListening();
        }}
      />}
      {showPrompt && (
        <VoicePromt
          listening={listening}
          transcript={transcript}
          submitVoiceSearch={submitVoiceSearch}
          SpeechRecognition={SpeechRecognition}
          setSearchQuery={setSearchQuery}
        />
      )}
    </div>
  );

  function submitVoiceSearch() {
    setShowPrompt(false);
    setSearchQuery(transcript);
    SpeechRecognition.stopListening();
    resetTranscript();
  }
};

const VoicePromt = ({ listening, transcript, setSearchQuery, submitVoiceSearch, SpeechRecognition }) => {
  useEffect(() => {
    SpeechRecognition.startListening()
    const timeOut = setTimeout(() => {setSearchQuery(transcript); submitVoiceSearch()}, 4000)
    return () => {
      clearTimeout(timeOut)
    }
  }, [])
  
  return (
  <div className="voice-search-prompt">
    <p>{transcript}</p>
    <Listening />
    <button className="btn-y" onClick={submitVoiceSearch}>
      Search
    </button>
  </div>
  );
}

const Listening = () => (
  <div className="listen-wrapper">
    <div className="dot-container">
       <div className="bl"></div>
       <div className="rd"></div>
       <div className="ylw"></div>
       <div className="grn"></div>
    </div>
    <p>Listening...</p>
  </div>
);