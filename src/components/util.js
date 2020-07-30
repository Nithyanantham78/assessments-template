import axios from 'axios';

let BASE_URL = 'https://restcountries.eu/rest/v2';

export const getAllCountries = async () =>{
    return await axios.get(`${BASE_URL}/all?fields=name;capital;currencies;languages;population;flag;alpha3Code`)
}

export const getCountriesByType = async (type,text) =>{
    return await axios.get(`${BASE_URL}/${type}/${text}`);
}