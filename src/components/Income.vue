<template>
    <div>
        <h1>Income</h1>
        <app-records type="income"></app-records>
    </div>
</template>
<script>

    import Records from './Records.vue';

    export default {
        components: {
            appRecords: Records
        }
    }
</script>