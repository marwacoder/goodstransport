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

                <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
                <Column field="name" header="Name" :sortable="true" style="min-width:16rem"></Column>
                <Column field="gender" header="Gender" :sortable="true" style="min-width:16rem"></Column>
                <Column field="customer-goods-status" header="Customer Goods Status" :sortable="true" style="min-width:10rem">></Column>
                <Column field="Phone-number" header="Phone No" :sortable="true" style="min-width:12rem">></column>
                 <Column field="address" header="Address" :sortable="true" style="min-width:16rem">>
               
                
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
           
                   

            <div class="name-field">
                <label for="name">Name</label>
                <InputText id="name" v-model.trim="product.name" required="true" autofocus :class="{'p-invalid': submitted && !product.name}" />
                <small class="p-error" v-if="submitted && !product.name">Name is required.</small>
            </div>
            <div class="gender-field">
                <label for="gender">Gender</label>
                <InputText id="gender" v-model.trim="product.gender" required="true" autofocus :class="{'p-invalid': submitted && !product.gender}" />
                <small class="p-error" v-if="submitted && !product.gender">Gender is required.</small>
            </div>
            <div class="cgs-field">
                <label for="cgs.">Customer Goods Status</label>
                <InputText id="cgs" v-model.trim="product.cgs" required="true" autofocus :class="{'p-invalid': submitted && !product.cgs}" />
                <small class="p-error" v-if="submitted && !product.cgs">Customer goods status is required.</small>
            </div>
             <div class="phone-field">
                <label for="address.">Phone No</label>
                <InputText id="phone" v-model.trim="product.phone" required="true" autofocus :class="{'p-invalid': submitted && !product.phone}" />
                <small class="p-error" v-if="submitted && !product.phone">Phone number is required.</small>
            </div>
           
            <!-- <div class="status-field">
                <label for="dogc.">Employee Status</label>
                <InputText id="status" v-model.trim="product.status" required="true" autofocus :class="{'p-invalid': submitted && !product.status}" />
                <small class="p-error" v-if="submitted && !product.status">Status is required.</small>
            </div> -->
            <div class="address-field">
                <label for="address.">Address</label>
                <InputText id="address" v-model.trim="product.address" required="true" autofocus :class="{'p-invalid': submitted && !product.address}" />
                <small class="p-error" v-if="submitted && !product.address">Address is required.</small>
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

import {getCustomers} from '../service/ProductService';

export default {
    setup() {
        onMounted(() => {
            getCustomers().then(data => products.value = data);
        })

        const toast = <Toast/>
        const dt = ref();
        const products = ref();
        const productDialog = ref(false);
        const deleteProductDialog = ref(false);
        const deleteProductsDialog = ref(false);
        const product = ref({});
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

			// if (product.value.name.trim()) {
            //     if (product.value.id) {
            //         product.value.inventoryStatus = product.value.inventoryStatus.value ? product.value.inventoryStatus.value : product.value.inventoryStatus;
            //         products.value[findIndexById(product.value.id)] = product.value;
            //         toast.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
            //     }
            //     else {
            //         product.value.id = createId();
            //         product.value.code = createId();
            //         product.value.image = 'product-placeholder.svg';
            //         product.value.inventoryStatus = product.value.inventoryStatus ? product.value.inventoryStatus.value : 'LABOURER';
            //         products.value.push(product.value);
            //         toast.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
            //     }

            //     productDialog.value = false;
            //     product.value = {};
            // }
        };
        const editProduct = (prod) => {
            product.value = {...prod};
            productDialog.value = true;
        };
        const confirmDeleteProduct = (prod) => {
            product.value = prod;
            deleteProductDialog.value = true;
        };
        const deleteProduct = () => {
            products.value = products.value.filter(val => val.id !== product.value.id);
            deleteProductDialog.value = false;
            product.value = {};
            toast.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
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