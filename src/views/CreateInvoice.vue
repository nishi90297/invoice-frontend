<template>
    <section class="section">
<!--      <div class="columns ">-->
<!--        <div class="column is-3 is-offset-4 has-text-centered has-background-grey-lighter" style="margin-top: 10px">-->
<!--          <span style="font-size: 25px; font-weight: bold" >INVOICE NUMBER:-  </span>-->
<!--          <span style="font-size: 25px; font-weight: bold " class="has-text-primary">INV-001</span>-->
<!--        </div>-->
<!--      </div>-->
    <div class="box">
        <div class="columns">
            <div class="column is-8 ">
                <div class="columns">
                    <div class="column is-6 ">
                      <span style="font-size: 25px; font-weight: bold; padding: 10px" class="has-background-warning" >INVOICE NUMBER:-  </span>
                      <span style="font-size: 25px; font-weight: bold;  padding: 10px " class="has-text-primary has-background-warning">INV-001</span>
                      <hr class="has-background-dark">
                    </div>
                    <div class="column is-6">
                        <b-field label="Due Date" v-model="invoiceForm.dueDate">
                            <b-datepicker
                                v-model="selected"
                                :show-week-number="showWeekNumber"
                                :locale="locale"
                                placeholder="Click to select..."
                                icon="calendar-today"
                                trap-focus>
                            </b-datepicker>
                        </b-field>
                    </div>
                </div>
                <div class="columns">
                    <div class="column is-6">
                      <b-field label="Payer Name">
                        <b-input id= "payerName" v-model="invoiceForm.payerName" type="text" placeholder="Enter Payer Name"></b-input>
                      </b-field>
                    </div>
                    <div class="column is-6">
                        <b-field label="Payer Email">
                            <b-input id= "payerEmail" v-model="invoiceForm.payerEmail" type="email" placeholder="Enter Payer Email"></b-input>
                        </b-field>
                    </div>
                </div>
            </div>  
            <div class="column is-3 is-offset-1">
                <b-field>
                    <b-upload v-model="dropFiles"
                        multiple
                        drag-drop>
                        <section class="section">
                            <div class="content has-text-centered">
                                <p>
                                    <b-icon
                                        icon="upload"
                                        size="is-large">
                                    </b-icon>
                                </p>
                                <p>Choose logo for invoice</p>
                            </div>
                        </section>
                    </b-upload>
                </b-field>
            </div>  
        </div>
    </div>

    <div class="box" v-if="invoiceForm.templateNo==1">
      <div class="columns">
        <div class="column">
          <b-field label="Free Text">
            <b-input maxlength="200" rows="2" type="textarea" id= "freetext" v-model="invoiceForm.freeText"></b-input>
          </b-field>
        </div>
      </div>
    </div>

    <div class="box">
        <b-table
            :data="invoiceForm.product"
            >
            <template slot-scope="props">
                <b-table-column field="name" label="Name">
                    <b-input is-small id= "name" v-model="props.row.name" placeholder="Enter Name" custom-class></b-input>
                </b-table-column>

                <b-table-column field="description" label="Description" >
                    <b-input id= "description" v-model="props.row.description" placeholder="Enter Description"></b-input>
                </b-table-column>

                <b-table-column field="price" label="Price" numeric>
                    <b-input id= "price" type="number" min="0" @input="calculateTotal"  v-model="props.row.price" placeholder="Enter Price"></b-input>
                </b-table-column>

                <b-table-column field="quantity" label="Quantity" numeric>
                    <b-input id= "quantity" type="number" min="0"  @input="calculateTotal" v-model="props.row.quantity" placeholder="Enter Quantity"></b-input>
                </b-table-column>

                <b-table-column field="total" label="Total" centered >
                    <span>{{props.row.price * props.row.quantity}}</span>
                </b-table-column>
                <b-table-column field="total" label="Delete" centered >
                  <font-awesome-icon icon="trash"  @click="removeProduct(props.row.id)" />
                </b-table-column>
            </template>
        </b-table>
        <div class="columns">
          <div class="column has-text-right">
            <b-button icon-left="plus" class="is-primary button" @click="addProduct()">Product</b-button>
          </div>
        </div>
    </div>

    <div class="columns">
          <div class="column is-8">
            <div class="box">
              <b-field label="Footer">
                <b-input maxlength="200" rows="3" type="textarea" id= "footer" v-model="invoiceForm.footer"></b-input>
              </b-field>
            </div>
          </div>
          <div class="column is-4">
              <div class="box">
                <div class="columns" style="font-size: 1.2rem;">
                  <div class="column">Discount :</div>
                    <div class="column">
                      <b-select placeholder="Discount" expanded @input="calculateTotal" v-model="invoiceForm.discount">
                        <option value="10">10%</option>
                        <option value="20">20%</option>
                      </b-select>
                    </div>
                </div>
              </div>
              <div class="box">
                <div class="columns has-text-weight-bold" style="font-size: 1.9rem;">
                  <div class="column ">Total  :</div>
                  <div class="column has-text-right" >Rs {{invoiceForm.total}}/- </div>
                </div>
              </div>
            </div>
      </div>
      <div class="columns " style="position: fixed; bottom: 2%; right: 1%;width: 83.3%;" >
        <div class="column has-text-right has-background-primary ">
          <b-button @click="sendingModePage()">Continue</b-button>
        </div>
      </div>

    </section>
</template>

<script>

import axios from 'axios'

const baseUrl = 'http://localhost:8080'

export default {
    name:'CreateInvoice',

    data() {
        return {
          invoiceForm:{
            dueDate:'',
            payerName:'',
            payerEmail:'',
            product:[],
            footer:'',
            discount:0,
            total:'',
            templateNo: this.$route.query.templateNo,
          },
          selected: new Date(),
          showWeekNumber: false,
          locale: undefined ,
          dropFiles:[], // Browser locale
          data:[],

            
        }
    },
  methods: {
    success(data){
      this.$buefy.toast.open({
        message: data,
        type: 'is-success'
      })
    },
    failure(data){
      this.$buefy.toast.open({
        duration: 1000,
        message: data,
        position: 'is-bottom',
        type: 'is-danger'
      })
    },
    // info(data){
    // this.$buefy.toast.open(data)
    // },
    addProduct() {
      let newProduct = {
        id: this.invoiceForm.product.length + 1,
        name: '',
        description: '',
        price: 0,
        quantity: 0
      }
      this.invoiceForm.product.push(newProduct)
    },

    removeProduct(productId) {
      this.$buefy.dialog.confirm({
        message: 'Are you sure, you want to delete?',
        cancelText: 'Cancel',
        confirmText: 'Ok',
        onConfirm: () => {
          this.invoiceForm.product = this.invoiceForm.product.filter(row => row.id != productId)
          this.calculateTotal();
        }
      })
    },

    calculateTotal() {
      var total = 0;
      this.$data.invoiceForm.product.forEach(obj => {
        total = total + (obj.price * obj.quantity);
      })
      this.invoiceForm.total = Math.round(total * (1 - (this.invoiceForm.discount / 100)));
    },

    sendingModePage() {
      axios({
        method: 'post',
        url: baseUrl + "/addInvoiceForm",
        data: this.invoiceForm,
        headers: {
          'Authorization':`Bearer ${localStorage.getItem('token')}`
        }
      })
          .then(response => {
            console.log(response.data);
            this.success(response.data)
            this.$router.push({path: 'sendingMode'})
          })
          .catch(error => {
            this.failure(error.data)
          })
    }
  },
  mounted() {
      this.addProduct();
  }
}
</script>

<style scoped>

.border{
    border:solid thin black;
}
</style>