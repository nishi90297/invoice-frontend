<template>
    <section class="section has-background-twitter" style="height:90vh">
        <div class="columns">
            <div class="column box is-4 is-offset-4">
                <div class="columns">
                    <div class="column">
                        <b-field label="Username">
                            <b-input type="email" id="email" v-model="email" placeholder="Enter Username"> </b-input>
                        </b-field>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <b-field label="Password">
                            <b-input type="password" id="password" v-model="password" placeholder="Enter Password"> </b-input>
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
    </section>  
</template>

<script>

import axios from 'axios'

const baseUrl = 'http://localhost:8080/auth'
export default {
    name: "Login",
    components:{
    },
    data(){
        return{
            email:'',
            password:'',
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

        login(){
            var email = this.email
            var password = this.password
            axios({
                method: 'get',
                url: baseUrl+"/login?email="+email+'&password='+password,
            })
            .then(response=>{
               if(response.data=="Successfully login !"){
                    this.$router.push({ path: 'allBillers'})
                    this.success(response.data)
                } else{
                    this.failure(response.data);
                }
                })
            .catch(error=>{
                this.$buefy.toast.open({
                    duration: 5000,
                    message: error.data,
                    position: 'is-bottom',
                    type: 'is-danger'
                })
            })
        }
    }    
}
</script>

<style scoped>

</style>