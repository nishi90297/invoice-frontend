<template>
    <section>
        <div class="columns" style="padding-top:8vh">
            <div class="column is-2" >
                <side-bar></side-bar>
            </div>
            <div class="column">
                <router-view></router-view>
            </div>
        </div>
    </section>
</template>

<script>

import SideBar from '../components/SideBar'

export default {
    name:'Dashboard',  
    components:{
        SideBar
    }  
}
</script>

<style scoped>
    
</style>