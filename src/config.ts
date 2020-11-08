const dev = {
  API_ENDPOINT: 'http://localhost:8000/petful/',
};

const prod = {
  API_ENDPOINT: 'https://AmazingName.herokuapp.com/petful',
};

const config = process.env.NODE_ENV === 'production' ? prod : dev;

export default {
  ...config,
};
