import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import _ from 'lodash'
import flushPromises from 'flush-promises'
import AppPlayer from '../AppPlayerRefactor.vue'
import BasePlayer from '../PlayerRefactor/BasePlayer.vue'
import { state, mutations, actions, getters } from '~/store/appPlayerRefactor'

const localVue = createLocalVue()
localVue.use(Vuex)

// customizer to overwrite properties if the source object properties are an empty object or an array, like overwrite store object/array by empty object/array.
const customizer = (objValue, srcValue) => {
  if (Array.isArray(srcValue)) {
    return srcValue
  }
  if (srcValue instanceof Object && Object.keys(srcValue).length === 0) {
    return srcValue
  }
}

// createStore factory
// usage: createStore({ getters: {}, actions: {}, //... })
// if you want to overwrite default store options
const createStore = overrides => {
  const defaultStoreConfig = {
    modules: {
      appPlayerRefactor: {
        namespaced: true,
        state,
        mutations,
        actions,
        getters
      }
    }
  }
  const store = new Vuex.Store(
    _.mergeWith(defaultStoreConfig, overrides, customizer)
  )

  return store
}

// createWrapper factory
// usage: createWrapper({ mocks: {}, store: createStore({ getters: {} }), //... })
// if you want to overwrite default mounting options,
// or want to keep reference to a mock in test.
const createWrapper = overrides => {
  const defaultMountingOptions = {
    mocks: {
      $fetchSingle: jest.fn(() => Promise.resolve({ items: [] })),
      $sendGAAppPlayer: jest.fn()
    },
    localVue,
    store: createStore()
  }
  return shallowMount(
    AppPlayer,
    _.mergeWith(defaultMountingOptions, overrides, customizer)
  )
}

describe('test actions independently', () => {
  test('RESET_AUDIO_LIST', () => {
    const commit = jest.fn()
    actions.RESET_AUDIO_LIST({ commit }, { list: [] })

    expect(commit).toHaveBeenCalledWith('SET_AUDIO_LIST', [])
    expect(commit).toHaveBeenCalledWith('SET_AUDIO_CURRENT_INDEX', 0)
    expect(commit).toHaveBeenCalledWith('SET_UPDATE_TIME', 0)
    expect(commit).toHaveBeenCalledWith('SET_AUDIO_IS_PLAYING', false)
  })
})

