import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import SpotifyWebApi from 'spotify-web-api-js';
export const spotifyApi = new SpotifyWebApi();



ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
