import axios from 'axios';

const apiHost = process.env.REACT_APP_API_HOST;

export default axios.create({
    baseURL:`${apiHost}/api`,
    withCredentials:true,
    // headers:{
    //     "Access-Control-Allow-Origin":'http://hocalhost:8080',
    //     "Access-Control-Allow-Methods":'POST,GET,PUT,DELETE',
    //     'Content-Type': 'application/x-www-form-urlencoded',
    // },
    validateStatus:status => true,
});