import logo from './logo.svg';
import './App.css';
import AuthPanel from './AuthPanel';
import LanuageList from './LanuageList';
import ValidatedForm from './FormValidation';
import JokeFetch from './JokeFetcher';
import PostList from './PostList';

function App() {
  return (
    <div className="App">
      <AuthPanel/>
      < LanuageList/>
      < ValidatedForm/>

      {/* Day 11 */}
      <JokeFetch/>

      {/* Day 12 */}
      <PostList/>
    </div>
  );
}

export default App;

