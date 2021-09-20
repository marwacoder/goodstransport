<template>
    <div>
        <div class="card">
            <Toolbar class="p-mb-4">
                <template #left>
                    <Button label="New" icon="pi pi-plus" class="p-button-success p-mr-2" @click="openNew" />
                    <Button label="Delete" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />
                
                </template>

                <template #right>
                    <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="p-mr-2 p-d-inline-block" />
                    <Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />
                </template>
            </Toolbar>

            <DataTable ref="dt" :value="products" v-model:selection="selectedProducts" dataKey="id" 
                :paginator="true" :rows="10" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" responsiveLayout="scroll">
                <template #header>
                    <div class="table-header">
                        <h5 class="p-m-0">Customer Details</h5>
                        <span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global']" placeholder="Search..." />
                        </span>
                    </div>
                </template>

                
                <Column field="fullName" header="Name" :sortable="true" style="min-width:8rem"></Column>
                <Column field="gender" header="Gender" :sortable="true" style="min-width:2rem"></Column>
                <Column field="phoneNumber" header="Phone Number" :sortable="true" style="min-width:6rem">></Column>
                <Column field="email" header="Email Address" :sortable="true" style="min-width:6rem">></column>
                 <Column field="goods.goodsName" header="Goods Name" :sortable="true" style="min-width:8rem">></Column>
                 <Column field="goods.quantity" header="Quantity" :sortable="true" style="min-width:5rem">>
                </Column>
                <Column field="goods.status" header="Status" :sortable="true" style="min-width:5rem">>
                </Column>
                <Column field="drivers.fullName" header="Driver's Name" :sortable="true" style="min-width:5rem">>
                </Column>
                <Column field="vehicles.platNumber" header="Plate No" :sortable="true" style="min-width:5rem">>
                </Column>
               
                <Column :exportable="false">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" class="p-button-rounded p-button-success p-mr-2" @click="editProduct(slotProps.data)" />
                        <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="confirmDeleteProduct(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
        </div>

        <Dialog v-model:visible="productDialog" :style="{width: '450px'}" header="Customer Details" :modal="true" class="p-fluid">
           
                   

            <div class="name-field">
                <label for="name">Name</label>
                <InputText id="name" v-model.trim="product.fullName" required="true" autofocus :class="{'p-invalid': submitted && !product.fullName}" />
                <small class="p-error" v-if="submitted && !product.fullName">Name is required.</small>
            </div>
            <div class="gender-field">
                <label for="gender">Gender</label>
                <InputText id="gender" v-model.trim="product.gender" required="true" autofocus :class="{'p-invalid': submitted && !product.gender}" />
                <small class="p-error" v-if="submitted && !product.gender">Gender is required.</small>
            </div>
           <div class="phone-field">
                <label for="address.">Email Address</label>
                <InputText id="phone" v-model.trim="product.email" required="true" autofocus :class="{'p-invalid': submitted && !product.email}" />
                <small class="p-error" v-if="submitted && !product.email">Phone number is required.</small>
            </div>
             <div class="phone-field">
                <label for="address.">Phone No</label>
                <InputText id="phone" v-model.trim="product.phoneNumber" required="true" autofocus :class="{'p-invalid': submitted && !product.phoneNumber}" />
                <small class="p-error" v-if="submitted && !product.phoneNumber">Phone number is required.</small>
            </div>
           
          
            <div class="drivername-field">
                <label for="driverlicence.">Driver's Name'</label>
                <Dropdown inputId="driverName"  v-model="selectedDriver" :options="drivers" optionLabel="fullName" placeholder="Select Driver " />
                <small class="p-error" v-if="submitted && !selectedDriver">Driver Name is required.</small>
            </div>
            <div class="platNumber-field">
                <label for="platNumber.">Vehicle Plate Number'</label>
                <Dropdown inputId="platNumber"  v-model="selectedVehicle" :options="vehicles" optionLabel="platNumber" placeholder="Select Vehicle " />
                <small class="p-error" v-if="submitted && !selectedVehicle">Driver Name is required.</small>
            </div>
            <div class="goodsName-field">
                <label for="goodsName">Goods ID</label>
                <Dropdown inputId="goodsName"  v-model="selectedGood" :options="goods" optionLabel="goodsName" placeholder="Select Goods " />
                <small class="p-error" v-if="submitted ">Driver Name is required.</small>
            </div>
           
            <template #footer>
                <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
                <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveProduct" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteProductDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
                <span v-if="product">Are you sure you want to delete <b>{{product.name}}</b>?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteProductDialog = false"/>
                <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteProduct" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteProductsDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
                <span v-if="product">Are you sure you want to delete the selected products?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteProductsDialog = false"/>
                <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteSelectedProducts" />
            </template>
        </Dialog>
	</div>
