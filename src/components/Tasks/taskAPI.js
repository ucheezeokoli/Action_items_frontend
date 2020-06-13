import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class TasksView{

    // Request tasks from database
    // **Dev** Supply TOKEN for authentication, and to get specific user's task(s)
    getTasks() {
        const dest = `${API_URL}/api/tasks/`;
        var token = localStorage.getItem('access_token');
        //console.log(token);
        return axios({
            method: 'get',
            url: dest,
            headers: {'Authorization' : `JWT ${token}`},
        })
        .then(response => response.data)
        
    }

    // Same as getTasks().
    // **Backend Dev** resolve supplied token with user and create new task linked to user.
    createTask(task) {
        const dest = `${API_URL}/api/tasks/`;
        var token = localStorage.getItem('access_token');
        //console.log(token);
        return axios({
            method: 'post',
            url: dest,
            data: task,
            headers: {'Authorization': `JWT ${token}`},
        });
    }
}