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

    

    export const   dispatchGoods =({quantity,  driverId, id})=> {
        return axios.post(`http://localhost:8000/logistics/dispatch`,{quantity,  driverId, id})
            .then(data => data.data);
    }
    export const   getDispatchGoods =()=> {
        return axios.get(`http://localhost:8000/logistics/dispatch`)
            .then(data => data.data);
    }

    export const   destroyDispatchGoods =({id})=> {
        return axios.post(`http://localhost:8000/logistics/dispatch/destroy/${id}`)
            .then(data => data.data);
    }

    export const   postEmployee =({employeeName, gender, email, phoneNumber, employeeType})=> {
        return axios.post(`http://localhost:8000/logistics/employee`,{employeeName, gender, email, phoneNumber, employeeType})
            .then(data => data.data);
    }

    export const   amendEmployee =({id, employeeName, gender, email, phoneNumber, employeeType})=> {
        return axios.post(`http://localhost:8000/logistics/employee/amend/${id}`,{employeeName, gender, email, phoneNumber, employeeType})
            .then(data => data.data);
    }

    export const   getEmployees =()=> {
        return axios.get(`http://localhost:8000/logistics/employee`)
            .then(data => data.data);
    }

    export const   destroyEmployee =({id})=> {
        return axios.post(`http://localhost:8000/logistics/employee/destroy/${id}`)
            .then(data => data.data);
    }

    export const   getCustomers =()=> {
        return axios.get('http://localhost:8000/logistics/customer')
            .then(data => data.data);
    }


    export const   postCustomer =({fullName, gender, email, phoneNumber, driverId, goodsId, vehicleId})=> {
        return axios.post(`http://localhost:8000/logistics/customer`,{fullName, gender, email, phoneNumber, driverId, goodsId, vehicleId})
            .then(data => data.data);
    }

    export const   amendCustomer =({id, fullName, gender, email, phoneNumber})=> {
        return axios.post(`http://localhost:8000/logistics/customer/amend/${id}`,{fullName, gender, email, phoneNumber})
            .then(data => data.data);
    }

    export const   destroyCustomer =({id})=> {
        return axios.post(`http://localhost:8000/logistics/customer/destroy/${id}`)
            .then(data => data.data);
    }

    export const   authentication =({username, password})=> {
        return axios.post(`http://localhost:8000/logistics/login/action/`,{username, password})
            .then(data => data.data);
    }

    
