import "./Post.css";
import PostCard from "@/components/PostCard.tsx";
import CommentCard from "@/components/CommentCard.tsx";

export default function Post() {
  return (
    <div>
      <PostCard showCommentsIcon={false} />
      <CommentCard />
    </div>
  );
}