describe('data binding with store', () => {
  test('BasePlayer can received correct props from store', () => {
    const audioIsPlaying = true
    const audioVolume = 0.8
    const audioPlaybackRate = 0.5
    const audioCurrentTime = 1234
    const audioDuration = 12345
    const updateTime = 100
    const audioList = [
      {
        title: 'first single',
        slug: 'first-single',
        audioSrc: 'http://first-single.wav',
        coverImgSrc: 'http://first-single.jpg'
      },
      {
        title: 'second single',
        slug: 'second-single',
        audioSrc: 'http://second-single.wav',
        coverImgSrc: 'http://second-single.jpg'
      }
    ]
    const audioCurrentIndex = 1

    const store = createStore({
      modules: {
        appPlayerRefactor: {
          namespaced: true,
          state: () => ({
            audioIsPlaying,
            audioVolume,
            audioPlaybackRate,
            audioCurrentTime,
            audioDuration,
            updateTime,
            audioList,
            audioCurrentIndex
          }),
          mutations,
          actions,
          getters
        }
      }
    })
    const wrapper = createWrapper({ store })
    const player = wrapper.find(BasePlayer)

    expect(player.props().isPlaying).toBe(audioIsPlaying)
    expect(player.props().volume).toBe(audioVolume)
    expect(player.props().playbackRate).toBe(audioPlaybackRate)
    expect(player.props().currentTime).toBe(audioCurrentTime)
    expect(player.props().updateTime).toBe(updateTime)
    expect(player.props().audioList).toEqual(audioList)
    expect(player.props().audioCurrentIndex).toEqual(audioCurrentIndex)
    expect(wrapper.vm.currentSlug).toBe(audioList[audioCurrentIndex].slug)
  })

  test('commit "appPlayerRefactor/SET_AUDIO_IS_PLAYING" mutation when isPlaying state changed by player', () => {
    const store = createStore()
    const wrapper = createWrapper({ store })
    store.commit = jest.fn()

    const player = wrapper.find(BasePlayer)

    player.vm.$emit('update:isPlaying', true)

    expect(store.commit).toHaveBeenCalledWith(
      'appPlayerRefactor/SET_AUDIO_IS_PLAYING',
      true
    )

    player.vm.$emit('update:isPlaying', false)

    expect(store.commit).toHaveBeenCalledWith(
      'appPlayerRefactor/SET_AUDIO_IS_PLAYING',
      false
    )
  })

  test('commit "appPlayerRefactor/SET_AUDIO_VOLUME" mutation when volume state changed by player', () => {
    const store = createStore()
    const wrapper = createWrapper({ store })
    store.commit = jest.fn()

    const player = wrapper.find(BasePlayer)

    const volume = 0.66
    player.vm.$emit('update:volume', volume)

    expect(store.commit).toHaveBeenCalledWith(
      'appPlayerRefactor/SET_AUDIO_VOLUME',
      volume
    )
  })

  test('commit "appPlayerRefactor/SET_AUDIO_PLAYBACK_RATE" mutation when playbackRate state changed by player', () => {
    const store = createStore()
    const wrapper = createWrapper({ store })
    store.commit = jest.fn()

    const player = wrapper.find(BasePlayer)

    const playbackRate = 0.25
    player.vm.$emit('update:playbackRate', playbackRate)

    expect(store.commit).toHaveBeenCalledWith(
      'appPlayerRefactor/SET_AUDIO_PLAYBACK_RATE',
      playbackRate
    )
  })

  test('commit "appPlayerRefactor/SET_AUDIO_CURRENT_TIME" mutation when currentTime state changed by player', () => {
    const store = createStore()
    const wrapper = createWrapper({ store })
    store.commit = jest.fn()

    const player = wrapper.find(BasePlayer)

    const currentTime = 1234
    player.vm.$emit('update:currentTime', currentTime)

    expect(store.commit).toHaveBeenCalledWith(
      'appPlayerRefactor/SET_AUDIO_CURRENT_TIME',
      currentTime
    )
  })

  test('commit "appPlayerRefactor/SET_AUDIO_DURATION" mutation when player emit durationchange event', () => {
    const store = createStore()
    const wrapper = createWrapper({ store })
    store.commit = jest.fn()

    const player = wrapper.find(BasePlayer)
    const duration = 12345
    player.vm.$emit('durationchange', {
      target: {
        duration
      }
    })

    expect(store.commit).toHaveBeenCalledWith(
      'appPlayerRefactor/SET_AUDIO_DURATION',
      duration
    )
  })

  test('commit "appPlayerRefactor/SET_AUDIO_CURRENT_INDEX" mutation when audioCurrentIndex state changed by player', () => {
    const store = createStore()
    const wrapper = createWrapper({ store })
    store.commit = jest.fn()

    const player = wrapper.find(BasePlayer)

    const audioCurrentIndex = 1
    player.vm.$emit('update:audioCurrentIndex', audioCurrentIndex)

    expect(store.commit).toHaveBeenCalledWith(
      'appPlayerRefactor/SET_AUDIO_CURRENT_INDEX',
      audioCurrentIndex
    )
  })
})

describe('component lifecycle hooks', () => {
  test('fetch latest single along with AppPlayer created', async () => {
    expect.assertions(2)

    const $fetchSingle = jest.fn(() => Promise.resolve({ items: [] }))
    const store = createStore()
    createWrapper({
      mocks: {
        $fetchSingle
      },
      store
    })
    store.dispatch = jest.fn(() => Promise.resolve())

    await flushPromises()

    expect($fetchSingle).toHaveBeenCalledWith({
      max_results: 1,
      page: 1,
      sort: '-publishedDate',
      embedded: {
        albums: 1
      }
    })

    expect(store.dispatch).toHaveBeenCalledWith(
      'appPlayerRefactor/RESET_AUDIO_LIST',
      { list: [] }
    )
  })
})

describe('snapshot tests', () => {
  test('renders component correctly if we provide efficient props', () => {
    const audioIsPlaying = true
    const audioVolume = 0.8
    const audioPlaybackRate = 0.5
    const audioCurrentTime = 1234
    const audioDuration = 12345
    const updateTime = 100
    const audioList = [
      {
        title: 'first single',
        slug: 'first-single',
        audioSrc: 'http://first-single.wav',
        coverImgSrc: 'http://first-single.jpg'
      },
      {
        title: 'second single',
        slug: 'second-single',
        audioSrc: 'http://second-single.wav',
        coverImgSrc: 'http://second-single.jpg'
      }
    ]
    const audioCurrentIndex = 1

    const store = createStore({
      modules: {
        appPlayerRefactor: {
          namespaced: true,
          state: () => ({
            audioIsPlaying,
            audioVolume,
            audioPlaybackRate,
            audioCurrentTime,
            audioDuration,
            updateTime,
            audioList,
            audioCurrentIndex
          }),
          mutations,
          actions,
          getters
        }
      }
    })
    const wrapper = createWrapper({ store })

    expect(wrapper.element).toMatchSnapshot()
  })
})
