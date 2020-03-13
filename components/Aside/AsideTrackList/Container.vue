<template>
  <HOC
    :album="album"
    :tracks="tracks"
  >
    <Presentational
      slot-scope="{
        albumName,
        trackItems
      }"
      :album="album"
      :album-name="albumName"
      :tracks="trackItems"
      :current-sound="currentSound"
      :is-playing="$store.state.appPlayerRefactor.audioIsPlaying"
      @playTrack="v => $emit('playTrack', v)"
      @clickAlbum="$emit('clickAlbum')"
      @clickAlbumMore="$emit('clickAlbumMore')"
      @clickLink="$emit('clickLink')"
    />
  </HOC>
</template>

<script>
import _ from 'lodash'

import HOC from './HOC.vue'
import Presentational from './Presentational.vue'

export default {
  components: {
    HOC,
    Presentational
  },
  props: {
    album: {
      type: Object,
      default() {
        return {}
      }
    },
    tracks: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    currentSound() {
      const list = this.$store.state.appPlayerRefactor.audioList
      const index = this.$store.state.appPlayerRefactor.audioCurrentIndex
      return _.get(list, index, {})
    }
  }
}
</script>
