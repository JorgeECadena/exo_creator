import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Amplify } from 'aws-amplify';
import awsmobile from './aws-exports.js';
import amplifyconfig from './amplifyconfiguration.json';
import awsconfig from './aws-exports.js'

Amplify.configure(amplifyconfig);
const existingConfig = Amplify.getConfig();
Amplify.configure({
  ...existingConfig,
  API: {
    ...existingConfig.API,
    REST: {
      ...existingConfig.API?.REST,
      "api": {
        endpoint: 'https://btfccxhaig.execute-api.us-east-2.amazonaws.com/dev',
        region: 'us-east-2'
      },
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
