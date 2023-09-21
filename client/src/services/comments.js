import axios from "axios";
import {
  CREATE_COMMENT,
  GET_COMMENTS,
  getMoreReplies,
} from "../constants/routes";

export const getComments = async () => {
  const { data } = await axios.get(GET_COMMENTS);
  return data;
};

export const getReplies = async (commentId) => {
  const { data } = await axios.get(getMoreReplies(commentId));
  return data;
};

export const createComment = async (newComment) => {
  const { data } = await axios.post(CREATE_COMMENT, { ...newComment });
  return data;
};
