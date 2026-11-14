import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Architecture from "./Architecture";

describe("Architecture tabs", () => {
  it("moves between tabs with the keyboard", () => {
    render(<Architecture navOffset="" />);
    const topology = screen.getByRole("tab", { name: "Network Topology" });
    fireEvent.keyDown(topology, { key: "ArrowRight" });
    expect(screen.getByRole("tab", { name: "Hardware Stack" })).toHaveAttribute("aria-selected", "true");
  });
});
