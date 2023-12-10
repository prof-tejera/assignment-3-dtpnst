import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";

import DocumentationView from "./views/DocumentationView";
import TimersView from "./views/TimersView";
import AddTimerView from "./views/AddTimerView";
import { TimerProvider } from "./components/TimerContext";

const Container = styled.div`
  background: #f0f6fb;
  height: 100vh;
  overflow: auto;
`;

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Timers</Link>
        </li>
        <li>
          <Link to="/add">Add Timer</Link>
        </li>
        <li>
          <Link to="/docs">Documentation</Link>
        </li>
      </ul>
    </nav>
  );
};

const App = () => {
  return (
    <Container>
      <TimerProvider>
        <Router>
          <Nav />
          <Routes>
            <Route path="/docs" element={<DocumentationView />} />
            <Route path="/" element={<TimersView />} />
            <Route path="/add" element={<AddTimerView />} />
          </Routes>
        </Router>
      </TimerProvider>
    </Container>
  );
};

export default App;
