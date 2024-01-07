// Import necessary libraries and components
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./components/home";
import LoginPage from "./components/login";
import RegisterPage from "./components/register";
import HealthIndividualOngoing from "./components/healthIndividiualOngoing";
import EducationIndividualOngoing from "./components/educationIndividualOngoing";
import SocialIndividualOngoing from "./components/socialIndividualOngoing";

// App component
const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/healthIndividualOngoing" element={<HealthIndividualOngoing />} />
          <Route path="/educationIndividualOngoing" element={<EducationIndividualOngoing />} />
          <Route path="/socialIndividualOngoing" element={<SocialIndividualOngoing />} />
         
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;



