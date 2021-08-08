
<template >

    <Card style="width: 50%" class="profilecontainer" >
        
       <template  #title>
      <div class="p-formgroup-inline">  PROFILE SETUP </div>
    </template>
   
    <template #content  >
        <div class="p-formgroup-inline">
                <div class="p-field">
                    
                    <label for="firstname5" class="p-sr-only">Firstname</label>
                    
                    <InputText id="firstname5" type="text" placeholder="Firstname"/>
                </div>
                <div class="p-field">
                    <label for="lastname5" class="p-sr-only">Lastname</label>
                    <InputText id="lastname5" type="text" placeholder="Lastname" />
                </div>
            </div>
            

            <div class="p-formgroup-inline">
         <div class="p-field">
                <label for="gender" class="p-sr-only"></label>
                <Dropdown inputId="gender" v-model="selectedGender" :options="gender1" optionLabel="name" placeholder="Select Gender " />
        </div>
        <div class="p-field">
                    <label for="email" class="p-sr-only">E-mail</label>
                    <InputText id="E-mail" type="text" placeholder="E-mail" />
                </div>
                </div>

         <div class="p-formgroup-inline">
        <div class="p-field">
                    <label for="state" class="p-sr-only"></label>
                    <Dropdown inputId="state" v-model="selectedState" :options="states" optionLabel="name" placeholder="Select State" />
                </div>
                <div class="p-field">
                    <label for="city" class="p-sr-only">City</label>
                    <InputText id="city" type="text" Placeholder="City" />
                </div>
                </div>

              <div class="p-formgroup-inline">
        <div class="p-field">  
                <Password v-model="value3" toggleMask></Password>
                </div>
                <div class ="p-field">
                    <Password v-model="value2"  placeholder="Confirm Passowrd"> </Password>

        </div>
        </div>
        <div class="p-formgroup-inline">
        <div class="p-field"> 
                    <label for="address"></label>
            <Textarea id="address" rows="3"  cols="53" placeholder="Enter current home Address"/>
            </div>
        </div>
    </template>
    <template #footer>
        <div class="p-formgroup-inline">
         <Button label="Submit" @click="handleClick($event)"/>
        </div>
    </template>
            
    </Card>


</template>

<script>
export default {
    data() {
        return {
            selectedState: null,
            states: [
                {name: 'Lagos', code: 'Lagos'},
                {name: 'Kaduna', value: 'Kaduna'},
                {name: 'Kwara', code: 'Kwara'},
                {name: 'Imo', code: 'Imo'},
                {name: 'Ibadan', code: 'Ibadan'}
            ],
            cities1: [],
            cities2: [],
            city1: null,
            city2: null,
            selectedGender: null,
            gender1: [
                {name: 'Male', code: 'Male'},
                {name: 'Female', value: 'Female'}
                
            ],
            ml: [],
            ml1: [],
             ct: null,
            ct1: null
        }
    }
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 489px) {
    // .p-formgroup-inline {
    //     .p-field {
    //         margin-bottom: 1em !important;
    //     }
    // }
}

.layout-content .content-section.implementation > h3 {
    font-weight: 600;
}
.profilecontainer{
position: dynamic;
top: 10em; left: 20em; right: 20em; bottom: 2em;
margin: auto;
width: _n_;
height: _n_;
margin-left: auto;
margin-right: auto;
margin-top: 50px;
box-shadow: rgb(80, 170, 219) 1px 3px 1px 3px;
}
// .p-formgroup-inline{
//     position: dynamic;
//     margin:0 auto;
//     width: 40%;

// }
textarea {
    resize: auto;
}


.p-dropdown {
    width: 12rem;
}

.country-item {
    img {
        width: 17px;
        margin-right: 0.5rem;
    }
}
</style>