import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import Hotel from "pages/Hotel";
import List from "pages/List";
import Login from "pages/Login";
import "styles/css/main.css";
import Layout from "components/layout/Layout";
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<List />} />
          <Route path="/hotels/:id" element={<Hotel />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
