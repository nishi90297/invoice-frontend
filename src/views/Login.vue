<template>
    <section class="section bg-img has-background-twitter" style="height:100vh;" >
        <div class="columns">
            <div class="column box is-4 is-offset-4">
                <div class="columns">
                    <div class="column has-text-centered is-size-3 is-family-primary">
                        <strong >WELCOME TO INVOICER</strong>
                    </div>
                </div>
                <br>
                <div class="columns">
                    <div class="column">
                        <b-field label="Username">
                            <b-input type="email" id="email" v-model="loginRequest.username" placeholder="Enter Username"> </b-input>
                        </b-field>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <b-field label="Password">
                            <b-input type="password" id="password" v-model="loginRequest.password" placeholder="Enter Password"> </b-input>
                        </b-field>
                    </div>
                </div>
                <div class="columns">
                    <div class="column has-text-centered">
                        <b-button type="is-twitter" @click="login()">Log In</b-button>
                    </div>
                    <div class="column">
                        <router-link to="/register">Don't Have An Account..?</router-link>
                    </div>
                </div>
            </div>
        </div>
        <b-loading :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="true"></b-loading>
    </section> 
     
</template>

<script>

import axios from 'axios'

const baseUrl = 'http://localhost:8080'
export default {
    name: "Login",
    components:{
    },
    data(){
        return{
            isLoading: false,
            isFullPage: true,
            loginRequest:{
                username:'',
                password:''
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
                    // duration: 1000,
                    message: data,
                    position: 'is-bottom',
                    type: 'is-danger'
            })
        },
        // info(data){
            // this.$buefy.toast.open(data)
        // },

        login(){
            this.isLoading = true;
            setTimeout(()=> {
                axios({
                    method: 'post',
                    url: baseUrl+"/login",
                    data: this.$data.loginRequest
                })
                .then(response=>{
                if(response.data.token){
                    
                    this.success("Hello Nishtha! :)")
                    localStorage.setItem('token',response.data.token)
                    
                        this.$router.push({ path: 'dashboard/allBillers'})
                    } else{
                        console.log(response+" jiedj")
                        this.failure(response.data);
                    }
                    })
                .catch(error=>{
                    this.failure(error)
                })
            this.isLoading=false
            },2*1000)
        }
    },
    mounted(){
        localStorage.removeItem("token")
    } 
}
</script>

<style scoped>
/* .bg-img { 
        background-image: url("src/assets/b2.jpg") ;
        background-position: center center;
        background-repeat:  no-repeat;
        background-attachment: fixed;
        background-size:  cover;
        background-color: #999;

 } */
</style>