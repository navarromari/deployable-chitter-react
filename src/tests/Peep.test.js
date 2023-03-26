import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Peep from "../Components/Peep.jsx";
import PeepModel from "../Components/utils/Peep.model.js";

jest.mock("../Components/utils/Peep.model.js", () => {
  return class PeepModel {
    constructor() {
      this.peepAuthor = `Mariana`;
      this.peepDateCreated = `2019-05-04T15:30:00.000Z`;
      this.peepMessage = `Peep Sample`;
    }
  };
});

describe("Peep tests", () => {
  const testPeep = new PeepModel();

  test("renders correctly", () => {
    render(
      <MemoryRouter>
        <Peep peep={testPeep} />
      </MemoryRouter>
    );
    expect(screen.getByText(`Peep Sample`)).toBeInTheDocument();
  });
});
