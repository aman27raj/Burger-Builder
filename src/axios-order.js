import Axios from 'axios';

const instance =  Axios.create({
    baseURL: 'https://burger-builder-b0f77.firebaseio.com/'
})

export default instance;