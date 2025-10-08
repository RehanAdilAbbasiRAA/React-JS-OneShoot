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
              {/* Root layout — children routes go inside this Route */}
              <Route path="/" element={<Day16Layout />}>
                {/* index = default child for "/" */}
                <Route index element={<Day16Overview />} />

                      {/* /products  (parent for product list + nested product details) */}
                      <Route path="products" element={<Day16Products />}>
                        {/* optional index inside /products (e.g., "Select a product") */}
                        {/* <Route index element={<div>Select a product</div>} /> */}

                                  {/* nested product detail (e.g., /products/1) */}
                                  <Route path=":id" element={<Day16ProductDetails />}>
                                    {/* <Route path="products/:id" element={<Day16ProductDetails />} /> */}
                                    {/* default child for /products/:id — Overview of that product */}
                                      <Route index element={<div>Select a Review</div>} />

                                    {/* /products/:id/review */}
                                    <Route path="review" element={<Day16Review />} />

                                </Route>
                      </Route>

                {/* fallback */}
                  <Route path="*" element={<Day16NoyFound />} />
              </Route>
        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;
