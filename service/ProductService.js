import axios from 'axios';


 export const   getProducts =()=> {
        return axios.get('http://localhost:5000/data')
            .then(data => data.data);
    }

    export const   getCustomers =()=> {
        return axios.get('http://localhost:5000/data')
            .then(data => data.data);
    }

  
    