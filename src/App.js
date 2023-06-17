import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import TextUpload from "./TextUpload/TextUpload";
import FileUpload from "./FileUoload/FileUpload";
import { Nav } from "react-bootstrap";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav variant="tabs" activeKey="/home">
          <Nav.Item>
            <Nav.Link href="/">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/files">Files</Nav.Link>
          </Nav.Item>
        </Nav>
        <Routes>
          <Route exact path="/" element={<TextUpload />}></Route>
          <Route exact path="/files" element={<FileUpload />}></Route>
          <Route path="*" element={<h1>Route does not exist</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
