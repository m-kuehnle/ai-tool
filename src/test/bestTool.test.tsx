import { render, screen } from "@testing-library/react";
import BestTool from "@/sections/bestTool";

it("should display bestTool section title", () => {
  render(<BestTool />);
  const message = screen.queryByText("Why our summarizer is the best?");
  expect(message).toBeVisible();
});

it("should display bestTool section subtitle", () => {
  render(<BestTool />);
  const message = screen.queryByText(
    "We leverage cutting-edge technology to streamline the process of text summarization across diverse input sources."
  );
  expect(message).toBeVisible();
});
