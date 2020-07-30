import React from "react";
import {
  act,
  render,
  fireEvent,
  cleanup,
  waitForElement,
  wait,
} from "@testing-library/react";
import App from "./app";


//jest.mock("axios");
afterEach(cleanup)
describe("App", () => {
  
  test("should fetch data on mount", async () => {
    //axios.get.mockImplementation(() => Promise.resolve({ data: data }));
    
    const { container } = render(
      <App />
    );
    expect(container.getElementsByTagName('h2')).toBeDefined();
    expect(container.getElementsByTagName('CountryTable')).toBeDefined();
  });
});
