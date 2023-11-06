import axios from "axios";

const apiKey = 'bVlvZcQQ118QYQI0xIGb3Q==7XbKCsp8fn74lzHd';

const Api = axios.create({
    baseURL: 'https://api.api-ninjas.com/v1',
    headers: {
        'X-API-Key': apiKey ,
      },
    });
    
    
   
    
export default Api