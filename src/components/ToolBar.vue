<!--
 * @Author: spOmwenda
 * @Date: 2023-06-12 19:54:38
 * @LastEditTime: 2023-06-12 21:10:22
 * @LastEditors: spOmwenda
 * @Description: desc
 * @FilePath: /practice/src/components/ToolBar.vue
-->
<template>
    <div class="theme">
        <el-switch 
        v-model="isDark"
        inline-prompt
        :active-icon="Moon"
        :inactive-icon="Sunny"
        />
    </div>
    
</template>

<script setup lang="ts">
import { useDark } from '@vueuse/core'
import { watchEffect } from 'vue';
import { Sunny, Moon } from '@element-plus/icons-vue'
import { useTheme } from "@/stores/counter"

const isDark = useDark({
    storageKey: "theme",
    valueDark: "dark",
    valueLight: "light",
});

const {change} = useTheme();

watchEffect(() => { 
    change(isDark.value);
});

</script>

<style scoped lang="less">
.theme {
    width: 85%;
    margin: auto;
    margin-top: 10px;
}
</style>