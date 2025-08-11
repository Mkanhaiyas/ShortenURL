import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UrlShorten from "./pages/UrlShorten";
import UrlDetail from "./pages/UrlDetail";

export default function MainRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UrlShorten />} />
        <Route path="/details" element={<UrlDetail />} />
      </Routes>
    </Router>
  );
}
