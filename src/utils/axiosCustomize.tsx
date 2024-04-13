import axios from "axios";

// customize api from backend that the default api is baseURL
const instance = axios.create({
    baseURL: 'http://localhost:8081/',
});


//"Interceptors" are middleware functions that allow you to intercept and handle HTTP requests before they are sent or process responses from the server before they are returned to your application.

// call API have 2 main methods that are request and response

  // Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  // console.log("interceptor: ", response);
  return (response && response.data) ? response.data : response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  // console.log("error: ",error);
  return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
});
export default instance;