import { useEffect, useState } from "react";

import Comments from "./Comments";
import AddCommentForm from "./AddCommentForm";
import data from "../mockData/comments";

const App = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // async action and fetching data
    setComments(data);
    console.log(comments);
  }, []);

  console.log(comments);

  return (
    <div>
      <Comments comments={comments} />
      <AddCommentForm />
    </div>
  );
};

export default App;
