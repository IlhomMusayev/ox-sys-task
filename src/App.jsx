import { Routes, Route } from "react-router-dom";
import Home from "views/App/Home/Home";
import Login from "views/Auth/Login/Login";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import Variations from "views/App/Variations";
import Dashboard from "views/App/Dashboard";
import Search from "views/App/Search";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/" element={<Home />}>
          {/* Dashboard page */}
          <Route path="/variations" element={<Variations />} />
          <Route path="/search" element={<Search />} />
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Route>
      <Route path="/login" element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}

export default App;
