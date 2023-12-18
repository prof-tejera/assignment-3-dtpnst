import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";
import { ErrorBoundary } from 'react-error-boundary';

import DocumentationView from "./views/DocumentationView";
import TimersView from "./views/TimersView";
import AddTimerView from "./views/AddTimerView";
import { TimerProvider } from "./components/TimerContext";
import EditTimerView from "./views/EditTimerView";
import { ErrorFallback } from "./components/generic/ErrorFallback";

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
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Container>
        <TimerProvider>
          <Router>
            <Nav />
            <Routes>
              <Route path="/docs" element={<DocumentationView />} />
              <Route path="/" element={<TimersView />} />
              <Route path="/add" element={<AddTimerView />} />
              <Route path="/edit/:timerId" element={<EditTimerView />}/>
            </Routes>
          </Router>
        </TimerProvider>
      </Container>
    </ErrorBoundary>
  );
};

export default App;
