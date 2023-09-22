/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddCommentForm from "./AddCommentForm";

beforeEach(() => {
  render(<AddCommentForm />);
});

test("contains h2 heading", () => {
  const heading = screen.getByRole("heading", {
    name: "Post a Comment",
    level: 2,
  });
  expect(heading).toBeInTheDocument();
});

test("author changes when something is typed", async () => {
  render(<AddCommentForm />);
  const user = userEvent.setup();
  const inputAuthor = screen.getByRole("textbox", { name: "Your Name" });
  await user.type(inputAuthor, "Srdjan");
  expect(inputAuthor).toHaveValue("Srdjan");
});

test("body changes when something is typed", async () => {
  render(<AddCommentForm />);
  const user = userEvent.setup();
  const inputBody = screen.getByRole("textbox", { name: "Your Comment" });
  await user.type(inputBody, "My Comment");
  expect(inputBody).toHaveValue("My Comment");
});

test("onSubmit is called", async () => {
  const mockFunction = jest.fn();
  render(<AddCommentForm onSubmit={mockFunction} />);
  const user = userEvent.setup();
  const button = screen.getByRole("button");
  await user.click(button);
  expect(mockFunction.mock.calls.length).toBe(1);
});

// mockFunction.mock.calls = [[{author: "", body: ""}, function: reset],]

test("onSubmit was invoked with the newComment", async () => {
  const mockFunction = jest.fn();
  render(<AddCommentForm onSubmit={mockFunction} />);
  const user = userEvent.setup();
  const inputAuthor = screen.getByRole("textbox", { name: "Your Name" });
  const inputBody = screen.getByRole("textbox", { name: "Your Comment" });
  await user.type(inputAuthor, "Srdjan");
  await user.type(inputBody, "Comment");
  const button = screen.getByRole("button");
  await user.click(button);
  expect(mockFunction.mock.calls[0][0]).toEqual({
    author: inputAuthor.value,
    body: inputBody.value,
  });
});
