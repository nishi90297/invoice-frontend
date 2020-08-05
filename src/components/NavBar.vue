<template>
    <div>
        <b-navbar>
        <template slot="start">
            <router-link to="/allBillers">
                All Billers &nbsp;                 
            </router-link>
            <router-link to="/register">
                Register Biller
            </router-link>
            <!-- <b-navbar-dropdown label="Info">
                <b-navbar-item href="#">
                    About
                </b-navbar-item>
                <b-navbar-item href="#">
                    Contact
                </b-navbar-item>
            </b-navbar-dropdown> -->
        </template>

        <!-- <template slot="end">
            <b-navbar-item tag="div">
                <div class="buttons">
                    <a class="button is-primary">
                        <strong>Sign up</strong>
                    </a>
                    <a class="button is-light">
                        Log in
                    </a>
                </div>
            </b-navbar-item>
        </template> -->
    </b-navbar>
    <br>
    </div>
</template>

<script>
export default {
    name: 'NavBar'
}
</script>

<style scoped>

#space{
    margin: 10px;
}
</style>