<template>
    Home
</template>

<script lang="ts">
import { onMounted } from 'vue';
import { useStore } from 'vuex';


export default {
    name: 'HomeView',
    setup() {
        const store = useStore();
        onMounted(async () => {
            try {
                const response = await fetch('http://back-end:8080/api/v1/transactions', {
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include'
                })

                await store.dispatch('setAuth', true)
            } catch(e) {
                await store.dispatch('setAuth', false)
            }
        })
    }
}

</script>