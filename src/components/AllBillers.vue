<template>
    <div>
    <NavBar></NavBar>
        <b-table
            :data="billerList"
            ref="table"
            paginated
            per-page="5"
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
import NavBar from './NavBar'

const baseUrl = 'http://localhost:8080/biller'

export default {
    name:'AllBillers',
    components: {
        NavBar
    },
    data(){
        return {
            billerList:[]
        }
    },
    methods:{
      getBillers(){
        axios.get(baseUrl)
          .then(response =>{
            // console.log(this.$data.billerList);
            this.$data.billerList = response.data;
            // console.log(response.data);
          })
          .catch(error => {
            // handle error
            this.$buefy.dialog.alert('Backend Error');
            console.log(error);
          })
      },
      deleteBiller(id){
          console.log(id)
          axios({
                method: 'post',
                url: baseUrl+"/deleteBiller?id="+id,
            })
            .then(response=>{
                console.log(response.data);
                this.$buefy.dialog.alert(response.data)
                this.getBillers();
            })
            .catch(error=>{
                this.$buefy.dialog.alert(error)
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