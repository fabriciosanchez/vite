import React, { useState, useEffect, useRef, createContext, useContext } from 'react';

// --- Icon Components ---
// Using inline SVGs for simplicity and to avoid external imports.
const MicIcon = ({ className = 'w-6 h-6' }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
    <line x1="12" y1="19" x2="12" y2="22"></line>
  </svg>
);

const MicOffIcon = ({ className = 'w-6 h-6' }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="1" y1="1" x2="23" y2="23"></line>
    <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path>
    <path d="M17 16.95A7 7 0 0 1 5 12v-2"></path>
    <line x1="12" y1="19" x2="12" y2="22"></line>
  </svg>
);

const BrainIcon = ({ className = 'w-6 h-6' }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v0A2.5 2.5 0 0 1 14.5 2" />
    <path d="M14.5 2h0A2.5 2.5 0 0 0 12 4.5v0A2.5 2.5 0 0 0 9.5 2" />
    <path d="M12 17.5a2.5 2.5 0 0 0 2.5-2.5v-3a2.5 2.5 0 0 0-5 0v3a2.5 2.5 0 0 0 2.5 2.5Z" />
    <path d="M5 11a2.5 2.5 0 0 0-2.5-2.5v0A2.5 2.5 0 0 0 0 11" />
    <path d="M0 11v0a2.5 2.5 0 0 0 2.5 2.5v0A2.5 2.5 0 0 0 5 11" />
    <path d="M19 11a2.5 2.5 0 0 1 2.5-2.5v0A2.5 2.5 0 0 1 24 11" />
    <path d="M24 11v0a2.5 2.5 0 0 1-2.5 2.5v0A2.5 2.5 0 0 1 19 11" />
    <path d="M2.5 15.5a2.5 2.5 0 0 1 2.5-2.5v0a2.5 2.5 0 0 1 2.5 2.5" />
    <path d="M5 18a2.5 2.5 0 0 0 2.5-2.5v0A2.5 2.5 0 0 0 5 18" />
    <path d="M16.5 15.5a2.5 2.5 0 0 1 2.5-2.5v0a2.5 2.5 0 0 1 2.5 2.5" />
    <path d="M19 18a2.5 2.5 0 0 0 2.5-2.5v0A2.5 2.5 0 0 0 19 18" />
    <path d="M6 10V8c0-1.886.63-3.564 1.687-4.828" />
    <path d="M18 10V8c0-1.886-.63-3.564-1.687-4.828" />
  </svg>
);

const UserIcon = ({ className = 'w-6 h-6' }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const Volume2Icon = ({ className = 'w-6 h-6' }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
  </svg>
);

const ClockIcon = ({ className = 'w-6 h-6' }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const SendIcon = ({ className = 'w-6 h-6' }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);

const ArrowLeftIcon = ({ className = 'w-6 h-6' }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

// --- Audio & API Helper Functions ---

/**
 * Converts a base64 string to an ArrayBuffer.
 */
function base64ToArrayBuffer(base64) {
  try {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  } catch (error) {
    console.error("Error decoding base64 string:", error);
    return null;
  }
}

/**
 * Converts raw PCM audio data (as Int16Array) to a WAV file Blob.
 */
function pcmToWav(pcmData, sampleRate) {
  const numChannels = 1;
  const bitsPerSample = 16;
  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const dataSize = pcmData.length * (bitsPerSample / 8);
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);

  // RIFF header
  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true);
  writeString(view, 8, 'WAVE');

  // fmt chunk
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true); // Subchunk1Size (16 for PCM)
  view.setUint16(20, 1, true); // AudioFormat (1 for PCM)
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitsPerSample, true);

  // data chunk
  writeString(view, 36, 'data');
  view.setUint32(40, dataSize, true);

  // Write PCM data
  for (let i = 0; i < pcmData.length; i++) {
    view.setInt16(44 + i * 2, pcmData[i], true);
  }

  return new Blob([view], { type: 'audio/wav' });
}

/**
 * Helper to write a string to a DataView.
 */
function writeString(view, offset, string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}

/**
 * A wrapper for fetch that includes exponential backoff retry logic.
 */
