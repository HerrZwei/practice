<!--
 * @Author: spOmwenda
 * @Date: 2023-06-12 11:35:24
 * @LastEditTime: 2023-06-12 14:03:48
 * @LastEditors: spOmwenda
 * @Description: desc
 * @FilePath: /practice/src/App.vue
-->


<template>
  <Editor />
</template>

<script setup lang="ts">
import  Editor from "@/components/Editor.vue"
</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
