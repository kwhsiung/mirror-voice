import { shallowMount } from '@vue/test-utils'
import BasePlayerNavs from '../BasePlayerNavs.vue'

describe('BasePlayerNavs', () => {
  test('emit "rewind" event while rewind button clicked', () => {
    const wrapper = shallowMount(BasePlayerNavs)
    const button = wrapper.find('.rewind-button')
    button.trigger('click')

    expect(wrapper.emitted('rewind')).toHaveLength(1)
  })
  test('emit "fastforward" event while fastforward button clicked', () => {
    const wrapper = shallowMount(BasePlayerNavs)
    const button = wrapper.find('.fastforward-button')
    button.trigger('click')

    expect(wrapper.emitted('fastforward')).toHaveLength(1)
  })
  test('emit "backward" event while backward button clicked', () => {
    const wrapper = shallowMount(BasePlayerNavs)
    const button = wrapper.find('.backward-button')
    button.trigger('click')

    expect(wrapper.emitted('backward')).toHaveLength(1)
  })
  test('emit "forward" event while forward button clicked', () => {
    const wrapper = shallowMount(BasePlayerNavs)
    const button = wrapper.find('.forward-button')
    button.trigger('click')

    expect(wrapper.emitted('forward')).toHaveLength(1)
  })
  test('if "showTracksNav" is false, hide container of forward/backward buttons, vice versa', () => {
    let wrapper = shallowMount(BasePlayerNavs, {
      propsData: {
        showTracksNav: false
      }
    })
    let container = wrapper.find('.tracks-nav')

    expect(container.element.style.display).toBe('none')

    wrapper = shallowMount(BasePlayerNavs, {
      propsData: {
        showTracksNav: true
      }
    })
    container = wrapper.find('.tracks-nav')
    expect(container.element.style.display).not.toBe('none')
  })
  test('if "isPlaying" props is true, main button will be pause button', () => {
    const wrapper = shallowMount(BasePlayerNavs, {
      propsData: {
        isPlaying: true
      }
    })
    const button = wrapper.find('.main-button')

    expect(button.classes()).toContain('play')

    button.trigger('click')

    expect(wrapper.emitted('pause')).toHaveLength(1)
  })
  test('if "isPlaying" props is false, main button will be play button', () => {
    const wrapper = shallowMount(BasePlayerNavs, {
      propsData: {
        isPlaying: false
      }
    })
    const button = wrapper.find('.main-button')

    expect(button.classes()).toContain('pause')

    button.trigger('click')

    expect(wrapper.emitted('play')).toHaveLength(1)
  })
})