const fetchWithRetry = async (url, options, retries = 3, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      // Do not retry on 4xx client errors (like 403 Forbidden), as they are unlikely to be resolved by a retry.
      if (response.status >= 400 && response.status < 500) {
        console.error(`Client error: ${response.status}. Aborting retries.`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`); // This will catch 5xx errors and trigger a retry.
      }
      return await response.json();
    } catch (error) {
      console.warn(`Attempt ${i + 1} failed: ${error.message}. Retrying in ${delay}ms...`);
      if (i < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2; // Exponential backoff for subsequent retries
      } else {
        console.error("All retry attempts failed.");
        throw error;
      }
    }
  }
};

// --- React Context for Global State ---
const AppContext = createContext();

// --- Main Application Component ---
export default function App() {
  const [page, setPage] = useState('config'); // 'config', 'interview', 'results'
  const [interviewConfig, setInterviewConfig] = useState(null);
  
  // This state will also hold the final transcript and feedback
  const [interviewData, setInterviewData] = useState({
    chatHistory: [],
    feedback: ""
  });

  const contextValue = {
    page,
    setPage,
    interviewConfig,
    setInterviewConfig,
    interviewData,
    setInterviewData
  };

  const renderPage = () => {
    switch (page) {
      case 'config':
        return <ConfigPage />;
      case 'interview':
        return <InterviewPage />;
      case 'results':
        return <ResultsPage />;
      default:
        return <ConfigPage />;
    }
  };

  return (
    <AppContext.Provider value={contextValue}>
      {/* The <style> tag was here. It has been removed.
        The font-family is now applied via src/index.css and index.html
        The inline style for font-family has also been removed.
      */}
      <div className="font-sans antialiased text-gray-900 bg-white">
        {renderPage()}
      </div>
    </AppContext.Provider>
  );
}

// --- 1. Configuration Page Component ---
function ConfigPage() {
  const { setPage, setInterviewConfig, setInterviewData } = useContext(AppContext);
  const [position, setPosition] = useState('');
  const [duration, setDuration] = useState(15);
  const [questionTypes, setQuestionTypes] = useState([]);
  const [error, setError] = useState('');

  const allQuestionTypes = ['Behavioral', 'Hypothetical', 'Technical', 'Skill-based'];
  const durationOptions = [
    { value: 5, label: "5 Minutes" }, 
    { value: 15, label: "15 Minutes" }, 
    { value: 30, label: "30 Minutes" }
  ];

  const handleTypeToggle = (type) => {
    setQuestionTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position.trim()) {
      setError('Please enter the position you are applying for.');
      return;
    }
    if (questionTypes.length === 0) {
      setError('Please select at least one question type.');
      return;
    }
    
    setError('');
    // Reset interview data for new session
    setInterviewData({ chatHistory: [], feedback: "" }); 
    setInterviewConfig({
      position,
      duration,
      questionTypes
    });
    setPage('interview');
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-white">
      <div className="w-full max-w-2xl p-8 space-y-8 bg-white rounded-2xl shadow-2xl border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          VITE Setup
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Position Input */}
          <div>
            <label htmlFor="position" className="block text-sm font-medium text-gray-600">
              Position You're Applying For
            </label>
            <input
              type="text"
              id="position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              placeholder="e.g., Senior Software Engineer"
              className="w-full px-4 py-3 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Question Types Checkboxes */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              What type of questions would you like to be asked?
            </label>
            <div className="grid grid-cols-2 gap-4 mt-2">
              {allQuestionTypes.map(type => (
                <label
                  key={type}
                  className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${
                    questionTypes.includes(type) ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                >
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={questionTypes.includes(type)}
                    onChange={() => handleTypeToggle(type)}
                  />
                  <span className="flex-grow">{type}</span>
                  <div className={`w-5 h-5 flex-shrink-0 border-2 rounded ${
                    questionTypes.includes(type) ? 'border-blue-300 bg-blue-600' : 'border-gray-400'
                  }`}>
                    {questionTypes.includes(type) && (
                      <svg viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z" />
                      </svg>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Duration Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Interview Duration
            </label>
            <div className="flex mt-2 space-x-4">
              {durationOptions.map(opt => (
                <label
                  key={opt.value}
                  className={`flex-1 p-3 text-center rounded-lg cursor-pointer transition-all ${
                    duration === opt.value ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="duration"
                    value={opt.value}
                    checked={duration === opt.value}
                    onChange={() => setDuration(opt.value)}
                    className="hidden"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>

          {error && (
            <p className="text-sm text-center text-red-600">{error}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-3 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white transition-all transform hover:scale-105"
          >
            Start Interview
          </button>
        </form>
      </div>
    </div>
  );
}

// --- 2. Live Interview Page Component ---
function InterviewPage() {
  const { interviewConfig, setPage, setInterviewData, interviewData } = useContext(AppContext);
  const [chatHistory, setChatHistory] = useState([]);
  const [status, setStatus] = useState('initializing'); // initializing, thinking, speaking, listening, finished, error
  const [timeLeft, setTimeLeft] = useState(interviewConfig.duration * 60);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [error, setError] = useState('');
  const [showTimeWarning, setShowTimeWarning] = useState(false);

  const recognitionRef = useRef(null);
  const audioQueueRef = useRef([]);
  const isSpeakingRef = useRef(false);
  const chatContainerRef = useRef(null);
  const audioContextRef = useRef(null);
  const initialPromptSentRef = useRef(false); // Ref to track if the first prompt has been sent

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY; // API key is handled by the environment

  // --- Speech Recognition (STT) Setup ---
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
      setStatus('finished');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript + ' ';
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      
      // Use a state updater function to correctly append to the previous transcript.
      // This is the key to preserving text across recognition restarts (e.g., after a pause).
      setCurrentTranscript(prevTranscript => {
        // Find the part of the previous transcript that is now final.
        const finalPart = prevTranscript.substring(0, prevTranscript.length - interimTranscript.length);
        return finalPart + finalTranscript + interimTranscript;
      });
    };

    recognition.onstart = () => {
      setStatus('listening');
    };

    recognition.onend = () => {
      // Only transition state if we are actively in the 'listening' state.
      // This prevents onend from firing after an error and causing a loop.
      if (status === 'listening') {
        // If recognition ends without a final result, go back to 'ready' state.
        setStatus('ready');
      }
    };
    
    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      // 'aborted' is often a benign error caused by programmatic stops.
      // 'no-speech' and 'network' are often transient, so we can try to recover.
      if (event.error === 'no-speech' || event.error === 'network' || event.error === 'aborted') {
        if (status === 'listening') {
          // Attempt to restart recognition after a short delay.
          // We do not call startListening() here because that would clear the current transcript.
          // Instead, we just restart the recognition engine directly.
          if (event.error !== 'aborted') recognitionRef.current?.stop(); // Don't stop if it's already aborted
          setTimeout(() => recognitionRef.current?.start(), 100); // Then restart quickly
        }
      } else if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        setError("Microphone access was denied. Please enable microphone permissions in your browser settings.");
      } else {
        setError(`An unexpected speech recognition error occurred: ${event.error}.`);
      }
    };

    recognitionRef.current = recognition;
  }, [status]); // Only re-run if status changes (to stop it)

  // --- Audio Playback (TTS) ---
  const processAudioQueue = async () => {
    if (isSpeakingRef.current || audioQueueRef.current.length === 0) {
      return;
    }

    isSpeakingRef.current = true;
    setStatus('speaking');
    const { audioData, mimeType } = audioQueueRef.current.shift();
    
    try {
      // The audio data is now coming directly from the getAINextQuestion call
      const sampleRate = parseInt(mimeType.match(/rate=(\d+)/)[1], 10) || 24000;
      const pcmData = base64ToArrayBuffer(audioData);
      if (!pcmData) {
        throw new Error("Failed to decode base64 audio data.");
      }
      
      const pcm16 = new Int16Array(pcmData);
      const wavBlob = pcmToWav(pcm16, sampleRate);
      const audioUrl = URL.createObjectURL(wavBlob);
      const audio = new Audio(audioUrl);
      
      audio.play();

      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
        isSpeakingRef.current = false;
        if (audioQueueRef.current.length > 0) {
          processAudioQueue();
        } else {
          // Finished speaking. Only start listening if the interview has actually started
          // (i.e., the interviewer has said something).
          // Set status to 'ready' to allow the user to click the mic button.
          if (status !== 'finished') {
            setStatus('ready');
          }
        }
      };
      
    } catch (err) {
      console.error("Error playing audio:", err);
      setError("An error occurred while playing the interviewer's voice.");
      isSpeakingRef.current = false;
      // Try to recover by listening
      startListening();
    }
  };
  
  const getTTSAudio = async (textToSpeak) => {
    // Use the dedicated TTS model endpoint
    const model = "gemini-2.5-flash-preview-tts";
    // The TTS endpoint is different from the text generation one.
    const apiUrl = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`;
    
    const payload = {
      input: {
        text: textToSpeak
      },
      voice: {
        languageCode: 'en-US',
        name: 'en-US-Studio-O' // A professional and clear voice. "Puck" is not a valid voice here.
      },
      audioConfig: {
        audioEncoding: 'LINEAR16' // This is raw PCM data
      }
    };

    try {
      const result = await fetchWithRetry(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (result.audioContent) {
        return { data: result.audioContent, mimeType: 'audio/l16; rate=24000' };
      } else {
        throw new Error("Invalid TTS response structure from API (missing audioContent).");
      }
    } catch (err) {
      console.error("TTS API Error:", err);
      setError("Failed to generate audio for the interviewer.");
      return null;
    }
  };

  const addMessageToQueue = (text, role) => {
    const newMessage = { role, text };
    setChatHistory(prev => [...prev, newMessage]);
  };

  // --- Effects ---

  // Start interview on mount
  useEffect(() => {
    // This ref-based guard prevents the effect from running twice in StrictMode,
    // which would cause the "no content" error on the second run.
    if (initialPromptSentRef.current) return;
    initialPromptSentRef.current = true;
    getAINextQuestion(); // Get first question
    
  }, []);

  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0) {
      setShowTimeWarning(false); // Ensure the warning banner is hidden when time is up.
      endInterview();
      return;
    }
    if (status === 'finished') return;

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, status]);

  // Auto-scroll chat
  useEffect(() => {
    // The timeout ensures this runs after the DOM has been updated with the new message.
    if (chatContainerRef.current) {
      setTimeout(() => {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }, 0);
    }
  }, [chatHistory]);

  // Effect for time warning notification
  useEffect(() => {
    // Trigger when exactly 1 minute is left
    if (timeLeft === 60) {
      setShowTimeWarning(true);
      // Hide the notification after 10 seconds
      const warningTimer = setTimeout(() => {
        setShowTimeWarning(false);
      }, 10000);
      return () => clearTimeout(warningTimer); // Clear the timer on unmount
    }
  }, [timeLeft]);

  // --- Interview Logic ---
  const startListening = () => {
    if (recognitionRef.current && status !== 'listening' && status !== 'finished') {
      try {
        // We no longer clear the transcript here. It's cleared only after a response is sent.
        // This allows the user to continue speaking after a pause.
        // setCurrentTranscript(''); 
        recognitionRef.current.start();
      } catch(e) {
        // Handle case where it might already be started
        console.warn("Recognition already started.", e.message);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && status === 'listening') {
      recognitionRef.current.stop();
      setStatus('thinking'); // Move to thinking after stopping
    }
  };

  const handleUserResponse = (text) => {
    if (!text.trim()) return;

    // This function is now only called when the user explicitly stops listening
    // or the timer runs out, ensuring we have the full response.
    const fullResponse = text.trim();

    stopListening(); // Stop listening
    setCurrentTranscript(''); // Clear interim
    addMessageToQueue(text, 'candidate');
    
    // Get AI's next question
    getAINextQuestion(text);
  };
  
  const getAINextQuestion = async (userAnswer = null, isRetry = false) => {
    setStatus('thinking');
    setError(''); // Clear previous errors on a new attempt
    
    const { position, duration, questionTypes } = interviewConfig;
    let systemPrompt;

    // Use a detailed prompt for the first turn, and a simpler one for follow-ups.
    if (chatHistory.length === 0) {
      systemPrompt = `You are "Alex", a professional, friendly, and insightful virtual interviewer. You are conducting an interview for a ${position} position. The interview is ${duration} minutes long and must focus on ${questionTypes.join(', ')} questions.
      
      Your primary role is to conduct the interview. Follow these rules:
      1.  Ask one question at a time.
      2.  Your questions must align with the requested question types.
      3.  Listen to the candidate's answer, then ask a logical follow-up question or transition to a new topic.
      4.  Keep your responses concise and conversational.
      5.  Do not say "Great." or "Thanks for sharing." too often. Vary your transitions.
      6.  Maintain a professional and encouraging tone.
      7.  Do not add any prefix like "Interviewer:" or "Alex:". Just provide your response.`;
    } else {
      systemPrompt = `You are "Alex", the interviewer. Ask the next logical question based on the conversation. Be concise and do not use prefixes.`;
    }

    const model = "gemini-2.5-flash-preview-05-20";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const contents = chatHistory.map(msg => ({
      role: msg.role === 'interviewer' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));
    
    // Manually add the latest user answer to the contents for the API call.
    // This is necessary because the chatHistory state update is asynchronous.
    if (userAnswer) {
      contents.push({
        role: 'user',
        parts: [{ text: userAnswer }]
      });
    }
    // If this is the first turn, add the initial prompt.
    if (contents.length === 0) {
      contents.push({
        role: 'user',
        parts: [{ text: `Hello, please begin the interview. Start with a brief welcome and your first question.` }]
      });
    }
    const payload = {
      contents: contents,
      systemInstruction: { role: "system", parts: [{ text: systemPrompt }] },
      generationConfig: {
        // Increased token limit to prevent 'MAX_TOKENS' finish reason.
        maxOutputTokens: 1024,
      }
    };

    try {
      const result = await fetchWithRetry(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const responseText = result.candidates?.[0]?.content?.parts?.[0]?.text;
      if (responseText) {
        addMessageToQueue(responseText, 'interviewer');
        const audio = await getTTSAudio(responseText);
        if (audio) {
          audioQueueRef.current.push({
            audioData: audio.data,
            mimeType: audio.mimeType
          });
          processAudioQueue();
        }
      } else {
        console.error("Invalid response structure from LLM. The API did not return any text. Full response:", result);
        throw new Error(`No text response from model. Finish reason: ${result?.candidates?.[0]?.finishReason}`);
      }
    } catch (err) {
      console.error("LLM API Error:", err);
      setError("The interviewer is having trouble thinking. Please wait a moment.");
      setTimeout(() => getAINextQuestion(userAnswer, true), 3000);
    }
  };
  
  const endInterview = async () => {
    setStatus('finished'); // Immediately disable buttons and show feedback generation message
    stopListening();
    audioQueueRef.current = [];
    isSpeakingRef.current = false;
    if (audioContextRef.current) {
        audioContextRef.current.close();
    }
    
    const finalMessage = "That's all the time we have. Thank you for your time. I'm now compiling your feedback and will redirect you to the results page shortly.";
    setChatHistory(prev => [...prev, {role: 'interviewer', text: finalMessage}]);
    
    const { position } = interviewConfig;
    const systemPrompt = `You are "Alex", the virtual interviewer. The interview is now over. Your task is to provide comprehensive, constructive, and encouraging feedback to the candidate based on the entire transcript. The candidate was applying for a ${position} role. Format your feedback in Markdown: - **Overall Summary:** A brief paragraph on your overall impression. - **Strengths:** 2-3 bullet points on what the candidate did well. - **Areas for Improvement:** 2-3 bullet points on specific areas to work on with actionable advice. - **Concluding Encouragement:** End on a positive, encouraging note.`;

    const model = "gemini-2.5-flash-preview-05-20";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const transcript = chatHistory.map(msg => `${msg.role === 'user' ? 'Candidate' : 'Interviewer'}: ${msg.text}`).join('\n\n');
    const contents = [{ role: 'user', parts: [{ text: `Here is the full interview transcript:\n\n${transcript}\n\nPlease provide your feedback.` }] }];

    const payload = { contents, systemInstruction: { role: "system", parts: [{ text: systemPrompt }] } };

    try {
      const result = await fetchWithRetry(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const feedbackText = result.candidates?.[0]?.content?.parts?.[0]?.text;
      if (feedbackText) {
        setInterviewData({ chatHistory, feedback: feedbackText });
        setPage('results');
      } else {
        throw new Error("No feedback response from model.");
      }
    } catch (err) {
      console.error("Feedback LLM Error:", err);
      setInterviewData({ chatHistory, feedback: "Sorry, an error occurred while generating your feedback." });
      setPage('results');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Time Warning Notification */}
      {showTimeWarning && (
        <div className="absolute top-0 left-0 right-0 z-50 p-3 text-center text-white bg-yellow-500 shadow-lg animate-pulse">
          <div className="flex items-center justify-center">
            <ClockIcon className="w-5 h-5 mr-2" />
            <p className="font-semibold">1 minute remaining</p>
          </div>
        </div>
      )}
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-gray-200 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-gray-900">{interviewConfig.position}</h1>
          <p className="text-sm text-gray-500">Virtual Interview</p>
        </div>
        <div className="flex items-center p-2 space-x-2 bg-gray-100 rounded-lg">
          <ClockIcon className="text-blue-500" />
          <span className="text-lg font-medium text-gray-800">{formatTime(timeLeft)}</span>
        </div>
      </header>

      {/* Chat Area */}
      <main ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto space-y-4 bg-white">
        {chatHistory.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
        {/* Show interim transcript */}
        {status === 'listening' && currentTranscript && (
           <div className="flex justify-end">
            <div className="p-3 text-white bg-blue-600 rounded-lg max-w-lg opacity-70">
              {currentTranscript}...
            </div>
           </div>
        )}
      </main>

      {/* Status & Control Bar */}
      <footer className="p-4 bg-gray-100 border-t border-gray-200">
        {error && <p className="mb-2 text-sm text-center text-red-600">{error}</p>}
        
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={() => setPage('config')}
            disabled={status === 'finished'}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Back to Config
          </button>
          
          {/* Main Control Button */}
          <MicButton status={status} onStart={startListening} onStop={() => handleUserResponse(currentTranscript)} />

          <button
            onClick={endInterview}
            disabled={status === 'finished'}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            End Interview
          </button>
        </div>
        
        {/* Status Indicator */}
        <p className="mt-3 text-sm text-center text-gray-500 capitalize">
          {status === 'listening' && 'Listening... Speak now.'}
          {status === 'thinking' && 'Interviewer is thinking...'}
          {status === 'speaking' && 'Interviewer is speaking...'}
          {status === 'initializing' && 'Initializing interview...'}
          {status === 'finished' && 'Interview finished. Generating feedback...'}
          {status === 'ready' && 'Ready for your response.'}
        </p>
      </footer>
    </div>
  );
}

// Sub-component for the Microphone Button
function MicButton({ status, onStart, onStop }) {
  const [hasSpoken, setHasSpoken] = useState(false);
  
  if (status === 'listening') {
    return (
      <button
        onClick={onStop}
        title="Stop and send response"
        className="flex flex-col items-center justify-center w-16 h-16 text-white bg-blue-600 rounded-full shadow-lg transition-all transform hover:scale-110 focus:outline-none"
      >
        <SendIcon className="w-7 h-7" />
        <span className="text-xs">Send</span>
      </button>
    );
  }

  if (status === 'speaking' || status === 'thinking' || status === 'initializing' || status === 'finished') {
    return (
      <button
        disabled
        className="flex flex-col items-center justify-center w-16 h-16 text-gray-500 bg-gray-200 rounded-full cursor-not-allowed shadow-inner"
      >
        <MicOffIcon className="w-7 h-7" />
        <span className="text-xs">Wait</span>
      </button>
    );
  }
  
  // Default: Ready to listen (status is 'ready' or another unhandled state)
  return (
    <button
      onClick={onStart}
      title="Tap to speak"
      className="flex flex-col items-center justify-center w-16 h-16 text-white bg-green-600 rounded-full shadow-lg transition-all transform hover:scale-110 focus:outline-none animate-pulse"
    >
      <MicIcon className="w-7 h-7" />
      <span className="text-xs">Speak</span>
    </button>
  );
}

// Sub-component for Chat Messages
function ChatMessage({ message }) {
  const { role, text } = message;
  const isInterviewer = role === 'interviewer';

  return (
    <div className={`flex items-start space-x-3 ${isInterviewer ? 'justify-start' : 'justify-end'}`}>
      {isInterviewer && (
        <div className="flex-shrink-0 p-2 bg-gray-200 rounded-full">
          <BrainIcon className="w-5 h-5 text-blue-500" />
        </div>
      )}
      <div
        className={`p-4 rounded-xl max-w-lg ${
          isInterviewer
            ? 'bg-gray-200 text-gray-800 rounded-tl-none'
            : 'bg-blue-600 text-white rounded-tr-none'
        }`}
      >
        <p className="text-sm" style={{ whiteSpace: 'pre-wrap' }}>{text}</p>
      </div>
      {!isInterviewer && (
        <div className="flex-shrink-0 p-2 bg-gray-200 rounded-full">
          <UserIcon className="w-5 h-5 text-green-500" />
        </div>
      )}
    </div>
  );
}


// --- 3. Results Page Component ---
function ResultsPage() {
  const { setPage, interviewData, interviewConfig } = useContext(AppContext);
  const { chatHistory, feedback } = interviewData;

  const handleCopyToClipboard = (text) => {
    // Uses document.execCommand for iFrame compatibility
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      // Using a simple browser alert as custom modals are complex for this scope
      window.alert('Copied to clipboard!'); 
    } catch (err) {
      console.error('Failed to copy text: ', err);
      window.alert('Failed to copy.');
    }
    document.body.removeChild(textArea);
  };
  
  const transcriptText = chatHistory
    .map(msg => `${msg.role === 'interviewer' ? 'Interviewer' : 'Candidate'}: ${msg.text}`)
    .join('\n\n');

  // A simple markdown to HTML converter for the feedback
  const formatFeedback = (text) => {
      if (!text) return "";
      return text
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
          .replace(/-\s(.*?)(?=\n-|\n\n|$)/g, '<li class="ml-4">$1</li>') // Bullets
          .replace(/<li/g, '<ul><li') // Wrap LIs in ULs (simple version)
          .replace(/<\/li>(?!<li)/g, '</li></ul>') // Close ULs
          .replace(/\n/g, '<br />'); // Newlines
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Interview Report</h1>
          <button
            onClick={() => setPage('config')}
            className="flex items-center justify-center px-4 py-2 mt-4 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all md:mt-0"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Start New Interview
          </button>
        </div>
        
        <p className="text-lg text-gray-600 mb-6">
          Here is the feedback for your interview for the <strong className="font-semibold text-gray-900">{interviewConfig.position}</strong> position.
        </p>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Column 1: Feedback */}
          <div className="lg:col-span-2 p-6 bg-gray-50 rounded-2xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Performance Feedback
            </h2>
            <div
              className="prose prose-sm sm:prose-base max-w-none text-gray-700"
              style={{'--tw-prose-bullets': '#4f46e5'}}
              dangerouslySetInnerHTML={{ __html: formatFeedback(feedback) }}
            />
             <button
              onClick={() => handleCopyToClipboard(feedback)}
              className="px-4 py-2 mt-6 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Copy Feedback
            </button>
          </div>

          {/* Column 2: Transcript */}
          <div className="lg:col-span-1 p-6 bg-gray-50 rounded-2xl shadow-lg border border-gray-200 h-full">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Full Transcript
            </h2>
            <div className="h-96 overflow-y-auto pr-2 space-y-4" style={{maxHeight: '60vh'}}>
              {chatHistory.map((msg, index) => (
                <div key={index} className={`flex flex-col ${msg.role === 'candidate' ? 'items-end' : 'items-start'}`}>
                  <span className={`text-xs font-medium mb-1 ${msg.role === 'candidate' ? 'text-green-600' : 'text-blue-600'}`}>
                    {msg.role === 'candidate' ? 'You' : 'Interviewer'}
                  </span>
                  <p className="text-sm p-3 rounded-lg bg-gray-200 text-gray-800">
                    {msg.text}
                  </p>
                </div>
              ))}
            </div>
             <button
              onClick={() => handleCopyToClipboard(transcriptText)}
              className="w-full px-4 py-2 mt-4 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Copy Transcript
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}