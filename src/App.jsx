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
import EducationIndividual from "./components/educationIndividual";
import HealthIndividual from "./components/healthIndividual";
import SocialIndividual from "./components/socialIndividual";
import Common from "./components/pg";

// App component
const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/common" element={<Common />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/healthIndividualOngoing" element={<HealthIndividualOngoing />} />
          <Route path="/educationIndividualOngoing" element={<EducationIndividualOngoing />} />
          <Route path="/socialIndividualOngoing" element={<SocialIndividualOngoing />} />
          <Route path="/healthIndividual" element={<HealthIndividual />} />
          <Route path="/educationIndividual" element={<EducationIndividual />} />
          <Route path="/socialIndividual" element={<SocialIndividual />} />
         
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;



