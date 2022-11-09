import React, { useState, useEffect } from "react";
import axios from "axios";
import "./../App.css";
import { useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";

function Quote({ selectedSymbol }) {
  const d = useParams();
  const [quotes, setQuotes] = useState([]);
  const [ascStatus, setAscStatus] = useState(false);
  const [dscStatus, setDscStatus] = useState(false);
  async function fetchQuotes() {
    const response = await axios(
      `https://prototype.sbulltech.com/api/v2/quotes/${selectedSymbol}`
    );
    setQuotes(response.data.payload[selectedSymbol]);
  }
  useEffect(() => {
    fetchQuotes();
  }, []);

  const handleAscendingOrder = () => {
    setQuotes([
      ...quotes.sort((a, b) => Date.parse(a.time) - Date.parse(b.time)),
    ]);
    setAscStatus(true);
    setDscStatus(false);
  };

  const handleDescendingOrder = () => {
    setQuotes([
      ...quotes.sort((a, b) => Date.parse(b.time) - Date.parse(a.time)),
    ]);
    setDscStatus(true);
    setAscStatus(false);
  };
  return (
    <div className="Quote">
      <h1 className="text-center">Quote page for {selectedSymbol}</h1>
      <span>Sort quote's by time in...</span>
      <button
        className={ascStatus ? "Active" : ""}
        onClick={handleAscendingOrder}
      >
        Ascending
      </button>
      <span>or..</span>
      <button
        className={dscStatus ? "Active" : ""}
        onClick={handleDescendingOrder}
      >
        Descending
      </button>

      <Table striped bordered hover size="sm" className="table">
        <thead>
          <tr size="sm">
            <th>Price</th>
            <th>
              Time{" "}
              {ascStatus ? <BsArrowUp /> : dscStatus ? <BsArrowDown /> : " "}
            </th>
            <th>validTill</th>
          </tr>
        </thead>
        {quotes &&
          quotes.map((item) => {
            return (
              <tbody>
                <tr size="sm" key={item}>
                  <td>{item.price}</td>
                  <td>{item.time}</td>
                  <td>{item.valid_till}</td>
                </tr>
              </tbody>
            );
          })}
      </Table>
    </div>
  );
}
export default Quote;
