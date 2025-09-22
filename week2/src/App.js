import logo from './logo.svg';
import './App.css';
import AuthPanel from './AuthPanel';
import LanuageList from './LanuageList';
import ValidatedForm from './FormValidation';

function App() {
  return (
    <div className="App">
      <AuthPanel/>
      < LanuageList/>
      < ValidatedForm/>
    </div>
  );
}

export default App;

