import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom'; 
import LoginPage from "./Components/LoginPage.jsx";

test("renders Login System heading", () => {
  render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  );
  const headingElement = screen.getByText(/Login System/i);
  expect(headingElement).toBeInTheDocument();
});


test("displays error message if Employee ID is not provided", async () => {
  render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  );

  const loginButton = screen.getByTestId('login-button'); 
  fireEvent.click(loginButton);

  const errorElement = await screen.findByText(/Employee ID is required/i);
  expect(errorElement).toBeInTheDocument();
});

test("displays error message if Password is not provided", async () => {
  render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  );

  const loginButton = screen.getByTestId('login-button'); 
  fireEvent.click(loginButton);

  const errorElement = await screen.findByText(/Password is required/i);
  expect(errorElement).toBeInTheDocument();
});

test("displays error message if UserType is not selected", async () => {
  render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  );

  const loginButton = screen.getByTestId('login-button'); 
  fireEvent.click(loginButton);

  const errorElement = await screen.findByText(/Please select a role/i);
  expect(errorElement).toBeInTheDocument();
});

