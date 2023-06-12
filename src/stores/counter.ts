/*
 * @Author: spOmwenda
 * @Date: 2023-06-12 11:35:24
 * @LastEditTime: 2023-06-12 21:03:27
 * @LastEditors: spOmwenda
 * @Description: desc
 * @FilePath: /practice/src/stores/counter.ts
 */
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

export const useTheme = defineStore("theme", () => {
  const dark = ref(false);
  const theme = computed(() => dark.value ? "dark" : "light");

  const change = (v: boolean) => {
    dark.value = v;
  }
  return { dark, theme, change }
});
