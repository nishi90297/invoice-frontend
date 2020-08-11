<template>
   <section class="section">
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
            <div class="columns" v-if="!$route.query.id" >
                <div class="column is-6">
                    <b-field label="Password">
                            <b-input  id="password" type="password" v-model="userData.password" placeholder="Enter Password"></b-input>
                    </b-field>
                </div>
            </div>
            <div class="columns ">
                <div class="column has-text-centered">
                    <b-button v-if="!$route.query.id" type="is-primary" @click="register()">Register</b-button>
                    <b-button v-if="$route.query.id" type="is-primary" @click="update()">Update</b-button>
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
                phone:'',
                password:'',
            }
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
            this.$data.userData.id = null;
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
                this.success(response.data)
                this.$router.push({ path: 'login'})
            })
            .catch(error=>{
                this.failure(error.data)
            })
        },
        update(){
            this.$data.userData.name.first=this.userData.name.first;
            this.$data.userData.name.last=this.userData.name.last;
            this.$data.userData.email=this.userData.email;
            this.$data.userData.phone=this.userData.phone;
            axios({
                method: 'post',
                url: baseUrl+"/updateBiller",
                data: this.$data.userData,
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
                console.log("aa rha h kya bhaiiiii i?????")
                axios({
                    method: 'get',
                    url: baseUrl+"/getOneBiller/"+this.$route.query.id,
                })
                .then(response =>{
                        this.userData = response.data;
                    })
            }
        }
    } ,
    mounted(){
        console.log("load hor ha ?")
        this.getBillerDetails();
    } ,
    beforeMounted(){
        console.log("dhinchak dchinck")
    }
}
</script>

<style scoped>

</style>