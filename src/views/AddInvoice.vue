<template>
  <section class="section">
   <div class="columns">
        <div class="column has-text-centered is-size-3 has-text-primary">
            <h1><b>Choose Your Template !</b></h1>
        </div>
    </div>
    <div class="columns has-text-centered">
      <div class="column">
        <img @click="createInvoice()" src="../assets/invoice_with_free_text.png">
      </div>
      <div class="column">
        <img @click="createInvoice()" src="../assets/invoice_without_free_text.png">
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: "AddInvoices",
    methods:{
        createInvoice(){
          this.$router.push({ path: 'createInvoice'})
        }
    }
  }
</script>

<style scoped>
  img:hover{
    -moz-box-shadow: 0 0 10px #ccc;
    -webkit-box-shadow: 0 0 10px #ccc;
    box-shadow: 0 0 10px #ccc;
    transform: scale(1.1);
  }
</style>