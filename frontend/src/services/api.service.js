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

    async getUserInfo() {
        try {
            const response = await this.#axiosInstance.get("users/me");
            return response.data;
        } catch (error) {
            alert("Ошибка получения информации пользователя");
        }
    }

    async patchUserInfo(userData) {
        try {
            const response = await this.#axiosInstance.patch(`users/me`, userData);
            return response.data;
        } catch (error) {
            alert("Ошибка изменения пользовательских данных");
        }
    }

    async createProject(name) {
        try {
            const response = await this.#axiosInstance.post(`projects`, {name});
            return response.data;
        } catch (error) {
            alert("Ошибка создания проекта");
        }
    }

    async getCurrentTasks() {
        try {
            const response = await this.#axiosInstance.get("users/me/pending-tasks");
            return response.data;
        } catch (error) {
            alert("Ошибка при получении текущих задач");
        }
    }

    async getMyProjects() {
        try {
            const response = await this.#axiosInstance.get("users/me/projects");
            return response.data;
        } catch (error) {
            alert("Ошибка при получении списка проектов");
        }
    }

    async getInvites() {
        try {
            const response = await this.#axiosInstance.get("users/me/invites");
            return response.data;
        } catch (error) {
            alert("Ошибка при получении списка приглашений");
        }
    }
}

