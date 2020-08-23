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
                      <span style="font-size: 25px; font-weight: bold; padding: 0" >INVOICE NUMBER:-  </span>
                      <span style="font-size: 25px; font-weight: bold " class="has-text-primary">INV-001</span>
                      <hr class="has-background-dark">
                    </div>
                    <div class="column is-6">
                        <b-field label="Due Date">
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
                        <b-input id= "payerName" type="text" placeholder="Enter Payer Name"></b-input>
                      </b-field>
                    </div>
                    <div class="column is-6">
                        <b-field label="Payer Email">
                            <b-input id= "payerEmail" type="email" placeholder="Enter Payer Email"></b-input>
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
    
    <div class="box">
        <b-table
            :data="product"
            >
            <template slot-scope="props">
                <b-table-column field="name" label="Name">
                    <b-input is-small id= "name" v-model="product.name" placeholder="Enter Name" custom-class></b-input>
                </b-table-column>

                <b-table-column field="description" label="Description" >
                    <b-input id= "description" v-model="product.description" placeholder="Enter Description"></b-input>
                </b-table-column>

                <b-table-column field="price" label="Price" numeric>
                    <b-input id= "price" type="number" min="0"  v-model="product.price" placeholder="Enter Price"></b-input>
                </b-table-column>

                <b-table-column field="quantity" label="Quantity" numeric>
                    <b-input id= "quantity" type="number" min="0"  v-model="product.quantity" placeholder="Enter Quantity"></b-input>
                </b-table-column>

                <b-table-column field="total" label="Total" centered >
                    <span>{{props.row.price * props.row.quantity}}</span>
                </b-table-column>
                <b-table-column field="total" label="Delete" centered >
                  <font-awesome-icon icon="trash" @click="removeProduct(props.row.id)" />
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
                <b-input maxlength="200" rows="3" type="textarea" id= "footer"></b-input>
              </b-field>
            </div>
          </div>
          <div class="column is-4">
              <div class="box">
                <div class="columns" style="font-size: 1.2rem;">
                  <div class="column">Discount :</div>
                    <div class="column">
                      <b-select placeholder="Discount" expanded>
                        <option>10%</option>
                        <option>20%</option>
                      </b-select>
                    </div>
                </div>
              </div>
              <div class="box">
                <div class="columns has-text-weight-bold" style="font-size: 1.9rem;">
                  <div class="column ">Total  :</div>
                  <div class="column has-text-right">Rs 8989/- </div>
                </div>
              </div>
            </div>
      </div>
      <div class="columns " style="position: fixed; bottom: 2%; right: 1%;width: 83.3%;" >
        <div class="column has-text-right has-background-primary ">
          <b-button>Continue</b-button>
        </div>
      </div>

    </section>
</template>

<script>

export default {
    name:'CreateInvoice',
    data() {
        return {
            product:[],
            selected: new Date(),
            showWeekNumber: false,
            locale: undefined ,
            dropFiles:[], // Browser locale
            data:[],

            
        }
    },
  methods:{
      addProduct(){
        let newProduct={
          id:this.$data.product.length+1,
          name: '',
          description:'',
          price:0,
          quantity:0,
        }
       this.product.push(newProduct)
      },

    removeProduct(productId){
      this.$buefy.dialog.confirm({
        message: 'Are you sure, you want to delete?',
        cancelText: 'Cancel',
        confirmText: 'Ok',
        onConfirm:() => {
          this.product = this.product.filter(row=> row.id!=productId)
        }
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

.footer{
  position: fixed;
  bottom: 0;
  right: 1%;
  width: 83.3%;
}

</style>