import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./components/Login";
import "./assets/scss/main.scss";
import Home from "./components/Home";
import ProtectedRoute from "./routers/ProtectedRoute";

function App() {
  const [user, setUser] = useState(null);
  return (
    <Router basename="/userlist">
      <Routes>
        <Route path="/" element={<Form />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home user={user} setUser={setUser} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
