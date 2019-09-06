<template>

    <div id="dutyRecord">
        <h1>值班记事</h1>
        <div class="test">
            <calander-event />
          <dse-calander-event />
        </div>
    </div>

</template>

<script>


    import DseCalanderEvent from '../../common/components/DseCalanderEvent';
    export  default {
        components: {DseCalanderEvent},
        data(){
            return{

            };
        }

    };

</script>

<style scoped lang="scss">

#dutyRecord{
    width: 100%;
    height: 100%;
    .test{
        width: 100%;
        height: calc(100% - 40px);
    }
}

</style>
