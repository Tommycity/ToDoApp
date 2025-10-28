import { ToastContainer } from "react-toastify";
import "./App.css";
import { CreateToDoList } from "./pages/CreateToDoList";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CreateToDoList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
