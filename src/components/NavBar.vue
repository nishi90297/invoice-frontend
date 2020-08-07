<template>
    <div>
        <b-navbar>
        <template slot="start">
            <b-navbar-item tag="div">
                <div class="buttons">
                    <router-link to="/allBillers" class="button is-light" >
                        <strong>All Billers</strong>
                    </router-link>
                </div>
            </b-navbar-item>
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
                    <router-link to="/register" class="button is-primary">
                        <strong>Sign up</strong>
                    </router-link>
                    <router-link to="/login" class="button is-light">
                        Log Out
                    </router-link>
                </div>
            </b-navbar-item>
        </template>
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