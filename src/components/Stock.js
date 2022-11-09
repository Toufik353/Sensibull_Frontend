import React, { useEffect, useState } from "react";
import "./../App.css";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import axios from "axios";
import { Link } from "react-router-dom";

export default function Stock(props) {
  const [head, setHead] = useState([]);
  const [copyData, setCopyData] = useState([]);
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    axios("https://prototype.sbulltech.com/api/v2/instruments")
      .then((response) => {
        const [headers, ...rows] = response.data.split("\n");
        setHead(headers.split(","));
        setData([...rows]);
        setCopyData([...rows]);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSelectSymbol = (item) => {
    props.setSelectedSymbols(item);
  };

  const handleInputSearch = (e) => {
    // if (e.target.value === "") {
    //   setData([...copyData]);
    // }
    // var result = copyData.map((item) => {
    //   if (
    //     item.split(",")[0].includes(e.target.value) ||
    //     item.split(",")[0].includes(e.target.value)
    //   ) {
    //     return item;
    //   }
    // });
    // var filterData = result.filter((item) => {
    //   if (item) {
    //     return item;
    //   }
    // });
    // setData([...filterData]);
    // -----------------------------
    if (e.target.value === "") {
      setData([...copyData]);
    } else {
      var res = copyData.filter((item) => {
        return item.toLowerCase().includes(e.target.value.toLowerCase());
      });
    }
    setData([...res]);
  };
  return (
    <div className="Stock">
      <Form className="d-flex searchbox">
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          onInput={handleInputSearch}
        />
        <Button variant="outline-success">Search</Button>
      </Form>
      {/* */}
      <Table striped bordered hover size="sm" className="table">
        <thead>
          <tr size="sm">
            {head.map((item) => (
              <td size="sm" key={item}>
                {item}
              </td>
            ))}
          </tr>
        </thead>
        {/* ------ */}
        <tbody>
          {data &&
            data.map((item) => {
              const [symbol, name, sector, validTill] = item.split(",");
              return (
                <tr key={symbol}>
                  <td onClick={() => handleSelectSymbol(symbol)}>
                    {" "}
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/quotes/${symbol}`}
                    >
                      {symbol}
                    </Link>
                  </td>
                  <td>{name}</td>
                  <td>{sector}</td>
                  <td>{validTill}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
}
