<template>
    <div>
        <h1>Income</h1>
        <app-records :type="type"></app-records>
    </div>
</template>
<script>

    import Records from './Records.vue';

    export default {
        data(){
            return {
                type: false
            }
        },
        components: {
            appRecords: Records
        }
    }
</script>