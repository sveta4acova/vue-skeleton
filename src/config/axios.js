import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://vue-test-bd584.firebaseio.com/'
});

export default instance;
