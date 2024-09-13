<template>
  <GeneratoPassword />

</template>

<script>
import GeneratoPassword from './components/GeneratoPassword.vue';

export default {
  name: 'App',
  components: {
    GeneratoPassword
  }
}
</script>

<style>
@font-face {
    font-family: "JetBrains Mono";
    src: url('/src/assets/fonts/JetBrainsMono-VariableFont_wght.ttf') format('truetype'),
         url('/src/assets/fonts/JetBrainsMono-VariableFont_wght.ttf') format('truetype');
}
* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}
</style>
