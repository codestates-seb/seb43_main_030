import axios from 'axios';

// 성공 시 then 은 각 파일에서 추가로 작성하기
export const axiosGet = url => {
  return axios
    .get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    })
    .catch(err => {
      console.log(err);
    });
};

export const axiosPost = (url, data) => {
  return axios
    .post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    })
    .catch(err => {
      console.log(err);
    });
};
