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
                      <span style="font-size: 25px; font-weight: bold;  padding: 10px " class="has-text-primary has-background-warning">{{invoice.invoiceNumber}}</span>
                      <hr class="has-background-dark">
                    </div>
                    <div class="column is-6">
                        <b-field label="Due Date">
                            <b-datepicker
                                v-model="invoice.dueDate"
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
                        <b-input id= "payerName" v-model="invoice.payerName" type="text" placeholder="Enter Payer Name" required validation-message="Payer Name is required"></b-input>
                      </b-field>
                    </div>
                    <div class="column is-6">
                        <b-field label="Payer Email">
                            <b-input id= "payerEmail" v-model="invoice.payerEmail" type="email" placeholder="Enter Payer Email"></b-input>
                        </b-field>
                    </div>
                </div>
                <div class="columns">
                  <div class="column">
                    <b-field label="Payer Address">
                      <b-input maxlength="200" rows="2" type="textarea" id= "payerAddress" v-model="invoice.payerAddress"></b-input>
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

    <div class="box" v-if="invoice.templateNo==1">
      <div class="columns">
        <div class="column">
          <b-field label="Free Text">
            <b-input maxlength="200" rows="2" type="textarea" id= "freetext" v-model="invoice.freeText"></b-input>
          </b-field>
        </div>
      </div>
    </div>

    <div class="box">
        <b-table
            :data="invoice.products"
            >
            <template slot-scope="props">
                <b-table-column field="name" label="Name">
                    <b-input is-small id= "name" v-model="props.row.name" placeholder="Enter Name" ></b-input>
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
                <b-input maxlength="200" rows="3" type="textarea" id= "footer" v-model="invoice.footer"></b-input>
              </b-field>
            </div>
          </div>
          <div class="column is-4">
              <div class="box">
                <div class="columns" style="font-size: 1.2rem;">
                  <div class="column">Discount :</div>
                    <div class="column">
                      <b-select placeholder="Select Discount" expanded @input="calculateTotal" v-model="invoice.discount">
                        <option value="10">10%</option>
                        <option value="20">20%</option>
                      </b-select>
                    </div>
                </div>
              </div>
              <div class="box">
                <div class="columns has-text-weight-bold" style="font-size: 1.9rem;">
                  <div class="column ">Total  :</div>
                  <div class="column has-text-right" >Rs {{invoice.finalAmount}}/- </div>
                </div>
              </div>
            </div>
      </div>
      <div class="columns" style="position: fixed; bottom: 2%; right: 1%;width: 83.3%;" >
        <div class="column has-text-right has-background-primary ">
          <b-button @click="createInvoiceContinue()">Continue</b-button>
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
          invoice: {
            templateNo: this.$route.query.templateNo,
            invoiceNumber:'',
            createdAt:'',
            payerName: '',
            payerEmail: '',
            payerAddress:'',
            products: [],
            dueDate:new Date(),
            freeText: '',
            footer: '',
            discount: 0,
            totalAmount: 0,
            discountedAmount:0,
            finalAmount:0,
          },
          // selected: new Date(),
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
        id: this.invoice.products.length + 1,
        name: '',
        description: '',
        price: 0,
        quantity: 0,
        total :0
      }
      this.invoice.products.push(newProduct)
    },

    removeProduct(productId) {
      this.$buefy.dialog.confirm({
        message: 'Are you sure, you want to delete?',
        cancelText: 'Cancel',
        confirmText: 'Ok',
        onConfirm: () => {
          this.invoice.products = this.invoice.products.filter(row => row.id != productId)
          this.calculateTotal();
        }
      })
    },

    calculateTotal() {
      var total = 0;
      this.invoice.products.forEach(obj => {
        obj.total = obj.price * obj.quantity;
        console.log(obj.total)
          total = total + (obj.price * obj.quantity);
      })
      this.invoice.totalAmount = total;
      this.invoice.discountedAmount = Math.round(total * (this.invoice.discount / 100));
      this.invoice.finalAmount = this.invoice.totalAmount - this.invoice.discountedAmount;
    },

    createInvoiceContinue() {
      console.log(this.invoice)

      console.log(this.invoice.products)
      axios({
        method: 'post',
        url: baseUrl + "/addInvoiceForm",
        data: this.invoice,
        headers: {
          'Authorization':`Bearer ${localStorage.getItem('token')}`
        }
      })
          .then(response => {
            this.success("Successfully Added")
            this.$router.push({path: 'sendingMode', query:{ invoiceId:response.data}})
          })
          .catch(error => {
            this.failure(error.data)
          })
    },

    invoiceNumberGenerator(){
      axios({
        method: 'get',
        url: baseUrl + "/getInvoiceNumber",
        headers: {
          'Authorization':`Bearer ${localStorage.getItem('token')}`
        }
      })
          .then(response => {
            this.invoice.invoiceNumber = 'INV-'+response.data;
          })
          .catch(error => {
            this.failure(error.data)
          })
    }
  },
  mounted() {
      this.addProduct();
      this.invoiceNumberGenerator();
  }
}
</script>

<style scoped>

.border{
    border:solid thin black;
}
</style>