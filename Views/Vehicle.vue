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
                        <h5 class="p-m-0">Vehicles Details</h5>
                        <span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global']" placeholder="Search..." />
                        </span>
                    </div>
                </template>

                <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
                <Column field="model" header="Vehicle Model" :sortable="true" style="min-width:16rem"></Column>
                <Column field="platNumber" header="Plate No" :sortable="true" style="min-width:16rem"></Column>
                <Column field="tonnage" header="Vehicle Tonnage" :sortable="true" style="min-width:10rem">>
                 style="min-width:16rem">>
               
                
                    <!-- <template #body="slotProps">
                        <span :class="'employee-phone no-' + (slotProps.data.phone-number ? slotProps.data.phone-no.toLowerCase() : '')">{{slotProps.data.phone-no}}</span>
                    </template> -->
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
           
                   

            <div class="vehiclemodel-field">
                <label for="model">Vehicle Model</label>
                <InputText id="model" v-model.trim="product.model" required="true" autofocus :class="{'p-invalid': submitted && !product.model}" />
                <small class="p-error" v-if="submitted && !product.model">Vehicle Model is required.</small>
            </div>
            <div class="plateno-field">
                <label for="plateno">Plate No</label>
                <InputText id="plateno" v-model.trim="product.platNumber" required="true" autofocus :class="{'p-invalid': submitted && !product.platNumber}" />
                <small class="p-error" v-if="submitted && !product.platNumber">Plate No is required.</small>
            </div>
            <div class="vehicletonnage-field">
                <label for="vehicletonnage.">Vehicle Tonnage in KG</label>
                <InputText id="vehicletonnage" v-model.trim="product.tonnage" required="true" autofocus :class="{'p-invalid': submitted && !product.tonnage}" />
                <small class="p-error" v-if="submitted && !product.tonnage">Vehicle Tonnage is required.</small>
            </div>
           
            <template #footer>
                <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
                <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveProduct" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteProductDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
                <span v-if="product">Are you sure you want to delete <b>{{product.platNumber}}</b>?</span>
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

import {getVehicles, postVehicle, amendVehicle, destroyVehicle} from '../service/ProductService';

export default {
    setup() {
        onMounted(() => {
            initialize()
        })

        const toast = <Toast/>
        const dt = ref();
        const products = ref();
        const productDialog = ref(false);
        const deleteProductDialog = ref(false);
        const deleteProductsDialog = ref(false);
        const product = ref({});
        const index = ref();
        const selectedProducts = ref();
        const filters = ref({});
        const submitted = ref(false);
        const statuses = ref([
	     	{label: 'LOADER', value: 'Labourer'},
	     	{label: 'LOWSTOCK', value: 'lowstock'},
	     	{label: 'OUTOFSTOCK', value: 'outofstock'}
        ]);

        const formatCurrency = (value) => {
            if(value)
				return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
			return;
        };
        const initialize =()=> {
             getVehicles().then(data => products.value = data.vehicles)
        }
        const openNew = () => {
            product.value = {};
            submitted.value = false;
            productDialog.value = true;
        };
        const hideDialog = () => {
            productDialog.value = false;
            submitted.value = false;
        };
        const saveProduct = () => {
            submitted.value = true;
        const {id, model, platNumber, tonnage} = product.value
        console.log(id,'id')
                if (product.value.id) {
                    amendVehicle({id, model, platNumber, tonnage}).then(data =>{ 
            console.log(data)
        initialize()
        
        }).catch((error)=> {
    
            console.log(error)
        })
                
            }else {
                postVehicle({model, platNumber, tonnage}).then(data =>{ 
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
            deleteProductDialog.value = true;
        };
        const deleteProduct = () => {
           destroyVehicle(index.value).then(data =>{ 
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

        return { dt, products, productDialog, deleteProductDialog, deleteProductsDialog, product, 
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