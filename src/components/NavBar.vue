<template>
    <b-navbar class="has-background-white-ter">
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <!-- <img
                    src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
                    alt="Invoicer Application"
                > -->
                <font-awesome-icon  icon="file-invoice" />  INVOICE GENERATOR
                <!-- <i class="fas fa-file-invoice"></i> -->
            </b-navbar-item>
        </template>
        <template slot="start">
            <!-- <b-navbar-item tag="div">
                <div class="buttons">
                    <router-link to="/allBillers" class="button is-light" >
                        <strong>All Billers</strong>
                    </router-link>
                </div>
            </b-navbar-item> -->
            <!-- <b-navbar-dropdown label="Info">
                <b-navbar-item href="#">
                    About
                </b-navbar-item>
                <b-navbar-item href="#">
                    Contact
                </b-navbar-item>
            </b-navbar-dropdown> -->
        </template>

        <template slot="end">
            <b-navbar-item tag="div">
                <div class="buttons">
                    <!-- <router-link to="/register" class="button is-primary">
                        <strong>Sign up</strong>
                    </router-link> -->
                    <b-button @click="logout()" class="button is-primary">
                        <strong>Log Out</strong>
                    </b-button>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
export default {
    name: 'NavBar',
    methods:{
        logout(){
            this.$buefy.dialog.confirm({
            message: 'Are you sure, you want to delete?',
            cancelText: 'Cancel',
            confirmText: 'Ok',
            onConfirm:() => {
            localStorage.removeItem('token')
            this.$router.push('/login')}})
        }
    }
}
</script>

<style scoped>

#space{
    margin: 10px;
}
</style>