import axios from 'axios';

const callAPI = (endpoint, method = 'GET', body) => {
    let token = document.cookie && document.cookie.split(';').find(n => n.includes('authorization')) ? document.cookie.split(';').find(n => n.includes('authorization')).split('=')[1] : '';
    
    if (token !== '') {
        return axios({
            method: method,
            url: endpoint,
            data: body,
            headers: {
                "authorization": token,
                "accept": "application/json"
            }
        })
        .then(data => {
            if(!data.data){
                return false;
            }else{
                return data;
            }
        })
        .catch(err => {
            console.log(err.err);
        });
    }else{
        return new Promise((res, rej) => {
            res(false)
        })
    }
}

export default callAPI;