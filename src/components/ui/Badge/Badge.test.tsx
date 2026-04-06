import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders the label text", () => {
    render(<Badge label="Emergency" />);
    expect(screen.getByText("Emergency")).toBeInTheDocument();
  });

  it("applies default variant styling", () => {
    render(<Badge label="Default" />);
    const badge = screen.getByText("Default");
    expect(badge).toHaveClass("bg-slate-100");
  });

  it("applies resuscitation variant styling", () => {
    render(<Badge label="Resuscitation" variant="resuscitation" />);
    const badge = screen.getByText("Resuscitation");
    expect(badge).toHaveClass("bg-red-600");
  });

  it("applies small size styling", () => {
    render(<Badge label="Small" size="small" />);
    const badge = screen.getByText("Small");
    expect(badge).toHaveClass("text-xs");
  });

  it("applies large size styling", () => {
    render(<Badge label="Large" size="large" />);
    const badge = screen.getByText("Large");
    expect(badge).toHaveClass("px-3");
  });
});
