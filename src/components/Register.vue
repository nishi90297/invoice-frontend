<template>
   <section class="section" has-background-white-ter>
       <NavBar></NavBar>
       <div class="container box">
            <div class="columns" >
                <div class="column">
                    <b-field label="First Name">
                        <b-input id= "first" v-model="userData.name.first" placeholder="Enter First Name"></b-input>
                    </b-field>
                </div>
                <div class="column">
                    <b-field label="Last Name">
                        <b-input id= "last" v-model="userData.name.last" placeholder="Enter Last Name"></b-input>
                    </b-field>
                </div>
            </div>
            <div class="columns" >
                <div class="column">
                    <b-field label="Email">
                            <b-input id="email" type="email" v-model="userData.email" placeholder="Enter Email"></b-input>
                    </b-field>
                </div>
                <div class="column">
                    <b-field label="Phone">
                            <b-input id="phone" tyle="cl" v-model="userData.phone" placeholder="Enter Phone Number"></b-input>
                    </b-field>
                </div>
            </div>
            <div class="columns">
                <div class="column">
                    <b-button type="is-primary" @click="register()">Register</b-button>
                </div>
            </div>
       </div>   
   </section>
</template>

<script>

import NavBar from './NavBar'
import axios from 'axios'

const baseUrl = 'http://localhost:8080/biller'

export default {
    name: 'Register',
    props: ['id'],
    components: {
        NavBar
    },
    data(){
        return {
            userData:{
                name:{
                    first:'',
                    last:''
                },
                email:'',
                phone:'',
            }
        }
    },
    methods:{
        register(){
            console.log(this.userData.name.first);
            this.$data.userData.name.first=this.userData.name.first;
            this.$data.userData.name.last=this.userData.name.last;
            this.$data.userData.email=this.userData.email;
            this.$data.userData.phone=this.userData.phone;
            axios({
                method: 'post',
                url: baseUrl+"/register",
                data: this.$data.userData,
            })
            .then(response=>{
                console.log(response.data);
                this.$buefy.dialog.alert(response.data)
            })
            .catch(error=>{
                this.$buefy.dialog.alert(error)
            })
        }
    }  
}
</script>

<style scoped>

</style>