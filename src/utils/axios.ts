import { useClientStore } from "@/stores";
import axios from "axios";
import router from "@/router";
import { ElMessage } from "element-plus";

const baseURL = "https://trading.sakurapuare.com/api/";

const instance = axios.create({
  baseURL,
  timeout: 100000,
});

instance.interceptors.request.use(
  (config) => {
    const clientStore = useClientStore();
    if (clientStore.token) {
      config.headers.Authorization = clientStore.token;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

instance.interceptors.response.use(
  (res) => {
    if (res.data.code === 200) {
      return res;
    }
   
    return Promise.reject(res.data);
  },
  (err) => {
    ElMessage({
      message: err.response.data.msg || "服务异常",
      type: "error",
    });
    if (err.response?.status === 401) {
      router.push("/login").then(() => {});
    }
    return Promise.reject(err);
  }
);

export default instance;
export { baseURL };

export interface Data<T> {
  code: string;
  msg: string;
  data: T;
}
