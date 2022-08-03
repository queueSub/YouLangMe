import axios from 'axios';
import { API_URL } from '../../utils/data/apiData';

export const fetchBoard = async (page = 1) => {
  const accessToken = JSON.parse(localStorage.getItem('user')).accessToken;

  try {
    const response = await axios.get(API_URL + `board/list?page=${page}`, {
      headers: {
        'X-AUTH-TOKEN': accessToken,
      },
    });

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchUserRanking = async () => {
  const accessToken = JSON.parse(localStorage.getItem('user')).accessToken;
  // 1위 2위 3위 ... 내 순위
  try {
    const response = await axios.get(API_URL + `user/exp/ranking`, {
      headers: {
        'X-AUTH-TOKEN': accessToken,
      },
    });

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
export const fetchRecommendUser = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const accessToken = user.accessToken;
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const userId = currentUser.id;
  try {
    const response = await axios.get(API_URL + `follow/followers/${userId}`, {
      headers: {
        'X-AUTH-TOKEN': accessToken,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
