import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class TasksView{
    constructor(){}

    getTasks() {
        console.log("get tasks");
        const url = `${API_URL}/api/tasks/`;
        return axios.get(url).then(response => response.data);
    }

    createTask(task) {
        const url = `${API_URL}/api/tasks/`;
        return axios.post(url,task);
    }
}