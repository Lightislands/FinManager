<template>
    <div>
        <h1>Expense</h1>
        <app-records :type="type"></app-records> <!-- type true = expense -->
    </div>
</template>

<script>

    import Records from './Records.vue';

    export default {
        data(){
            return {
                type: true
            }
        },
        components: {
            appRecords: Records
        }
    }
</script>