<template>
    <div>
    
        <div class="card p-mt-5 p-m">
            <Toolbar class="p-mb-4">
                <template #left>
                    <Button label="New" icon="pi pi-plus" class="p-button-success p-mr-2" @click="openNew" />

                    <Button label="Delete" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />
                </template>
                     <template #right>
                    <Button label="Dispatch Product"  class="p-button-danger" @click="confirmDispatchProduct"/>

                     </template>
            </Toolbar>
            <DataTable ref="dt" :value="products" v-model:selection="selectedProducts" dataKey="id" 
                :paginator="true" :rows="10" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" responsiveLayout="scroll">
                <template #header>
                    <div class="table-header">
                        <h3 class="p-m-0">Manage Goods</h3>
                        <span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global']" placeholder="Search..." />
                        </span>
                    </div>
                </template>

                <Column selectionMode="multiple" style="width: 2rem" :exportable="false"></Column>
                <Column field="id" header="Goods ID" :sortable="true" style="min-width:3rem"></Column>
                <Column field="goodsName" header="Name" :sortable="true" style="min-width:10rem"></Column>
                <Column field="category" header="Category" :sortable="true" style="min-width:10rem"></Column>
                <Column field="quantity" header="Quantity" :sortable="true" style="min-width:10rem"> </Column>
               
               
                
                <Column :exportable="false">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" class="p-button-rounded p-button-success p-mr-2" @click="editProduct(slotProps.data)" />
                        <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="confirmDeleteProduct(slotProps.data)" />
                        
                    </template>
                </Column>
            </DataTable>
        </div>

        <Dialog v-model:visible="productDialog" :style="{width: '450px'}" header="Product Details" :modal="true" class="p-fluid">
         
            <div class="p-field">
                <label for="name">Name</label>
                <InputText id="name" v-model.trim="product.goodsName" required="true" autofocus :class="{'p-invalid': submitted && !product.goodsName}" />
                <small class="p-error" v-if="submitted && !product.goodsName">Name is required.</small>
            </div>
        
        

            <div class="p-field">
                <label for="name">Category</label>
                <InputText id="name" v-model.trim="product.category" required="true" autofocus :class="{'p-invalid': submitted && !product.category}" />
                <small class="p-error" v-if="submitted && !product.category">Category</small>
            </div>
            <div class="p-formgrid p-grid">
                <div class="p-field p-col">
                    <label for="quantity">Quantity</label>
                    <InputNumber id="quantity" v-model="product.quantity" integeronly />
                </div>
            </div>
            <template #footer>
                <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
                <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveProduct" />
            </template>
        </Dialog>

        
      <Dialog v-model:visible="dispatchProductsDialog" :style="{width: '450px'}" header="Dispatch Product" class="p-fluid" :modal="true">
               <div class="vehiclemodel-field">
                <label for="productName.">Product Name</label>
                <Dropdown inputId="productName" v-model="selectedGoods" :options="products" optionLabel="goodsName" placeholder="Select Goods " />
                <small class="p-error" v-if="submitted && !product.goodsName">Product Name is required.</small>
            </div>
            <div class="quantity-field">
                <label for="quantity">Quantity</label>
                <InputNumber id="quantity" v-model="quantity" required="true" autofocus :class="{'p-invalid': submitted && !quantity}" />
                <small class="p-error" v-if="submitted && !quantity">Quantity is required.</small>
            </div>
            <div class="drivername-field">
                <label for="driverlicence.">Driver's Name'</label>
                <Dropdown inputId="driverName"  v-model="selectedDriver" :options="drivers" optionLabel="fullName" placeholder="Select Driver " />
                <small class="p-error" v-if="submitted && !drivers.fullName">Driver Name is required.</small>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" class="p-button-text" @click="dispatchProductsDialog = false"/>
                <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="dispatch" />
            </template>
        </Dialog>
        <Dialog v-model:visible="deleteProductsDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
                <span v-if="product">Are you sure you want to delete the selected products?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteProductsDialog = false"/>
                <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteProduct" />
            </template>
        </Dialog>
	</div>
</template>

<script>
import { ref, onMounted } from 'vue';
import {getGoods, postGoods, amendGoods, destroyGoods, getDrivers, dispatchGoods} from '../service/ProductService';


