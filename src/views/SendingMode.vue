<template>
  <section class="section">
    <div class="columns">
      <div class="column has-text-centered is-size-3 has-text-primary">
        <h1><b>Choose Sending Mode !</b></h1>
      </div>
    </div>
    <div class="columns has-text-centered">
      <div class="column">
        <div class="box has-text-right has-background-white">
          <div class="field ">
            <b-switch v-model="preferences.mail.useThis" > <font-awesome-icon icon="envelope" /></b-switch>
          </div>
        </div>
      </div>
    </div>

    <div class="columns" v-if="preferences.mail.useThis">
      <div class="column is-6">
        <div class="box">
          <div class="column">
            <p class="has-text-weight-semibold">The payer will receive the mail shown in image from -
              <span class="has-text-primary">no-reply@invoicer.com</span>
            </p>
            <b-field label="Payer Email" class="mt3">
              {{ preferences.mail.emailId }}
            </b-field>
            <b-field label="Mail Subject" class="mt3">
              <b-input maxlength="100" type="text" v-model="preferences.mail.subject" />
            </b-field>
            <b-field label="Mail Message" class="mt3">
              <b-input maxlength="250" type="textarea" rows="5" v-model="preferences.mail.message" />
            </b-field>
          </div>
        </div>
      </div>
      <div class="column is-6">
        <div class="columns">
          <div class="column is-12">
            <div class="box ">
              <span class="has-text-weight-bold">Subject</span> : {{preferences.mail.subject}}
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column is-12">
            <div class="box">
              <div class="columns">
                ICON
              </div>
              <div class="columns">
                <div class="column">
                  <p class="has-text-weight-bold">Dear {{userInfo.name.first+" "+ userInfo.name.last}},</p>
                </div>
                <div class="column">
                  <p class="mt1">{{preferences.mail.message}}</p>
                </div>
                <hr class="has-background-grey-lighter">
              </div>
              <div class="columns">
                <div class="column">
                  <p class="has-text-weight-bold">Rs {{invoice.total}}.00</p>
                </div>
                <div class="column">
                  <p class="mt1">Due Date- {{invoice.dueDate}}</p>
                </div>
                <hr class="has-background-grey-lighter">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="columns" style="position: fixed; bottom: 2%; right: 1%;width: 83.3%;" >
      <div class="column has-text-right has-background-primary ">
        <b-button @click="sendModeContinue()">Continue</b-button>
      </div>
    </div>
  </section>
</template>

<script>
  import axios from "axios";
  const baseUrl = 'http://localhost:8080/'

  export default{
    name:"SendingMode",
    data(){
      return{
        invoice:{},
        userInfo:{
          name:{
            first:'',
            last:''
          },
          email:'',
        },
        preferences:{
          mail:{
            useThis: false,
            emailId: '',
            subject: 'Invoice: You have a new Invoice!',
            message: 'Here is your latest invoice.',
          }
        }
      }
    },
    methods:{
      getInvoiceDetails(){
        axios({
          method: 'get',
          url: baseUrl+'getInvoiceById/'+this.$route.query.invoiceId,
          headers: {
            'Authorization':`Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(response =>{
          this.invoice = response.data;
        })
        .catch(error => {
          this.info('Backend Error');
          console.log(error);
        })
      },

      getUserInfo(){
        axios({
          method: 'get',
          url: baseUrl+'getUserInfo',
          headers: {
            'Authorization':`Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(response =>{
          this.userInfo = response.data;
          this.preferences.mail.emailId = this.userInfo.email;
        })
        .catch(error => {
          this.info('Backend Error');
          console.log(error);
        })
      },
      sendModeContinue(){

      }
    },
    mounted() {
      this.getInvoiceDetails();
      this.getUserInfo();
    }
  }
</script>

<style scoped>




</style>