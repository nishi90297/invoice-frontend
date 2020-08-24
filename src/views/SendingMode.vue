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

        </div>
      </div>
      <div class="column is-6">
        <div class="columns">
          <div class="column is-12">
            <div class="box">
              dewf
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column is-12">
            <div class="box">
              dewf
            </div>
          </div>
        </div>
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