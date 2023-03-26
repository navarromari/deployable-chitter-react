import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import App from "../App.js";
import Login from "../Components/Login";
import Signup from "../Components/Signup";

describe("App", () => {
  test("renders header", () => {
    render(<App />);
    const headerElement = screen.getByTestId("header");
    expect(headerElement).toBeInTheDocument();
  });

  test("renders footer", () => {
    render(<App />);
    const footerElement = screen.getByTestId("footer");
    expect(footerElement).toBeInTheDocument();
  });

  test("renders chitter home", () => {
    render(<App />);
    const chitterHomeElement = screen.getByTestId("chitter-home");
    expect(chitterHomeElement).toBeInTheDocument();
  });

  test("renders signup page", () => {
    render(
      <MemoryRouter initialEntries={["/signup"]}>
        <Routes>
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </MemoryRouter>
    );
    const signupElement = screen.getByTestId("signup");
    expect(signupElement).toBeInTheDocument();
  });

  test("renders login page", () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </MemoryRouter>
    );
    const loginElement = screen.getByTestId("login");
    expect(loginElement).toBeInTheDocument();
  });
});
