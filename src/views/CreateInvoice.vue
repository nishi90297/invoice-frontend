<template>
    <section class="section">
    <div class="box">
        <div class="columns">
            <div class="column is-8 ">
                <div class="columns">
                    <div class="column is-6">
                        <b-field label="Payer Name">
                            <b-input id= "payerName" placeholder="Enter Payer Name"></b-input>
                        </b-field>
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
                        <b-field label="Payer Email">
                            <b-input id= "payerEmail" type="email" placeholder="Enter Payer Email"></b-input>
                        </b-field>
                    </div>
                    <div class="column is-6">
                      <b-field label="Invoice No">
                        <b-input id= "invoiceNo" placeholder="INV-001" disabled></b-input>
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
                                <p>Choose Logo for invoice</p>
                            </div>
                        </section>
                    </b-upload>
                </b-field>
            </div>  
        </div>
    </div>
    
    <div class="box">
        <b-table
            :data="data"
            >
            <template slot-scope="props">
                <b-table-column field="name" label="Name">
                    <b-input is-small id= "name" v-model="name" placeholder="Enter Name" custom-class></b-input>
                </b-table-column>

                <b-table-column field="description" label="Description" >
                    <b-input id= "description" v-model="description" placeholder="Enter Description"></b-input>
                </b-table-column>

                <b-table-column field="price" label="Price" numeric>
                    <b-input id= "price" type="number" min="0"  v-model="props.row.price" placeholder="Enter Price"></b-input>
                </b-table-column>

                <b-table-column field="quantity" label="Quantity" numeric>
                    <b-input id= "quantity" type="number" min="0"  v-model="props.row.quantity" placeholder="Enter Quantity"></b-input>
                </b-table-column>

                <b-table-column field="total" label="Total" centered >
                    <span>{{props.row.price * props.row.quantity}}</span>
                </b-table-column>
                <b-table-column field="total" label="Delete" centered >
                  <font-awesome-icon icon="trash" />
                </b-table-column>
            </template>
        </b-table>
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

const data = [
                { 'id': 1, 'first_name': 'Jesse', 'last_name': 'Simmons', 'date': '2016-10-15 13:43:27', 'gender': 'Male' },
            ]
            
export default {
    name:'CreateInvoice',
    data() {
        return {
            selected: new Date(),
            showWeekNumber: false,
            locale: undefined ,
            dropFiles:[], // Browser locale
            data,
            name:'',
            description:'',
            price:0,
            quantity:0,
            total:0,

            
        }
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