<template>
    <section class="has-background-white-ter" style="height:90vh ; padding-left: 3vh ">
        <br>
        <b-menu >
            <b-menu-item label="Dashboard" tag="router-link" to="/dashboard/allBillers"></b-menu-item>
            <b-menu-list label="Invoices">
                <b-menu-item tag="router-link" to="/addInvoice" label="Add Invoice"></b-menu-item>
                <b-menu-item tag="router-link" to="/viewInvoices" label="List Invoices"></b-menu-item>
            </b-menu-list>
            <b-menu-list label="Payers">
                <b-menu-item label="Add Payers"></b-menu-item>
               <b-menu-item label="List Payers"></b-menu-item>
            </b-menu-list>
        </b-menu>
    </section>
</template>

<script>
export default {
    name: 'SideBar',
  data() {
    return {
      isActive: true
    }
  }
}
</script>