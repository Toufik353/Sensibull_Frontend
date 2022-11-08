import React, { useState, useEffect } from "react";
import axios from "axios";
import "./../App.css";
import { useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";

function Quote({ selectedSymbol }) {
  const d = useParams();
  const [quotes, setQuotes] = useState([]);
  const [ascStatus, setAscStatus] = useState(0);
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
  };

  const handleDescendingOrder = () => {
    setQuotes([
      ...quotes.sort((a, b) => Date.parse(b.time) - Date.parse(a.time)),
    ]);
    setAscStatus(false);
  };
  return (
    <div className="Quote">
      <h1 class="text-center">Quote page for {selectedSymbol}</h1>
      <button onClick={handleAscendingOrder}>Ascending</button>
      <button onClick={handleDescendingOrder}>Descending</button>
      <Table striped bordered hover size="sm">
        <thead>
          <tr size="sm">
            <th>Price</th>
            <th>Time {ascStatus === true ? "asc" : "dsc"}</th>
            <th>validTill</th>
          </tr>
        </thead>
        {quotes &&
          quotes.map((item) => {
            return (
              <tbody>
                <tr size="sm">
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
