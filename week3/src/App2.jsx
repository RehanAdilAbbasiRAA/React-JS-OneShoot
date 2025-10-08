import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import App2 from './components/Day15Routing';
import App3 from './components/Day15Ex';

import Day16NestedRouting from './components/Day16NestedRouting';
import Day16Layout from './components/Day16Layout';
import Day16NoyFound from './components/Day16NoyFound';
import Day16Overview from './components/Day16Overview';
import Day16Products from './components/Day16Products';
import Day16ProductDetails from './components/Day16ProductDetails';
import Day16Review from './components/Day16Review';



function App() {
  return (
    <div className="App">
      {/* <App2/>
      <App3/> */}

      {/* day 16 routing */}
      {/* // App.js (only the Routes part shown) */}
          <BrowserRouter>
            <Routes>
                    <Route path="/" element={<Day16Layout />}>
                        {/* index = default child for "/" */}
                        <Route index element={<Day16Overview />} />

                            {/* /products (just the list page) */}
                            <Route path="products" element={<Day16Products />} />

                                {/* /products/:id (details page - NOT nested) */}
                                <Route path="products/:id" element={<Day16ProductDetails />}>
                                            {/* /products/:id (default child = overview) */}
                                            <Route index element={<div>Select a Review</div>} />
                                            {/* /products/:id/review */}
                                            <Route path="review" element={<Day16Review />} />
                                </Route>
                    </Route>

                    {/* fallback */}
                    <Route path="*" element={<Day16NoyFound />} />
            </Routes>
          </BrowserRouter>


    </div>
  );
}

export default App;
