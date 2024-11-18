import axios from "axios";

const defaultOptions = {
    baseURL: "https://projector.pidor.dev/api/",
    headers: {
        'Content-Type': 'application/json',
    }
};

export default class APIService {
    #axiosInstance;

    constructor(token) {
        this.#axiosInstance = axios.create(defaultOptions);
        this.#axiosInstance.interceptors.request.use(function (config) {
            if(token !== null) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });
    }
}

