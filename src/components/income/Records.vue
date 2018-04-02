<template>
    <div>
        <h1>Income</h1>
        <app-add-record></app-add-record>
        <app-record v-for="record in getAllRecords" :record="record"></app-record> <!-- S1. display component Record here, and loop thro the data -->
                                                <!-- Send "record" from loop to component - :record="record" -->
        <p>{{getName}}</p>

    </div>
</template>
<script>
    import Record from './Record.vue';
    import AddRecord from '../AddRecord.vue';

    import { mapGetters } from 'vuex';

    export default {
        computed: {
            ...mapGetters([
                'getAllRecords',
                'getName'
            ])
        },

        components: {
            appRecord: Record,
            appAddRecord: AddRecord
        }
    }
</script>