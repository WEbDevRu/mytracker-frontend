
import * as axios from 'axios';
import store from "../redux/redux-store";
const axiosInstance = axios.create({
    baseURL: 'https://trackyour.site:3443/users/'
})

export const usersAPI = {
    getCounterUsers(counterId, page, limit){
        return axiosInstance.get('/counter/'+counterId, {headers: {"Authorization": "Bearer "+store.getState().auth.token}, params: {page: page, limit: limit}})
                .then(response =>{
                    return response.data;
                })
    },
    getProfileUsers(page,limit){
        return axiosInstance.get('/profile', {headers: {"Authorization": "Bearer "+store.getState().auth.token}, params: {page: page, limit: limit}})
                .then(response =>{
                    return response.data
                })
    },
    getUser(tysId){
        return  axiosInstance.get('/user/'+tysId)
                .then(response =>{
                    return response.data;
                })
    }
}





