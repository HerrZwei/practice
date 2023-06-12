/*
 * @Author: spOmwenda
 * @Date: 2023-06-12 11:35:24
 * @LastEditTime: 2023-06-12 14:33:39
 * @LastEditors: spOmwenda
 * @Description: desc
 * @FilePath: /practice/src/components/__tests__/HelloWorld.spec.ts
 */
import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Editor from '@/components/Editor/index.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(Editor, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
