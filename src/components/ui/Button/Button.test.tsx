import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("renders the label text", () => {
    render(<Button label="Assign Patient" />);
    expect(screen.getByText("Assign Patient")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const handleClick = vi.fn();
    render(<Button label="Click me" onClick={handleClick} />);
    await userEvent.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", async () => {
    const handleClick = vi.fn();
    render(<Button label="Disabled" onClick={handleClick} disabled />);
    await userEvent.click(screen.getByText("Disabled"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("applies primary variant by default", () => {
    render(<Button label="Primary" />);
    expect(screen.getByText("Primary")).toHaveClass("bg-blue-600");
  });

  it("applies danger variant styling", () => {
    render(<Button label="Danger" variant="danger" />);
    expect(screen.getByText("Danger")).toHaveClass("bg-red-600");
  });

  it("applies fullWidth class when set", () => {
    render(<Button label="Full" fullWidth />);
    expect(screen.getByText("Full")).toHaveClass("w-full");
  });

  it("applies disabled styling", () => {
    render(<Button label="Disabled" disabled />);
    expect(screen.getByText("Disabled")).toHaveClass("opacity-50");
  });
});
