import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";

function App() {
  return (
    <section>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" />
      </Routes>
    </section>
  );
}

export default App;
