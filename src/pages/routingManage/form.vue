<template>
    <div id="form">
        <standard-form @goback="goBack"></standard-form>
    </div>
</template>

<script>
    import standardForm from './standard.vue';
    export default {
        components: {
            standardForm
        },
        data() {
            return {};
        },
        methods: {
            goBack(str) {
                let that = this;
                this.$router.push({
                    path: '/routing/hiddenDanger'
                });
                that.$store.commit('setAside_status', true);
                that.$emit('showAside');
                sessionStorage.setItem('dispatchFlag', 'false');
            }
        },
        created() {},
        beforeDestroy() {
            this.$router.push({
                path: '/routing/hiddenDanger'
            });
        }
    };
</script>

<style lang="scss" scoped>
    #form {
        width: 100%;
        height: 100%;
    }
</style>
