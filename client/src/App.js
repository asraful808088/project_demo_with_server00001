import React from "react";
import { Route, Routes } from "react-router-dom";
import Index from "./page";
import Home from "./page/home/home";
import Settings from "./page/settings/settings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Index />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;
