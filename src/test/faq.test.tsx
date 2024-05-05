import { render, screen } from "@testing-library/react";
import FAQ from "@/sections/FAQ";

it("should display faq subtitle", () => {
  render(<FAQ />);
  const message = screen.queryByText(
    "Find answers to the most commonly asked questions here."
  );
  expect(message).toBeVisible();
});