export default {
    setup() {
        onMounted(() => {
           initialize()
        })

        
        const dt = ref();
        const drivers = ref();
        const products = ref();
        const productDialog = ref(false);
        const deleteProductDialog = ref(false);
        const deleteProductsDialog = ref(false);
        const dispatchProductsDialog = ref(false);
        const dispatchProduct = ref({
            driverId: '',
            id: ''
        })
        const index = ref()
        const selectedGoods = ref(null)
        const selectedDriver = ref(null);
        const quantity = ref(null)
        const product = ref({});
        const selectedProducts = ref();
        const filters = ref({});
        const submitted = ref(false);
        const statuses = ref([
	     	{label: 'LOADED', value: 'LOADED'},
	     	{label: 'LOWSTOCK', value: 'lowstock'},
	     	{label: 'OUTOFSTOCK', value: 'outofstock'}
        ]);

        const formatCurrency = (value) => {
            if(value)
				return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
			return;
        };
        

        const initialize =()=> {
             getGoods().then(data => products.value = data.goods)
              getDrivers().then(data => drivers.value = data.drivers)
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
        const {id, goodsName, description, category, quantity} = product.value
        console.log(id,'id')
                if (product.value.id) {
                    amendGoods({id, goodsName, description, category, quantity}).then(data =>{ 
            console.log(data)
        initialize()
        
        }).catch((error)=> {
    
            console.log(error)
        })
                
            }else {
                postGoods({goodsName, description, category, quantity}).then(data =>{ 
            console.log(data)
        initialize()
        
        }).catch((error)=> {
    
            console.log(error)
        })
            }

              
        
        };

        
        const editProduct = (prod) => {
           
            const  {id, goodsName, description, category, quantity} = prod
            product.value.id = id;
            product.value.goodsName = goodsName;
            product.value.description = description;
            product.value.category = category;
            product.value.quantity = quantity;

        
              
        
            productDialog.value = true;
        };
        const confirmDeleteProduct = (prod) => {
            const {id} = prod;
            index.value = id ;
            console.log(id,'index.value')
            
            deleteProductsDialog.value = true;
         
         
        }
console.log(selectedDriver,'selectedDriver')
        const confirmDispatchProduct = (prod) => {
            const {id} = prod;
            index.value = id ;
            dispatchProductsDialog.value = true;
            console.log(prod,'hello')
            
         
         
        }
        const dispatchProductHandler =(prod)=>{
            console.log(prod,'prod')
        }

        const dispatch =()=> {
            console.log(quantity.value,'tttt')
             dispatchGoods({quantity: quantity.value,  driverId: selectedDriver.value.id, id: selectedGoods.value.id}).then(data =>{ 
            console.log(data)
        initialize()
        
        }).catch((error)=> {
    
            console.log(error)
        })
        }
        
        const deleteProduct = () => {
            
            
             destroyGoods(index.value).then(data =>{ 
            console.log(data)
        initialize()
        
        }).catch((error)=> {
    
            console.log(error)
        })
            deleteProductDialog.value = false;
            product.value = {};
           
        };

        console.log(dispatchProduct.driverId,'driverId')
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
        const confirmDispatchSelected = () => {
            dispatchProductsDialog.value = true;
        };
        const deleteSelectedProducts = () => {
            products.value = products.value.filter(val => !selectedProducts.value.includes(val));
            deleteProductsDialog.value = false;
            selectedProducts.value = null;
        
        };
        const dispatchSelectedProducts = () => {
            products.value = products.value.filter(val => !selectedProducts.value.includes(val));
            dispatchProductsDialog.value = false;
            selectedProducts.value = null;
        
        };

        return { dt, products, drivers,dispatchSelectedProducts, selectedDriver, dispatch, selectedGoods, productDialog,dispatchProduct,dispatchProductHandler, deleteProductDialog,dispatchProductsDialog, deleteProductsDialog, product, confirmDispatchSelected,
            selectedProducts, filters, submitted, statuses, formatCurrency, openNew, hideDialog, saveProduct, editProduct,confirmDispatchProduct,
            confirmDeleteProduct, deleteProduct, findIndexById, createId, exportCSV,quantity, confirmDeleteSelected, deleteSelectedProducts}
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