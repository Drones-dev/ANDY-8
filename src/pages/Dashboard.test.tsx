import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Dashboard from "./Dashboard";

vi.mock("recharts", () => ({
  CartesianGrid: () => null,
  Line: () => null,
  LineChart: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  ReferenceLine: () => null,
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Tooltip: () => null,
  XAxis: () => null,
  YAxis: () => null,
}));

describe("Dashboard relay simulation", () => {
  it("toggles between recovered-failure and normal operation states", () => {
    render(<Dashboard navOffset="" />);

    expect(screen.getByText("Relay failure recovered")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "RESET ALL NODES" }));

    expect(screen.getAllByText("All nodes online").length).toBeGreaterThan(0);
    expect(screen.getByText(/Normal route active/)).toBeInTheDocument();
    expect(screen.getByText("N/A")).toBeInTheDocument();
    expect(screen.getByText("No failure injected")).toBeInTheDocument();
  });

  it("updates the selected software simulation run", () => {
    render(<Dashboard navOffset="" />);
    fireEvent.change(screen.getByLabelText("Select software simulation run"), { target: { value: "10" } });
    expect(screen.getByText("Illustrative data — Run #10")).toBeInTheDocument();
  });

  it("changes the timeline when the failure is cleared", () => {
    render(<Dashboard navOffset="" />);
    expect(screen.getByText(/Relay node stopped responding/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "RESET ALL NODES" }));
    expect(screen.queryByText(/Relay node stopped responding/)).not.toBeInTheDocument();
    expect(screen.getByText(/No heartbeat timeouts/)).toBeInTheDocument();
  });
});
