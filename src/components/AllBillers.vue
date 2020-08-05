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
                <b-table-column field="id" label="ID"  numeric>
                    {{ props.row.id }}
                </b-table-column>
                <b-table-column field="name.first" label="First Name">
                    {{ props.row.name.first}}
                </b-table-column>
                <b-table-column field="name.last" label="Last Name">
                    {{ props.row.name.last}}
                </b-table-column>
                <b-table-column field="email" label="Email">
                    {{ props.row.email}}
                </b-table-column>
                <b-table-column field="phone" label="Phone No" numeric>
                    {{ props.row.phone}}
                </b-table-column>

                <!-- <b-table-column field="user.last_name" label="Last Name" sortable>
                    {{ props.row.user.last_name }}
                </b-table-column>

                <b-table-column field="date" label="Date" sortable centered>
                    <span class="tag is-success">
                        {{ new Date(props.row.date).toLocaleDateString() }}
                    </span>
                </b-table-column> -->

                <!-- <b-table-column label="Gender">
                    <span>
                        <b-icon pack="fas"
                            :icon="props.row.gender === 'Male' ? 'mars' : 'venus'">
                        </b-icon>
                        {{ props.row.gender }}
                    </span>
                </b-table-column> -->
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
    },
    mounted(){
        this.getBillers();
    },
}
</script>

<style scoped>

</style>