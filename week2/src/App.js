import logo from './logo.svg';
import './App.css';
import AuthPanel from './AuthPanel';
import LanuageList from './LanuageList';
import ValidatedForm from './FormValidation';
import JokeFetch from './JokeFetcher';
import PostList from './PostList';
import ProductCard from './components/ProductCard/ProductCard';
import ProductCardStyled from './components/ProductCard/ProductCardStyled';

function App() {
  return (
    <div className="App">

      {/* 
      <AuthPanel/>
      < LanuageList/>
      < ValidatedForm/>

      <JokeFetch/>

        <PostList/>  
      */}


{/* day 13 */}

    <ProductCard title="Protein" price={9000} inStock={true} />
    <ProductCard title="Cake" price={90} inStock={false} specialOffer={true}/>
    <ProductCardStyled title="Cookies" price={90} inStock={false} />
    <ProductCardStyled title="Cake" price={90} inStock={false}  />
    </div>
  );
}

export default App;

