import axios from '@config/axios';

export default {
  login(data) {
    return axios.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAPWqf8ZPh3X6fjK7r7_U89jPKkPK1EdtA',
      {
        ...data,
        returnSecureToken: true,
      }
    );
  }
};
