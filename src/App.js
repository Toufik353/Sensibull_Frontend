import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Quote from "./components/Quote";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Stock from "./components/Stock";

export default function App() {
  const [selectedSymbol, setSelectedSymbol] = useState();

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <Stock
                setSelectedSymbols={setSelectedSymbol}
                selectedSymbol={selectedSymbol}
              />
            }
          ></Route>
          <Route
            path="/quotes/:selectedSymbol"
            element={<Quote selectedSymbol={selectedSymbol} />}
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
