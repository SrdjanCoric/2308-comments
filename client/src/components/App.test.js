/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { getComments, getReplies } from "../services/comments";
// import * as commentAPI from "../services/comments";
import userEvent from "@testing-library/user-event";
import App from "./App";

jest.mock("../services/comments.js");

const comments = [
  {
    id: "4b2d74e6-7d1a-4ba3-9e95-0f52ee8ebc6e",
    author: "Reed Fisher",
    body: "Sint in in sunt amet.",
    postedAt: 1550488214207,
    replies_count: 3,
    replies: [
      {
        id: "116dbd01-d5f3-4dfb-afeb-f822a9264a5e",
        comment_id: "4b2d74e6-7d1a-4ba3-9e95-0f52ee8ebc6e",
        author: "Kathleen Nikolaus",
        body: "Officia suscipit sint sint impedit nemo. Labore aut et quia quasi ut. Eos voluptatibus quidem eius delectus beatae excepturi.",
        postedAt: 1550419941546,
      },
    ],
  },
];

test("h1 is rendered", async () => {
  // getComments.mockImplementation(() => Promise.resolve(comments));
  // commentAPI.getComments.mockResolvedValue(comments);
  getComments.mockResolvedValue(comments);
  render(<App />);
  // findByRole -> getByRole + waitFor
  const heading = await screen.findByRole("heading", { level: 1 });
  expect(heading).toBeInTheDocument();
});

test("link dissapears when it's clicked", async () => {
  const newReplies = [
    {
      id: "117dbd01-d5f3-4dfb-afeb-f822a9264a5e",
      comment_id: "4b2d74e6-7d1a-4ba3-9e95-0f52ee8ebc6e",
      author: "Kathleen Nikolaus",
      body: "Officia suscipit sint sint impedit nemo. Labore aut et quia quasi ut. Eos voluptatibus quidem eius delectus beatae excepturi.",
      postedAt: 1550419941546,
    },
    {
      id: "118dbd01-d5f3-4dfb-afeb-f822a9264a5e",
      comment_id: "4b2d74e6-7d1a-4ba3-9e95-0f52ee8ebc6e",
      author: "Kathleen Nikolaus",
      body: "Officia suscipit sint sint impedit nemo. Labore aut et quia quasi ut. Eos voluptatibus quidem eius delectus beatae excepturi.",
      postedAt: 1550419941546,
    },
  ];
  getComments.mockResolvedValue(comments);
  getReplies.mockResolvedValue(newReplies);
  render(<App />);
  const link = await screen.findByRole("link", { name: /Show More Replies/ });
  const user = userEvent.setup();
  await user.click(link);
  expect(link).not.toBeInTheDocument();
});
