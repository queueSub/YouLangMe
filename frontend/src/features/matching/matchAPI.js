import axios from 'axios';
import jsonp from 'jsonp';
import fetchJsonp from 'fetch-jsonp';
import { langCode } from '../../common/utils/data/nationalityData';
import { API_URL } from '../../common/api/http-config';

export const fetchNationality = async (remoteUserId = 1001) => {
  const accessToken = JSON.parse(localStorage.getItem('user')).accessToken;
  try {
    const response = await axios.get(`${API_URL}user/profile/${remoteUserId}`, {
      headers: {
        'X-Auth-Token': accessToken,
      },
    });
    console.log(response);
    return response.data.data.nationality;
  } catch (err) {
    console.log(err);
  }
};

export const fetchNews = async (mylang, yourCountry, page = 1) => {
  const country = yourCountry === 'KOREA' ? 'South Korea' : yourCountry;
  const API_KEY = 'MKwN1HfefzdaW7XtsiqAmR9Fy005p8Zlp-cfVbKZvac';
  const myLanguage = langCode[mylang];

  const response = await axios.get(
    `https://api.newscatcherapi.com/v2/search?lang=${myLanguage}&published_date_precision=full&search_in=title&page=${page}&page_size=4&from_rank=0&to_rank=250&q=${country}`,
    {
      headers: {
        'x-api-key': API_KEY,
      },
    }
  );
  return response.data;
};
