import React from 'react';
import { Routes, Route, Navigate } from 'react-router';
import Cart from './cart/Cart';
import Favourites from './favourites/Favourites';
import Order from './order/Order';
import Products from './products/Products';

const routes = [
  { path: '', component: <Products /> },
  { path: 'cart', component: <Cart /> },
  { path: 'order', component: <Order /> },
  { path: 'favourites', component: <Favourites /> },
];

function Routing() {
  return (
    <Routes>
      {routes.map((route) => (
        <Route path={`organic-food/${route.path}`} element={route.component} key={route.path} />
      ))}
      <Route path="*" element={<Navigate to="/organic-food" />} />
    </Routes>
  );
}

export default Routing;
