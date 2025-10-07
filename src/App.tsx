import { Routes, Route } from "react-router";
import Home from "@/pages/Home";
import CreatePost from "@/pages/CreatePost.tsx";
import Post from "@/pages/Post.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/post/create" element={<CreatePost />} />
      <Route path="/post/:id" element={<Post />} />
    </Routes>
  );
}

export default App;
