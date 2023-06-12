/*
 * @Author: spOmwenda
 * @Date: 2023-06-12 17:59:24
 * @LastEditTime: 2023-06-12 18:02:38
 * @LastEditors: spOmwenda
 * @Description: desc
 * @FilePath: /practice/src/composables/useBoolean.ts
 */

import { type Ref, ref } from "vue";

interface Actions {
  setTrue: () => void;
  setFalse: () => void;
  toggle: (value?: boolean | undefined) => void;
}
const useBoolean = (defaultValue = false): [Ref<boolean>, Actions] => {
  const bool = ref(defaultValue);
  return [bool, { setFalse: () => { bool.value = false }, setTrue: () => { bool.value = true }, toggle: () => { bool.value = !bool.value } }]
};

export default useBoolean;
