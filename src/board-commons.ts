import axios, { AxiosInstance } from 'axios'
// NodeJS => 임의로 포트
const boardClient = axios.create({
    baseURL: "http://localhost:3355",
    headers: {
        "Content-Type": "application/json"
    }
})
export default boardClient