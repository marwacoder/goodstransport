import axios from 'axios';


 export const   getGoods =()=> {
        return axios.get('http://localhost:8000/logistics/goods')
            .then(data => data.data);
    }


    export const   postGoods =({goodsName, description, category, quantity, customerId})=> {
        return axios.post('http://localhost:8000/logistics/goods',{goodsName, description, category, quantity, customerId})
            .then(data => data.data);
    }

    export const   amendGoods =({id, goodsName, description, category, quantity})=> {
        return axios.post(`http://localhost:8000/logistics/goods/amend/${id}`,{goodsName, description, category, quantity})
            .then(data => data.data);
    }

    export const   destroyGoods =(id)=> {
        return axios.post(`http://localhost:8000/logistics/goods/destroy/${id}`)
            .then(data => data.data);
    }

    export const   getDrivers =()=> {
        return axios.get('http://localhost:8000/logistics/driver')
            .then(data => data.data);
    }

    export const   postDriver =({fullName, gender, email, phoneNumber, contactAddress, licenceNo})=> {
        return axios.post('http://localhost:8000/logistics/driver',{fullName, gender, email, phoneNumber, contactAddress, licenceNo})
            .then(data => data.data);
    }
    export const   amendDriver =({id, fullName, gender, email, phoneNumber, contactAddress, licenceNo})=> {
        return axios.post(`http://localhost:8000/logistics/driver/amend/${id}`,{fullName, gender, email, phoneNumber, contactAddress, licenceNo})
            .then(data => data.data);
    }
    

    export const   destroyDriver =(id)=> {
        return axios.post(`http://localhost:8000/logistics/driver/destroy/${id}`)
            .then(data => data.data);
    }


    export const   getVehicles =()=> {
        return axios.get('http://localhost:8000/logistics/vehicle')
            .then(data => data.data);
    }

    export const   postVehicle =({model, platNumber, tonnage})=> {
        return axios.post('http://localhost:8000/logistics/vehicle',{model, platNumber, tonnage})
            .then(data => data.data);
    }
    export const   amendVehicle =({id, model, platNumber, tonnage})=> {
        return axios.post(`http://localhost:8000/logistics/vehicle/amend/${id}`,{model, platNumber, tonnage})
            .then(data => data.data);
    }
    

    export const   destroyVehicle =(id)=> {
        return axios.post(`http://localhost:8000/logistics/vehicle/destroy/${id}`)
            .then(data => data.data);
    }

    export const   getCustomers =()=> {
        return axios.get('http://localhost:5000/data')
            .then(data => data.data);
    }

