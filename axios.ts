import Axios from "axios";

const axios = Axios.create({
  headers: { "caller-app-id": "BISpublic" }
});

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => Promise.reject(error)
);

export default axios;
