<template>
    <div>
        <h1>Income</h1>
        <app-record v-for="record in records" :record="record"></app-record> <!-- S1. display component Record here, and loop thro the data -->
                                                <!-- Send "record" from loop to component - :record="record" -->
    </div>
</template>
<script>
    import Record from './Record.vue';

    export default {
        data(){
            return {
                records: [
                    { id: 1, name: 'BMW', price: 110},
                    { id: 2, name: 'Google', price: 200},
                    { id: 3, name: 'Apple', price: 250},
                    { id: 4, name: 'Twitter', price: 8}
                ]
            }
        },
        components: {
            appRecord: Record
        }
    }
</script>