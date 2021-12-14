import React, { useState } from 'react';
import  useSpeechRecognition  from '../../src/useSpeechRecognition';
import { Container } from './shared';
import styled from "styled-components";
import { Button } from 'primereact/button';
import Alert from '@material-ui/lab/Alert';
import Gallery from './gallery'
const languageOptions = { label: 'English', value: 'en-AU' }


const Example = () => {
  const [lang, setLang] = useState('en-AU');
  const [value, setValue] = useState('');
  const [blocked, setBlocked] = useState(false);
  const [msg, setmsg] = useState('retry with the right value');

  const onEnd = () => {
    // You could do something here after listening has finished
    if(value=='spring' || value=='summer' | value=='autumn' | value=='winter')
    console.log('good')
    else

    console.log('retry with the right value')
  };

  const onResult = (result) => {
    setValue(result);
    console.log()
  };

  const changeLang = (event) => {
    setLang(event.target.value);
  };

  const onError = (event) => {
    if (event.error === 'not-allowed') {
      setBlocked(true);
    }
  };

  const { listen, listening, stop, supported } = useSpeechRecognition({
    onResult,
    onEnd,
    onError,
  });

  const toggle = listening
    ? stop
    : () => {
        setBlocked(false);
        listen({ lang });
      };

  return (
   
      <form /*id="speech-recognition-form"*/>
      
        {!supported && (
          <p>
            Oh no, it looks like your browser doesn&#39;t support Speech
            Recognition.
           
          </p>
        )}
        {supported && (
          <>
            <p>
              {`autumn|spring|summer|winter`}
            </p>
            <label htmlFor="language">{languageOptions.label}</label>{/**latence blech biha */}
            
          
            <label htmlFor="transcript"></label>
            <input
              id="transcript"
              name="transcript"
              placeholder="..."
              value={value}
              rows={3}
              disabled
            />
          
           
            <Button style={{left:'10'+'%' }} disabled={blocked} type="button" onClick={toggle}>
              {listening ? 'Stop' : 'Speak'}
            </Button>
           
      {(() => {
       if(value=='spring' || value=='summer' | value=='autumn' | value=='winter'){
          return (
            <>
           <Alert severity="success">Correct !</Alert>
  
      
            </>
          )
        }  
        else if(value===''){
          return (
            <h1></h1>
          )
        }

        else {
          return (
            
            <Alert severity="error">Please retry with the right season !</Alert>
          )
        }
      })()}
   
        
            {blocked && (
              <p style={{ color: 'red' }}>
                The microphone is blocked for this site in your browser.
              </p>
            )}
          </>
        )}
      </form>
      
    //<Container></Container>
  );
};


export default Example;
