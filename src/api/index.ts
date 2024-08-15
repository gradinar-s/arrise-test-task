import axios from "axios";

export default axios.create({
  // The URL should be in a .env file. I left it here so you don't have to do extra steps to run the project locally
  baseURL: "https://60f7b35b9cdca00017454f5e.mockapi.io/api/v1",
});
