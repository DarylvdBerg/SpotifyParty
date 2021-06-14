import './App.scss';
import Login from './view/Login';
import PlayListOverview from './view/PlayListOverview'
require('dotenv').config();

const authCode = new URLSearchParams(window.location.search).get('code');

function App() {
  return authCode ? <PlayListOverview code={authCode}></PlayListOverview> : <Login/>
}

export default App;
