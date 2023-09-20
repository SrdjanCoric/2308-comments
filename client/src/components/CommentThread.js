import Comment from "./Comment";

const CommentThread = ({ comment, onMoreReplies }) => {
  const handleMoreReplies = (e) => {
    e.preventDefault();
    onMoreReplies(comment.id);
  };
  return (
    <div className="parent-comment">
      <Comment {...comment} />
      <div className="replies">
        {comment.replies.map((reply) => {
          return <Comment key={reply.id} {...reply} />;
        })}
        {comment.replies.length === comment.replies_count ? null : (
          <a href="#" className="show_more" onClick={handleMoreReplies}>
            Show More Replies ({comment.replies_count - 1})
          </a>
        )}
      </div>
    </div>
  );
};

export default CommentThread;
