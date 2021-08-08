import 'primevue/resources/themes/saga-blue/theme.css'       //theme
import 'primevue/resources/primevue.min.css'               //core css
import 'primeicons/primeicons.css'
import '../node_modules/primeflex/primeflex.scss'


import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import router from '../Router/';
import {useToast} from 'primevue/usetoast';
import Menubar from 'primevue/menubar'
import Button from 'primevue/button'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Toolbar from 'primevue/toolbar'
import DataTable from 'primevue/datatable'
import Dialog from 'primevue/dialog'
import Column from 'primevue/column'
import Rating from 'primevue/rating'
import Dropdown from 'primevue/dropdown'
import RadioButton from 'primevue/radiobutton'
import InputNumber from 'primevue/inputnumber'
import FileUpload from 'primevue/fileupload'
import Textarea from 'primevue/textarea'
import Password from 'primevue/password'
import Message from 'primevue/message'
import Steps from 'primevue/steps'





const app = createApp(App);

app.use(PrimeVue);
app.use(router)

app.use()

app.use('Textarea', Textarea)
app.component('Steps', Steps)
app.component('Message', Message)
app.component('Password', Password)
app.component('FileUpload', FileUpload)
app.component('Column', Column)
app.component('Toast', useToast)
app.component('Rating', Rating)
app.component('RadioButton', RadioButton)
app.component('InputNumber', InputNumber)
app.component('Dialog', Dialog)
app.component('Toolbar', Toolbar)
app.component('Dropdown', Dropdown)
app.component('DataTable', DataTable)
app.component('Menubar', Menubar)
app.component('Button', Button)
app.component('Card', Card)
app.component('InputText', InputText)

app.mount('#app')