import React, { useState } from 'react';
import './App.scss';
const axios = require('axios')

function App() {
  const [inputUrl, updateInput] = useState("")
  const [shortUrl, updateShortUrl] = useState("")


  function handleSubmit(e) {
    e.preventDefault()
    //send input url to api
    sendUrl(inputUrl)
  }

  async function sendUrl(longUrl) {
    const token = '2b07d6efc3191a9524120a2999b7bc37a7143fd4';
  
    // define confiig
    const config = {
      headers: {	  
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` }
    };
    
    try {
    // send request to bitly
      const response = await axios.post('https://api-ssl.bitly.com/v4/shorten', { 
        "long_url": longUrl 
      }, config)

      return updateShortUrl(response.data.link);
    }
    catch(err) {
      console.log(err)
      const errorLog = `Error Code: ${err.response.status} - ${err.response.data.description}`
      return updateShortUrl(errorLog)
    }
  }

  return (
    <div className="App">
      <div>
        <h1>Hello World</h1>
        <h2>Lets shorten your URL</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <input onChange={(e) => updateInput(e.target.value)} value={inputUrl}/>
        <button disabled={inputUrl.length === 0} type="submit">Submit</button>
      </form>

      {shortUrl && displayShortUrl(shortUrl)}
    </div>
  );
}

function displayShortUrl(shortUrl) {
  return (
    <div>
      <p>Short URL in State:</p>
      <p>{shortUrl}</p>
    </div>
  )
}

export default App;
