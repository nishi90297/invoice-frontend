<template>
  <section class="section">
   <div class="columns">
        <div class="column has-text-centered is-size-3 has-text-primary">
            <h1><b>Choose Your Template !</b></h1>
        </div>
    </div>
    <div class="columns has-text-centered">
      <div class="column">
        <img @click="createInvoice(1)" src="../assets/invoice_with_free_text.png">
      </div>
      <div class="column">
        <img @click="createInvoice(2)" src="../assets/invoice_without_free_text.png">
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: "AddInvoices",
    methods:{
        createInvoice(templateNo){
          this.$router.push({ path: 'createInvoice', query:{templateNo:templateNo}})
        }
    }
  }
</script>

<style scoped>

  img{
    border: solid thin rgb(207, 199, 199);
  }

  img:hover{
    -moz-box-shadow: 0 0 10px #ccc;
    -webkit-box-shadow: 0 0 10px #ccc;
    box-shadow: 0 0 10px #ccc;
    transform: scale(1.1);
    border: none;
  }
</style>