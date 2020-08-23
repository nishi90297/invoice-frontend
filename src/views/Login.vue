<template>
    <section class="section" style="height:90vh">
        <div class="columns">
            <div class="column box is-4 is-offset-4">
                <div class="columns">
                    <div class="column has-text-centered is-size-3 has-text-primary is-uppercase">
                        <strong>WELCOME TO INVOICeR</strong>
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
                            <b-input type="password" id="password" v-model="loginRequest.password" placeholder="Enter Password" password-reveal> </b-input>
                        </b-field>
                    </div>
                </div>
                <div class="columns">
                    <div class="column has-text-centered">
                        <b-button type="is-primary" @click="login()">Log In</b-button>
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

strong{
    color: #6e248b;
}

.section { 
        background: url(/../src/assets/bg.png) ;
        background-repeat:  no-repeat;
        background-size:  cover;
        height:100vh;
        margin-top:4em;
 }
</style>