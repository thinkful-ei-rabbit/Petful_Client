const dev = {
  API_ENDPOINT: 'http://localhost:8000/petful/',
};

const prod = {
  API_ENDPOINT: 'https://petful-app-server.herokuapp.com/',
};

const config = process.env.NODE_ENV === 'production' ? prod : dev;

export default {
  ...config,
};
