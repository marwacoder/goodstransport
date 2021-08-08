<template>
    <div>
        <Menubar :model="items">
            <template #start>
            </template>
            <template #end>
                <InputText placeholder="Search" type="text" />
            </template>
        </Menubar>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    name: 'MenuBar',
     setup() {
        const items = ref([
            {   
               label:'Home',
               icon:'pi pi-fw pi-home',
               to: '/dashboard',
               
            },
            {
                label:'Manage Goods',
                 to: '/goods'
            
               
            },
            {
                label:'Vehicle',
                 to: '/vehicle'
            
               
            },
            {
                label:'Employee',
                icon:'pi pi-fw pi-users',
                to:'/employees'
           
               
            },
            {
                label:'Driver',
                icon:'pi pi-fw pi-users',
                to:'/driver'
           
               
            },
            {
                label:'Customer',
                icon:'pi pi-fw pi-users',
                to: '/customer'
                     },
            {
               label:'Location',
               icon:'pi pi-fw pi-map-marker',
               to:'/location'
               
            },
            {
               label:'Settings',
               icon:'pi pi-fw pi-user',
            //    to:'/profile'
               items:[
                    {
                        label:'Account',
                        icon:'pi pi-fw pi-user',
                        to: '/account'
                    },
                    
                    {
                        separator:true
                    },
                    {
                        label:'Profile',
                        icon:'pi pi-fw pi-user',
                        to:'/profile'
                    }
               ]
            },
            
        ]);

        return { items }
    }
}
</script>

