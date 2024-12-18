import "./App.scss";
import { Front, Dashboard, Admin } from "./views";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Header, Footer } from "./components";
import { AppContextProvider } from "./context/app.context";

function App() {
  return (
    <div className="App">
      <AppContextProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Front />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/" replace={true} />} />
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
      <Footer />
    </div>
  );
}

export default App;
