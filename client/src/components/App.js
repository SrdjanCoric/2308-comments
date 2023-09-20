import { useEffect, useState } from "react";
import axios from "axios";
import Comments from "./Comments";
import AddCommentForm from "./AddCommentForm";

const App = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const { data } = await axios.get("/api/comments");
      setComments(data);
    };
    fetchComments();
  }, []);

  const handleMoreReplies = async (commentId) => {
    const { data } = await axios.get(
      `/api/comment_replies?comment_id=${commentId}`
    );
    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, replies: comment.replies.concat(data) };
        } else {
          return comment;
        }
      })
    );
  };

  const handleSubmit = async (newComment, callback) => {
    try {
      const { data } = await axios.post("/api/comments", { ...newComment });
      setComments(comments.concat(data));
      if (callback) {
        callback();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Comments comments={comments} onMoreReplies={handleMoreReplies} />
      <AddCommentForm onSubmit={handleSubmit} />
    </div>
  );
};

export default App;