</template>

<script>
import { ref, onMounted } from 'vue';

import {getCustomers, postCustomer, amendCustomer, getGoods, getDrivers, getVehicles, destroyCustomer} from '../service/ProductService';

export default {
    setup() {
        onMounted(() => {
            initialize()
        })

        const toast = <Toast/>
        const dt = ref();
        const drivers = ref()
        const vehicles = ref()
        const goods = ref()
        const products = ref();
        const selectedDriver = ref(null)
        const selectedVehicle = ref(null)
        const selectedGood = ref(null)
        const productDialog = ref(false);
        const deleteProductDialog = ref(false);
        const deleteProductsDialog = ref(false);
        const product = ref({});
        const index = ref()
        const selectedProducts = ref();
        const filters = ref({});
        const submitted = ref(false);
        const statuses = ref([
	     	{label: 'LOADER', value: 'Labourer'},
	     	{label: 'LOWSTOCK', value: 'lowstock'},
	     	{label: 'OUTOFSTOCK', value: 'outofstock'}
        ]);

        const initialize = () => {
             getCustomers().then(data => products.value = data.customers);
            getDrivers().then(data => drivers.value = data.drivers);
            getVehicles().then(data => vehicles.value = data.vehicles);
            getGoods().then(data => goods.value = data.goods);
        }

        const formatCurrency = (value) => {
            if(value)
				return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
			return;
        };
        const openNew = () => {
            product.value = {};
            submitted.value = false;
            productDialog.value = true;
            console.log(vehicles.value, 'goods')
        };
        const hideDialog = () => {
            productDialog.value = false;
            submitted.value = false;
        };
        const saveProduct = () => {
            submitted.value = true;
         const {id, fullName, gender, email, phoneNumber} = product.value
         console.log(id,'id')
                if (product.value.id) {
                    amendCustomer({
                        id, fullName, gender, email,
                        email, phoneNumber}).then(data =>{ 
            console.log(data)
        initialize()
        
        }).catch((error)=> {
    
            console.log(error)
        })
                
            }else {
                postCustomer({fullName, gender, email, phoneNumber, driverId: selectedDriver.value.id, 
                        goodsId: selectedGood.value.id, vehicleId: selectedVehicle.value.id}).then(data =>{ 
            console.log(data)
        initialize()
        
        }).catch((error)=> {
    
            console.log(error)
        })
            }

              
        
        };
        const editProduct = (prod) => {
            product.value = {...prod};
            productDialog.value = true;
        };
        const confirmDeleteProduct = (prod) => {
            const {id} = prod;
            index.value = id ;
            console.log(id,'index.value')
            
            deleteProductDialog.value = true;
         
         
        }
        const deleteProduct = () => {
           destroyCustomer({id: index.value}).then(data =>{ 
            console.log(data)
        initialize()
        
        }).catch((error)=> {
    
            console.log(error)
        })
            deleteProductDialog.value = false;
            product.value = {};
        };
        const findIndexById = (id) => {
            let index = -1;
            for (let i = 0; i < products.value.length; i++) {
                if (products.value[i].id === id) {
                    index = i;
                    break;
                }
            }

            return index;
        };
        const createId = () => {
            let id = '';
            var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for ( var i = 0; i < 5; i++ ) {
                id += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return id;
        }
        const exportCSV = () => {
            dt.value.exportCSV();
        };
        const confirmDeleteSelected = () => {
            deleteProductsDialog.value = true;
        };
        const deleteSelectedProducts = () => {
            products.value = products.value.filter(val => !selectedProducts.value.includes(val));
            deleteProductsDialog.value = false;
            selectedProducts.value = null;
            toast.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
        };

        return { dt, products, productDialog, deleteProductDialog, deleteProductsDialog, product, drivers, vehicles, goods, selectedDriver, selectedVehicle, selectedGood,
            selectedProducts, filters, submitted, statuses, formatCurrency, openNew, hideDialog, saveProduct, editProduct,
            confirmDeleteProduct, deleteProduct, findIndexById, createId, exportCSV, confirmDeleteSelected, deleteSelectedProducts}
    }
}
</script>

<style scoped>
.table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.product-image {
    width: 50px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.p-dialog .product-image {
    width: 50px;
    margin: 0 auto 2rem auto;
    display: block;
}

.confirmation-content {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>