import axios from "axios";
import env from "env";

const axiosInstance = axios.create({ baseURL: env.REACT_APP_BACEND_URL });

export default axiosInstance;
