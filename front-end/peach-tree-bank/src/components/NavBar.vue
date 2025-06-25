<template>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <div class="container-fluid">
            <router-link to="/" class="navbar-brand">Home</router-link>
            <div>
                <ul class="navbar-nav me-auto mb-2 mb-md-0">
                    <li class="nav-item" >
                        <router-link to="/login" v-if="!auth" class="nav-link active">Log-in</router-link>
                        <router-link to="/login" v-if="auth" class="nav-link active" @click="logout">Log-out</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
    name: "NavBar",
    setup() {
        const store = useStore();
        const auth = computed(() => store.state.authenticated)

        const logout = async () => {
            await fetch('http://back-end:8080/api/v1/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            })
        }

        return {
            auth,
            logout
        }
    }
}
</script>
