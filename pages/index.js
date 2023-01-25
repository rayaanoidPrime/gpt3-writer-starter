import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';

const Home = () => {

  const [userInput , setUserInput] = useState('');
  const [gptOutput ,setGptOutput] = useState('');
  const [isGenerating , setIsGenerating] = useState(false);

  const callGenerateEndPoint = async()=>{
    console.log("Calling Api..");

    setIsGenerating(true);
    const response = await fetch('/api/generate' , {
      method : 'POST',
      headers : {
        'Content-Type': 'application/json'
      },
      body : JSON.stringify({ userInput })
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied..." , output.text);

    setGptOutput(`${output.text}`);
    setIsGenerating(false);
  }


  const onInputChange = (e)=>{
    setUserInput(e.target.value);
  };

    return (
    <div className="root">
      <Head>
        <title>Bumble Rizzer by Rayaan</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Rizz up your Bumble game</h1>
          </div>
          <div className="header-subtitle">
            <h2>Enter instructions according to your rizzing desires</h2>
          </div>
        </div>
        <div className='prompt-container'>
          <textarea placeholder='Start typing...' className='prompt-box' value={userInput} onChange={onInputChange} ></textarea>
          <div className='prompt-buttons'>
            <a className={isGenerating? 'generate-button loading' : 'generate-button'} onClick={isGenerating? null : callGenerateEndPoint}>
              <div className='generate'>
                {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
              </div>
            </a>
          </div>
        </div>
      {gptOutput && (
         <div className='output'>
            <div className='output-header-container'>
              <div className='output-header'>
                <h3>Output</h3>
              </div>
            </div>
            <div className='output-content'>
              <p>{gptOutput}</p>
            </div>
         </div>
      )}
      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
