import React from "react";
import { render, screen } from "@testing-library/react";
import App from '../App'

describe("Component", () => {
  it("renders correctly", () => {
    render(<App />);

    // Add your assertions here
    expect(screen.getByText("Hello, World!")).toBeInTheDocument();
  });
});
