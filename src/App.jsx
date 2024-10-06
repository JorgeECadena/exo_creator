import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { get } from 'aws-amplify/api';

const API = 'nodeApi';
const path = '/node';

const App = () => {

  async function getMessage() {
    try {
      const restOp = get({
        apiName: API,
        path: path,
      });

      const { body } = await restOp.response;
      const message = await body.json();

      console.log("GET operation successful: ", message);
    } catch(e) {
      console.log(e);
    }
  }

  return (
    <div className="App">
      <h1>YA FUNCIONA POR FAVOR</h1>
      <button onClick={ () => getMessage()}>Test</button>
    </div>
  )
}

export default App
