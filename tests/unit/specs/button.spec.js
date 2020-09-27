import { shallowMount } from '@vue/test-utils'
import Button from '../../../packages/button/button.vue'

describe('Button', () => {
  it('添加icon', () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        icon: 'left'
      }
    })
    console.log(wrapper)
    let useElement = wrapper.find('use')
    console.log('attr', useElement)
  })
})