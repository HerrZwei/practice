<!--
 * @Author: spOmwenda
 * @Date: 2023-06-12 11:35:24
 * @LastEditTime: 2023-06-12 20:36:25
 * @LastEditors: spOmwenda
 * @Description: desc
 * @FilePath: /practice/src/App.vue
-->


<template>
  <ToolBar />
  <div class="main">
    <Editor />
  </div>
</template>

<script setup lang="ts">
import  Editor from "@/components/Editor/index.vue";
import ToolBar from "./components/ToolBar.vue";
</script>

<style lang="less" scoped>
@keyframes test {
  0% {
    opacity: 1;
    transform: translateY(0px);
  }

  100% {
    opacity: 0;
    transform: translateY(0px);
  }
}

body,
html {
  height: 100%;
  transition: all 0.2s;
}

.test {
  animation: test 2s ease-in-out forwards;
}

.container {
  width: 100%;
}

.main {
  width: 85%;
  margin: auto;
  margin-top: 10px;
}
</style>

<style>
/* @import 'element-plus/dist/index.css'; */
@import "@/global.less";
/* @import 'nprogress/nprogress.css'; */
</style>
