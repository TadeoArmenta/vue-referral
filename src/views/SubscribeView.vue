<template>
  <div class="bg-white mx-auto">
    <div class="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <h2 class="inline text-3xl font-bold tracking-tight text-gray-900 sm:block sm:text-4xl">Want product news and updates?</h2>
      <p class="inline text-3xl font-bold tracking-tight text-indigo-600 sm:block sm:text-4xl">Sign up for our newsletter.</p>
      <form class="mt-8 sm:flex" @submit.prevent="subscribe">
        <label for="email-address" class="sr-only">Email address</label>
        <input
            v-model="email"
            id="email-address"
            name="email"
            type="email"
            autocomplete="email"
            required
            class="w-full rounded-md border-gray-300 px-5 py-1.5 placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs"
            placeholder="Enter your email"
        />
        <div class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
          <button
              v-text="'Join wait list'"
              class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";

const route = useRoute();
const email = ref<string>('')
const subscribe = () => {
  console.log(import.meta.env.VITE_API)
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  const urlencoded = new URLSearchParams();
  urlencoded.append("email", email.value);
  fetch(`${import.meta.env.VITE_API}/user`, {
    mode: 'no-cors',
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  })
      .then(response=>response.text())
      .then(result=>{
        console.log('Result: ',result)
      })
      .catch(e=>{console.log(e)})
}

onMounted(()=>{
  console.log(route.name)
  console.log(route.params.refId)
})
</script>
<script lang="ts">export default {name: "SubscribeView"}</script>
<style scoped></style>