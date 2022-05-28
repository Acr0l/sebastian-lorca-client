import { Container } from "@material-ui/core";
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "./components/Auth/Auth.js";
import Home from "./components/Home/Home.js";
import Navbar from "./components/Navbar/Navbar.js";
import PostDetails from "./components/PostDetails/PostDetails.jsx";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Navigate to="/posts" />}/>
          <Route path="/posts" index exact element={<Home />} />
          <Route path="/posts/search" exact element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route
            path="/auth"
            exact
            element={!user ? <Auth /> : <Navigate to="/posts" />}
          />
          <Route
            path="*"
            element={() => (
              <main style={{ padding: "1rem" }}>
                <p>There&#39;s nothing here!</p>
              </main>
            )
            }
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
