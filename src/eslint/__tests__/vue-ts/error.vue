<template>
<div class="header">
  <p class="title">{title} </p>
  <button @click="onClick">Click me</button>
  <p>{num}</p>
</div>
</template>
<script setup lang="ts">
  onMount(() => {
  console.log('mount');
});

const num = ref<number>(null);
const onClick = () => {
  if (!num) {
    num.value = 1;
  } else {
    num.value = num.value + 1;
  }
}

const id = inject('id');
onMounted(() => {
  fetch('/api/users/' + id as any);
});
</script>
<style scoped>
.title {

}

.header {
  font-size: 32px
}
</style>
