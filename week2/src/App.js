import logo from './logo.svg';
import './App.css';
import AuthPanel from './AuthPanel';
import LanuageList from './LanuageList';
import ValidatedForm from './FormValidation';
import JokeFetch from './JokeFetcher';

function App() {
  return (
    <div className="App">
      <AuthPanel/>
      < LanuageList/>
      < ValidatedForm/>

      {/* Day 11 */}
      <JokeFetch/>
    </div>
  );
}

export default App;

