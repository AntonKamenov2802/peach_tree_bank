<template>
    <form @submit.prevent="submit">
        <input v-model="data.username" type="text" class="form-control" placeholder="Username" required>
        <input v-model="data.password" type="password" class="form-control" placeholder="Password" required>
        <button class="btn btn-primary w-100 py-2" type="submit">Sign in</button>
    </form>
</template>

<script>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
export default {
    name: 'LogInView',
    setup() {
        const data = reactive({
            username: '',
            password: ''
        });

        const router = useRouter();

        const submit = async () => {
            await fetch('http://back-end:8080/api/v1/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(data)
            })
            console.log(data)
            await router.push('/');
        }


        return {
            data,
            submit
        };
    }
}
</script>