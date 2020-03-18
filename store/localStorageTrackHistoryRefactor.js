import Vue from 'vue'

export const state = () => ({
  dict: {}
})

export const mutations = {
  MEMORIZE_TRACK(
    state,
    { track = {}, memorizedDate, memorizedDuration, memorizedCurrentTime }
  ) {
    if (!track.slug || track.slug === '') {
      throw new Error('please provide valid slug')
    }

    Vue.set(state.dict, track.slug, {
      ...track,
      memorizedDate,
      memorizedDuration,
      memorizedCurrentTime
    })
  }
}
