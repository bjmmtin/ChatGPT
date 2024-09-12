import { useChatStore } from "@/app/store/store";
import React, { useEffect, useState } from "react";

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  0: SpeechRecognitionAlternative;
  length: number;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognition extends EventTarget {
  new (): SpeechRecognition;
  continuous: boolean;
  interimResults: boolean;
  start(): void;
  stop(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onend: () => void;
}

interface Props {
  inputPrompt: string;
  setInputPrompt: (str: string) => void;
}

const VoiceRecognition = () => {
  const { setInputPrompt } = useChatStore();

  /*
   Keeps track of whether the speech recognition is currently listening for speech 
  */
  const [isListening, setIsListening] = useState<boolean>(false);

  /*
    Holds the instance of the SpeechRecognition object. 
    Initially, it's set to null because we don’t know if the browser supports it yet.
  */
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null,
  );

  useEffect(() => {
    // Check if the browser supports SR
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      //If SpeechRecognition is supported a new instance of SR is created
      const recognitionInstance = new SpeechRecognition();
      //shouldn't stop after one sentence or pause
      recognitionInstance.continuous = true;
      //display live speech results before the user finishes speaking
      recognitionInstance.interimResults = true;

      recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
        //contains all the recognized speech results
        const currentTranscript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join(" ");
        setInputPrompt(currentTranscript); // updated speech-to-text result
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    } else {
      console.error("SpeechRecognition not supported in this browser.");
    }
  }, [setInputPrompt]);

  const startListening = () => {
    if (recognition) {
      recognition.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  return (
    <>
      <div
        className="pl-3 pt-1.5"
        onClick={isListening ? stopListening : startListening}
      >
        {isListening ? (
          <svg
            className="icon--SJP_d icon--Qz6Ts"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 20 20"
          >
            <g>
              <g fill="currentColor" data-follow-fill="#545C66">
                <path
                  d="M5.938 5.313a4.062 4.062 0 1 1 8.125 0V8.75a4.062 4.062 0 1 1-8.126 0V5.312Z"
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                ></path>
                <path
                  d="M3.36 7.813c.43 0 .78.35.78.78v.157a5.86 5.86 0 0 0 11.72 0v-.156a.781.781 0 0 1 1.562 0v.156a7.422 7.422 0 0 1-14.844 0v-.156c0-.432.35-.781.781-.781Z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>
                <path d="M9.219 15.469a.781.781 0 1 1 1.562 0v2.5a.781.781 0 1 1-1.562 0v-2.5Z"></path>
              </g>
            </g>
          </svg>
        ) : (
          <svg
            className="icon--SJP_d"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 256 256"
          >
            <g>
              <path
                fill="currentColor"
                d="M76 73c0-28.719 23.281-52 52-52s52 23.281 52 52v44c0 28.719-23.281 52-52 52s-52-23.281-52-52V73Zm52-32c-17.673 0-32 14.327-32 32v44c0 17.673 14.327 32 32 32 17.673 0 32-14.327 32-32V73c0-17.673-14.327-32-32-32Zm-85 64c5.523 0 10 4.477 10 10v2c0 41.421 33.579 75 75 75s75-33.579 75-75v-2c0-5.523 4.477-10 10-10s10 4.477 10 10v2c0 49.09-37.233 89.483-85 94.48V225c0 5.523-4.477 10-10 10s-10-4.477-10-10v-13.52c-47.767-4.997-85-45.39-85-94.48v-2c0-5.523 4.477-10 10-10Z"
                clipRule="evenodd"
                fillRule="evenodd"
                data-follow-fill="#000"
              ></path>
            </g>
          </svg>
        )}
      </div>
    </>
  );
};

export default VoiceRecognition;
