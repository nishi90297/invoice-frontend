<template>
   <section class="section" style="padding-top:15vh">
       <div class="column box is-6 is-offset-3">
           <div class="columns">
                <div class="column has-text-centered is-size-3 is-family-primary">
                    <strong v-if="!$route.query.id" >Register</strong>
                    <strong v-if="$route.query.id" >Update</strong>
                </div>
            </div>

            <!-- Basic Information -->
            <div class="columns">
                <div class="column is-size-4 is-4 ">
                    Basic Information
                </div>
                <div class="column ">
                    <hr>
                </div>
            </div>
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
                            <b-input id="phone" v-model="userData.phone" placeholder="Enter Phone Number"></b-input>
                    </b-field>
                </div>
            </div>

            <!-- Address -->
            <div class="columns">
                <div class="column is-size-4 is-2 ">
                    Address
                </div>
                <div class="column ">
                    <hr>
                </div>
            </div>
            <div class="columns" >
                <div class="column">
                    <b-field label="Apartment Number">
                        <b-input id= "apartmentNumber" v-model="userData.address.apartmentNumber" placeholder="Enter Apartment Number"></b-input>
                    </b-field>
                </div>
                <div class="column">
                    <b-field label="Street">
                        <b-input id= "street" v-model="userData.address.street" placeholder="Enter Street"></b-input>
                    </b-field>
                </div>
            </div>
            <div class="columns" >
                <div class="column">
                    <b-field label="City">
                            <b-input id="city" v-model="userData.address.city" placeholder="Enter City"></b-input>
                    </b-field>
                </div>
                <div class="column">
                    <b-field label="State">
                            <b-input id="state" v-model="userData.address.state" placeholder="Enter State"></b-input>
                    </b-field>
                </div>
            </div>
            <div class="columns" >
                <div class="column">
                    <b-field label="Country">
                            <b-input id="country" v-model="userData.address.country" placeholder="Enter Country"></b-input>
                    </b-field>
                </div>
                <div class="column">
                    <b-field label="Postal Code">
                            <b-input id="postalCode" v-model="userData.address.postalCode" placeholder="Enter Postal Code"></b-input>
                    </b-field>
                </div>
            </div>


            <!-- Other -->
            <div class="columns">
                <div class="column is-size-4 is-2 ">
                    Other
                </div>
                <div class="column ">
                    <hr>
                </div>
            </div>
            <div class="columns" >
                <div class="column">
                    <b-field label="IBAN">
                        <b-input id= "iban" v-model="userData.iban" placeholder="Enter IBAN"></b-input>
                    </b-field>
                </div>
                <div class="column">
                    <b-field label="Company Name">
                        <b-input id= "company" v-model="userData.company" placeholder="Enter Company"></b-input>
                    </b-field>
                </div>
            </div>
            <div class="columns" >
                <div class="column">
                    <b-field label="Website URL">
                        <b-input id= "website" v-model="userData.website" placeholder="Enter Website URL"></b-input>
                    </b-field>
                </div>
            </div>

            <div class="columns" v-if="!$route.query.id" >
                <div class="column is-6">
                    <b-field label="Password">
                            <b-input  id="password" type="password" v-model="userData.password" placeholder="Enter Password" password-reveal></b-input>
                    </b-field>
                </div>
                <div class="column is-6">
                    <b-field label="Confirm Password">
                            <b-input  id="confirmPassword" type="password" v-model="confirmPassword" placeholder="Enter Confirm Password" password-reveal></b-input>
                    </b-field>
                </div>
            </div>
            <div class="columns ">
                <div class="column has-text-centered">
                    <b-button v-if="!$route.query.id" type="is-primary" @click="register()">Register</b-button>
                    <b-button v-if="$route.query.id" type="is-primary" @click="update()">Update</b-button>
                </div>
                <div class="column" v-if="!$route.query.id">
                    <router-link to="/login" >Already Registered..?</router-link>
                </div>
            </div>
       </div>   
   </section>
</template>

<script>

import axios from 'axios'

const baseUrl = 'http://localhost:8080'

export default {
    name: 'Register',
    props: ['msg'],
    components: {
        // NavBar
    },
    data(){
        return {
            userData:{
                name:{
                    first:'',
                    last:''
                },
                email:'',
                address:{
                    apartmentNumber:'',
                    street:'',
                    city:'',
                    state:'',
                    country:'',
                    postalCode:'',
                },
                phone:'',
                password:'',
            },
            confirmPassword:'',
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
        // info(data){
            // this.$buefy.toast.open(data)
        // },
        register(){
            if(this.userData.password!==(this.confirmPassword)){
                this.failure("Password Does Not Match")
            } 
            else{
                axios({
                method: 'post',
                url: baseUrl+"/register",
                data: this.$data.userData
                })
                .then(response=>{
                    console.log(response.data);
                    this.success(response.data)
                    this.$router.push({ path: 'login'})
                })
                .catch(error=>{
                    this.failure(error.data)
                })
            }
            
        },
        update(){
            axios({
                method: 'post',
                url: baseUrl+"/updateBiller",
                data: this.$data.userData,
                headers: {
                        'Authorization':`Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(response=>{
                console.log(response.data);
                this.success(response.data)
                this.$router.push({ path: 'allBillers'})
            })
            .catch(error=>{
                this.failure(error.data)
            })
        },

        getBillerDetails(){ 
            if(this.$route.query.id){
                axios({
                    method: 'get',
                    url: baseUrl+"/getOneBiller/"+this.$route.query.id,
                    headers:{
                        'Authorization':`Bearer ${localStorage.getItem('token')}`
                    }
                })
                .then(response =>{
                        this.userData = response.data;
                    })
            }
        }
    } ,
    mounted(){
        this.getBillerDetails();
    } ,
    beforeMounted(){
    }
}
</script>

<style scoped>

hr{
    background-color: #6e248b;
}


</style>