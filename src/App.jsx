import Navbar from "./Component/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./Component/Body";
import Login from "./Component/Login";
import Profile from "./Component/Profile";
import { Provider } from "react-redux";
import store from "./Component/ReduxStore/store";
import Feed from "./Component/Feed";
import Connections from "./Component/Connections";
import Requests from "./Component/Requests";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections/>} />
              <Route path="/requests" element={<Requests />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
