import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Documentation from "./Documentation";

describe("Documentation availability", () => {
  it("does not expose broken download links for missing files", () => {
    render(<Documentation navOffset="" />);
    expect(screen.getAllByText("Coming soon").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Download ↓")).toHaveLength(2);
    expect(screen.getByRole("link", { name: "View Prototype Presentation" })).toHaveAttribute(
      "href",
      "/documents/ANDY8_Mesh_Telemetry_Deck.pptx",
    );
    expect(screen.getByRole("link", { name: "View GitHub Repository" })).toHaveAttribute(
      "href",
      "https://github.com/Drones-dev/ANDY-8",
    );
  });

  it("supports arrow-key category navigation", () => {
    render(<Documentation navOffset="" />);
    const allTab = screen.getByRole("tab", { name: "All" });
    fireEvent.keyDown(allTab, { key: "ArrowRight" });
    expect(screen.getByRole("tab", { name: /Planning/ })).toHaveAttribute("aria-selected", "true");
  });
});
