import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class TasksView{
    constructor(){}

    getTasks() {
        const dest = `${API_URL}/api/tasks/`;
        var token = localStorage.getItem('token');
        console.log(token);
        return axios({
            method: 'get',
            url: dest,
            headers: {'Authorization': `JWT ${token}`},
        })
        .then(response => response.data);
    }

    createTask(task) {
        const dest = `${API_URL}/api/tasks/`;
        var token = localStorage.getItem('token');
        console.log(token);
        return axios({
            method: 'post',
            url: dest,
            data: task,
            headers: {'Authorization': `JWT ${token}`},
        });
    }
}