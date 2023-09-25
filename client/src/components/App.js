import { useEffect, useState } from "react";
import Comments from "./Comments";
import AddCommentForm from "./AddCommentForm";
import { createComment, getComments, getReplies } from "../services/comments";

const App = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const data = await getComments();
      setComments(data);
    };
    fetchComments();
  }, []);

  const handleMoreReplies = async (commentId) => {
    const data = await getReplies(commentId);
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
      const data = await createComment(newComment);
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
      {comments.length > 0 ? <h1>We have comments</h1> : null}
      <Comments comments={comments} onMoreReplies={handleMoreReplies} />
      <AddCommentForm onSubmit={handleSubmit} />
    </div>
  );
};

export default App;
