import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Login from "./routes/Login"
import Home from "./routes/Home"
import Board from "./routes/Board"
import BoardForm from "./routes/BoardForm"
import { useState } from "react";
import BoardDetail from "./routes/BoardDetail";
import Regist from "./routes/Regist.js"

function App() {
  const [loginCheck,setLoginCheck] = useState(false);
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home loginCheck={loginCheck} setLoginCheck={setLoginCheck} />} />
          <Route path="/login" element={<Login loginCheck={loginCheck} setLoginCheck={setLoginCheck} />} />
          <Route path="/board" element={<Board />} />
          <Route path="/board/write" element={<BoardForm />} />
          <Route path="/board/write/:board_id" element={<BoardForm />} />
          <Route path="/board/detail/:board_id" element={<BoardDetail />} />
          <Route path="/regist" element={<Regist />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
