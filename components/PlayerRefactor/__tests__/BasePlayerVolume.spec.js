import { shallowMount } from '@vue/test-utils'
import BasePlayerVolume from '../BasePlayerVolume.vue'
import BasePlayerSlider from '../BasePlayerSlider.vue'

describe('BasePlayerVolume', () => {
  test('have "mute" class on .button-toggler > img if volumeCurrent props is 0, otherwise not', () => {
    let wrapper = shallowMount(BasePlayerVolume, {
      propsData: {
        volumeCurrent: 0
      }
    })
    let img = wrapper.find('.button-toggler > img')

    expect(img.classes()).toContain('mute')

    wrapper = shallowMount(BasePlayerVolume, {
      propsData: {
        volumeCurrent: 0.66
      }
    })
    img = wrapper.find('.button-toggler > img')

    expect(img.classes()).not.toContain('mute')
  })
  test('emit "update:volumeCurrent" event while slider emit "update:valueCurrent" with value', () => {
    const valueChanged = 0.88
    const wrapper = shallowMount(BasePlayerVolume)
    const slider = wrapper.find(BasePlayerSlider)
    slider.vm.$emit('update:valueCurrent', valueChanged)

    expect(wrapper.emitted('update:volumeCurrent')[0]).toEqual([valueChanged])
  })
})
