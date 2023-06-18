import axios from "axios";

export default class Fetches {
    static async getTasks() {
        return  await axios.get('http://localhost:3000/api/data');
    }
    static async deleteOneTask(val, id) {
        return await axios.delete(`http://localhost:3000/api/data/${id}`, {
            text: val,
        })
    }
    static async deleteAllTasks() {
        return await axios.delete('http://localhost:3000/api/data');
    }
    static async addNewTask(val) {
        return await axios.post('http://localhost:3000/api/user',{
            text: val
        })
    }
    static async editTask(val, id, status) {
        return await axios.put(`http://localhost:3000/api/data/${id}`, {
            text: val,
            checked: status
        })
    }
}