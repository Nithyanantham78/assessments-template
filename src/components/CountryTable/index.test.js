import React from "react";
import axios from "axios";

import {
  act,
  render,
  fireEvent,
  cleanup,
  waitForElement,
  getByText,
  wait,
  
} from "@testing-library/react";
import CountryTable from "./index";

let mockData = [
  {
    currencies: [{ code: "AFN", name: "Afghan afghani", symbol: "؋" }],
    languages: [
      { iso639_1: "ps", iso639_2: "pus", name: "Pashto", nativeName: "پښتو" },
      { iso639_1: "uz", iso639_2: "uzb", name: "Uzbek", nativeName: "Oʻzbek" },
      {
        iso639_1: "tk",
        iso639_2: "tuk",
        name: "Turkmen",
        nativeName: "Türkmen",
      },
    ],
    flag: "https://restcountries.eu/data/afg.svg",
    name: "Afghanistan",
    alpha3Code: "AFG",
    capital: "Kabul",
    population: 27657145,
  },
  {
    currencies: [{ code: "EUR", name: "Euro", symbol: "€" }],
    languages: [
      {
        iso639_1: "et",
        iso639_2: "est",
        name: "Estonian",
        nativeName: "eesti",
      },
    ],
    flag: "https://restcountries.eu/data/est.svg",
    name: "Estonia",
    alpha3Code: "EST",
    capital: "Tallinn",
    population: 1315944,
  },
];

let mockDataSearch = {
      currencies: [{ code: "AFN", name: "Afghan afghani", symbol: "؋" }],
      languages: [
        { iso639_1: "ps", iso639_2: "pus", name: "Pashto", nativeName: "پښتو" },
        { iso639_1: "uz", iso639_2: "uzb", name: "Uzbek", nativeName: "Oʻzbek" },
        {
          iso639_1: "tk",
          iso639_2: "tuk",
          name: "Turkmen",
          nativeName: "Türkmen",
        },
      ],
      flag: "https://restcountries.eu/data/afg.svg",
      name: "Afghanistan",
      alpha3Code: "AFG",
      capital: "Kabul",
      population: 27657145,
};
let mockDataSearchCode = {
      currencies: [{ code: "EUR", name: "Euro", symbol: "€" }],
      languages: [
        {
          iso639_1: "et",
          iso639_2: "est",
          name: "Estonian",
          nativeName: "eesti",
        },
      ],
      flag: "https://restcountries.eu/data/est.svg",
      name: "Estonia",
      alpha3Code: "EST",
      capital: "Tallinn",
      population: 1315944,
    }


jest.mock("axios");


describe("Country Table", () => {
  afterEach(cleanup);
  
  beforeEach(() => {
    axios.get.mockImplementation(() => Promise.resolve({ data: mockData }));
  });

  test("fetch component and check API data", async () => {
    const { container } = render(<CountryTable />);  
    expect(container.getElementsByTagName("table")).toBeDefined();
    await waitForElement(() => container.getElementsByClassName("img-fluid"));
    expect(container.getElementsByTagName("img-fluid")).toBeDefined();
    expect(container.getElementsByTagName("tr")[1].querySelectorAll("td")[2].innerHTML).toEqual("27657145");
    expect(container.getElementsByTagName("tr")).toHaveLength(3);
    
  });

  test('Component sorting',async ()=>{
    const { container } = render(<CountryTable />);  
    await waitForElement(() => container.getElementsByClassName("img-fluid"));
    expect(container.getElementsByClassName("bi bi-arrow-up")).toHaveLength(1);
    
    fireEvent.click(container.getElementsByClassName("bi bi-arrow-up")[0],false);
    expect(container.getElementsByTagName("tr")[1].querySelectorAll("td")[2].innerHTML).toEqual("27657145");
  
    fireEvent.click(container.getElementsByClassName("bi bi-arrow-down")[0],true);
    expect(container.getElementsByTagName("tr")[1].querySelectorAll("td")[2].innerHTML).toEqual("1315944");

  })

  test('Component searching',async ()=>{
    const { container,getByPlaceholderText,getByTestId } = render(<CountryTable />);
    await waitForElement(() => container.getElementsByClassName("img-fluid"));
    expect(getByPlaceholderText("Search..")).toBeDefined();
    
    let promiseSearch = Promise.resolve({ data: mockDataSearch })
    
    fireEvent.change(getByTestId("search"),{target:{value:"Afg"}})
    axios.get.mockImplementation(()=> promiseSearch);
    await wait(()=>expect(axios.get).toHaveBeenCalledTimes(4))
    await act(()=>promiseSearch)     
    expect(axios.get).toHaveBeenCalledTimes(4)
    expect(container.getElementsByTagName("tbody")[0].getElementsByTagName('tr')).toHaveLength(1);
    expect(getByText(container,'AFG')).toBeDefined();

    
    let promiseSearchCode = Promise.resolve({ data: mockDataSearchCode })
    axios.get.mockImplementation(()=> promiseSearchCode);
    fireEvent.change(getByTestId("searchType"),{target:{value:"code"}})
    fireEvent.change(getByTestId("search"),{target:{value:"E"}})
    await wait(()=>expect(axios.get).toHaveBeenCalledTimes(5))
    await act(()=>promiseSearchCode)     
    expect(axios.get).toHaveBeenCalledTimes(5)
    expect(container.getElementsByTagName("tbody")[0].getElementsByTagName('tr')).toHaveLength(1);
    expect(getByText(container,'EST')).toBeDefined();

  })
});
