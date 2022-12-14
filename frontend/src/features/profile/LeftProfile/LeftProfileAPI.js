import axios from 'axios';
import { useCallback } from 'react';
import {
  API_URL,
  user,
  accessToken,
  getConfig,
} from '../../../common/api/http-config';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { profileActions } from '../profileSlice';
// sweetalert
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// const config = {
//   headers: { "Content-Type": "application/json" },
// };
// const user = JSON.parse(localStorage.getItem('user'));
// const accessToken = user ? user.accessToken : null;
// const getConfig = { headers: { 'X-Auth-Token': accessToken } };

// const API_URL = 'http://127.0.0.1:8080/';
// 리덕스랑 관련없는 서버 통신 API들 모음

// 프로필 기본정보(username, languages, favorites) API

const MySwal = withReactContent(Swal);

export const fetchProfile = async (userId) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const accessToken = user ? user.accessToken : null;
  const getConfig = { headers: { 'X-Auth-Token': accessToken } };
  // console.log('fetch 프로필 세부정보');

  try {
    const response = await axios.get(
      API_URL + `user/profile/${userId}`,
      // 엑세스 토큰이 필요하다.
      getConfig
    );
    console.log(response.data.data);
    return response.data.data;
  } catch (err) {
    console.log('프로필 에러');
    return err.response;
  }
};

// // 프로필 이미지 불러오는 API
export const fetchProfileImg = async (userId) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const accessToken = user ? user.accessToken : null;
  const getConfig = { headers: { 'X-Auth-Token': accessToken } };
  // console.log('fetch 이미지');

  try {
    const response = await axios.get(
      API_URL + `image/profile/${userId}.jpg`,
      getConfig
    );
    // console.log( '나는 이미지', response.config.url)

    return response.config.url;
  } catch (err) {
    console.log('에러');
    return err.response;
  }
};

// description 불러오는 API
export const fetchDescription = async (userId) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const accessToken = user ? user.accessToken : null;
  const getConfig = { headers: { 'X-Auth-Token': accessToken } };
  // console.log('fetch description');

  try {
    const response = await axios.get(
      API_URL + `user/description/${userId}`,
      // 엑세스 토큰이 필요하다.
      getConfig
    );
    // console.log(response.data.data)
    return response.data.data;
  } catch (err) {
    console.log('에러');
    return err.response;
  }
};

// Profile Image put 요청 API
export const uploadProfileImg = async (uploadedProfileImg) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const accessToken = user ? user.accessToken : null;
  // const getConfig = { headers: { 'X-Auth-Token': accessToken } };
  console.log('프로필 사진 업로드 시작');
  // console.log(uploadedProfileImg);

  try {
    if (uploadedProfileImg) {
      const formData = new FormData();
      formData.append('imageFile', uploadedProfileImg);
      await axios.put(
        API_URL + `user/image`,
        formData,
        // 엑세스 토큰이 필요하다.
        {
          headers: {
            'X-Auth-Token': accessToken,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      MySwal.fire({
        icon: 'success',
        title: '사진이 등록되었습니다!!',
      });

      // const previewImageURL = URL.createObjectURL(uploadedProfileImg);
      // setUploadedProfileImg({
      //   profileImageFile: '',
      // });
    }
  } catch (err) {
    console.log('에러', err);
    MySwal.fire({
      icon: 'error',
      title: '사진이 등록되지 않았습니다.',
    });
  }
};

export const submitDescription = async (uploadedDescription) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const accessToken = user ? user.accessToken : null;
  // const getConfig = { headers: { 'X-Auth-Token': accessToken } };
  // console.log('업로드 시작');
  console.log('업로드 시작 api', uploadedDescription);

  try {
    await axios.put(
      API_URL + `user/description`,
      { description: uploadedDescription },
      // 엑세스 토큰이 필요하다.
      {
        headers: {
          'X-Auth-Token': accessToken,
          'Content-Type': 'application/json',
        },
      }
    );
    // alert('자기소개가 등록되었습니다!');
  } catch (err) {
    console.log('에러');
    alert('자기소개를 등록하세요!');
  }
};
