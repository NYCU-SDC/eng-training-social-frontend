import { Routes, Route } from "react-router";
import Home from "@/pages/Home";
import CreatePost from "@/pages/CreatePost.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/post/create" element={<CreatePost />} />
    </Routes>
  );
}

export default App;
