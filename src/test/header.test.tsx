import { render, screen } from "@testing-library/react";
import Header from "@/sections/header";

it("should display application title", () => {
  render(<Header />);
  const message = screen.queryByText("Summarizer.");
  expect(message).toBeVisible();
});

it("should display hero headline", () => {
  render(<Header />);
  const message = screen.queryByText("Summarize your with ease.");
  expect(message).toBeVisible();
});
