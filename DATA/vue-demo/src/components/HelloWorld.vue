<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>欢迎使用Vue.js</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>