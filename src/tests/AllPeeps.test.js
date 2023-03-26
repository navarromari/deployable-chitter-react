import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AllPeeps from "../Components/AllPeeps";
import mockPeeps from "../../public/mockPeeps.json";

describe("AllPeeps tests", () => {
  console.log(mockPeeps);
  it("renders loading message when data is not available", async () => {
    const noData = { peeps: [], error: `` };
    render(
      <MemoryRouter>
        <AllPeeps data={noData} />
      </MemoryRouter>
    );
    expect(await screen.findByText(/loading/i)).toBeInTheDocument();
  });

  test(`renders an error message if peeps are not going to be available`, async () => {
    const errorData = { peeps: [], error: `Error` };
    render(
      <MemoryRouter>
        <AllPeeps data={errorData} />
      </MemoryRouter>
    );

    expect(await screen.findByText(/error/i)).toBeInTheDocument();
  });

  test(`renders the correct number of Peep components based on the data supplied`, async () => {
    const mockData = { peeps: mockPeeps, error: `` };
    render(
      <MemoryRouter>
        <AllPeeps data={mockData} />
      </MemoryRouter>
    );

    const rows = await screen.findAllByText(/sample peep/i);
    expect(rows.length).toBe(4);
  });
});
