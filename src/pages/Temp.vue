<template>
    <div id="temp"></div>
</template>

<script>
    export default {
        name: 'Temp',
        methods:{

        },
        created() {

            let flag = sessionStorage.getItem('loginFlag');
            if(!flag){
                this.$router.push({name:'login'});
            }

        }

    };
</script>

<style scoped>

</style>
