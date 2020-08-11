<template>
    <div>
        <b-table
            :data="billerList"
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
                <!-- <b-table-column field="id" label="ID">
                    {{ props.row.id }}
                </b-table-column> -->
                <b-table-column field="name.first" label="First Name">
                    {{ props.row.name.first}}
                </b-table-column>
                <b-table-column field="name.last" label="Last Name">
                    {{ props.row.name.last}}
                </b-table-column>
                <b-table-column field="email" label="Email">
                    {{ props.row.email}}
                </b-table-column>
                <b-table-column field="phone" label="Phone No">
                    {{ props.row.phone}}
                </b-table-column>
                <b-table-column field="edit" label="Edit">
                    <router-link :to="{ path: '/register', query:{id:props.row.id} }">
                        <font-awesome-icon icon="edit" />
                    </router-link>
                </b-table-column>
                <b-table-column field="delete" label="Delete">
                    <font-awesome-icon @click="deleteBiller(props.row.id)" icon="trash" />
                </b-table-column>
            </template>
        </b-table>
    </div>
</template>

<script>

import axios from 'axios';

const baseUrl = 'http://localhost:8080'
// var token = ""

export default {
    name:'AllBillers',
    data(){
        return {
            billerList:[],
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
      getBillers(){
          console.log(localStorage.getItem('token')+ "token")
        axios({
            method: 'get',
            url: baseUrl,
            useCredentails: true ,
            header: {
                "Accept": "application/json, text/plain, */*",
                "X-Requested-With": "XMLHttpRequest",
                'Content-Type':  'application/json',
                "Access-Control-Allow-Origin": '*',
                'Access-Control-Request-Headers': 'Content-Type, Accept',
                'Authorization': localStorage.getItem('token')
                // "Authorization":"Bearer "+localStorage.getItem('token')
            }
        })
          .then(response =>{
            this.$data.billerList = response.data;
          })
          .catch(error => {
            this.info('Backend Error');
            console.log(error);
          })
      },
      deleteBiller(id){
        this.$buefy.dialog.confirm({
            message: 'Are you sure, you want to delete?',
            cancelText: 'Cancel',
            confirmText: 'Ok',
            onConfirm:() => {
                axios({
                    method: 'post',
                    url: baseUrl+"/deleteBiller?id="+id,
                })
                .then(response=>{
                    console.log(response.data);
                    this.success(response.data)
                    this.getBillers();
                })
                .catch(error=>{
                    this.$buefy.dialog.alert(error.data)
                })
            }
        })
      }
    },
    mounted(){
        this.getBillers();
    },
}
</script>

<style scoped>
</style>