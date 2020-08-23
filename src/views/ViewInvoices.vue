<template>
  <section class="section">
    <b-table
        :data="invoiceList"
        :paginated="isPaginated"
        :per-page="perPage"
        :current-page.sync="currentPage"
        :pagination-simple="isPaginationSimple"
        :pagination-position="paginationPosition"
        :default-sort-direction="defaultSortDirection"
        :sort-icon="sortIcon"
        :sort-icon-size="sortIconSize"
        default-sort="billerList.first.name"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
        focusable>
      <template slot-scope="props">
        <b-table-column field="name.first" label="Payer Name">
          {{ props.row.payerName}}
        </b-table-column>
        <b-table-column field="name.last" label="Payer Email">
          {{ props.row.payerEmail}}
        </b-table-column>
        <b-table-column field="email" label="Footer">
          {{ props.row.footer}}
        </b-table-column>
        <b-table-column field="phone" label="Total">
          {{ props.row.total}}
        </b-table-column>
      </template>
    </b-table>
  </section>
</template>

<script>
import axios from "axios";
const baseUrl = 'http://localhost:8080/'

export default {
  name:'ViewInvoices',
  data(){
    return {
      invoiceList:[],
      isPaginated: true,
      isPaginationSimple: false,
      paginationPosition: 'bottom',
      defaultSortDirection: 'asc',
      sortIcon: 'arrow-up',
      sortIconSize: 'is-small',
      currentPage: 1,
      perPage: 5
    }
  },
  methods:{
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
    info(data){
      this.$buefy.toast.open(data)
    },
    getAllInvoices(){
      axios({
        method: 'get',
        url: baseUrl+'getAllInvoices',
        headers: {
          'Authorization':`Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response =>{
        this.invoiceList = response.data;
      })
      .catch(error => {
        this.info('Backend Error');
        console.log(error);
      })
    },
  },

  mounted() {
    this.getAllInvoices();
  }
}
</script>

<style scoped>

</style>