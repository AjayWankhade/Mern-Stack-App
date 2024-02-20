import React from "react";
import UpdatePost from "./components/UpdatePost";
import AllPost from "./components/AllPost";
import CreatePost from "./components/CreatePost";
import Navbar from "./components/Navbar";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/create" element={<CreatePost />}></Route>
          <Route path="/all" element={<AllPost />}></Route>
          <Route path="/:id" element={<UpdatePost />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
