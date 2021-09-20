<template #section>
<table class="cards" >
<div class="p-formgroup-inline">
    <div class="card">
            <h3>Login Page</h3>
            <form @submit="submitHandler">
            <div class="p-field p-grid">
               
                <label for="email" class="p-col-fixed" style="width:100px">E-mail</label>
                <div class="p-col">
                    <InputText id="email" type="text" v-model="username" />
               
                </div> 
            </div>
            <div class="p-field p-grid">
                <label for="password" class="p-col-fixed" style="width:100px">Password</label>
                <div class="p-col">
                    <InputText id="password" type="password" v-model="password"/>
                </div>
            </div>

             <div>
                <Button type="submit" label="Submit"  />
            </div>
            </form>
        </div>
</div>
</table>
</template>

<script>
import { ref, onMounted } from 'vue';

import {authentication} from '../service/ProductService';

export default {
    setup() {
        const username = ref()
        const password = ref()
    const submitHandler = (e) => {
        e.preventDefault()
    console.log(password.value, 'pppp')

         authentication({username: username.value, password: password.value}).then(data => {
             console.log(data,'hey')
             localStorage.setItem('role', data.role)
             this.$router.push({ name: 'login', query: { redirect: '/dashboard' } });
         })

    }

        return {submitHandler, username, password}
    }
}
</script>


<style lang="scss" scope>

body{
    background-image: url("../src/assets/b.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}
.cards{
    margin-left: auto;
    margin-right: auto;
    margin-top: 100px;
    padding-left: 100px;
    padding-bottom: 120px;
    padding-right: 100px;
    box-shadow: rgb(34, 110, 192)  1px 1px 5px 1px;
}
.card{
    margin-left: auto;
    margin-right: auto;
    margin-top: 80px;
    
}

</style>