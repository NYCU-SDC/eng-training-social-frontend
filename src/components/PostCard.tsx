import "./PostCard.css";
import {
  UserCircleIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
  ChatBubbleOvalLeftIcon,
} from "@heroicons/react/24/outline";

export default function PostCard() {
  return (
    <div className="card-container">
      <div className="user-info">
        <UserCircleIcon className="lg-icon" />
        <p>John Doe</p>
      </div>
      <h1 className="card-title">Lorem ipsum dolor sit amet consectetur.</h1>
      <p className="card-text">
        Lorem ipsum dolor sit amet consectetur. Bibendum adipiscing metus dolor
        diam in risus ut. Quis nam elit placerat egestas tellus rhoncus.
        Facilisis pretium et nunc metus urna nisi a. Molestie consequat ornare
        ac volutpat velit condimentum quis pellentesque.
      </p>
      <div className="reaction-container">
        <HandThumbUpIcon className="md-icon" />
        <HandThumbDownIcon className="md-icon" />
        <ChatBubbleOvalLeftIcon className="md-icon" />
      </div>
    </div>
  );
}
