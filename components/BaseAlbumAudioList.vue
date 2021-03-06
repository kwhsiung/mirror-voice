<template>
  <div class="album-audio-list-wrapper">
    <div class="album-audio-list-wrapper__mobile-inner-wrapper">
      <nuxt-link
        :to="albumTo"
        class="album-audio-list-wrapper__album album"
      >
        <img
          v-lazy="albumCoverImgSrc"
          alt=""
          class="album__cover-img"
        >
        <div class="album__album-info album-info">
          <h1
            class="album-info__title"
            v-text="albumTitle"
          />
          <div
            class="album-info__description"
            v-html="albumDescriptionSanitized"
          />
        </div>
      </nuxt-link>
      <ol class="album-audio-list-wrapper__list list">
        <li
          v-for="(item, i) in listData"
          :key="i"
          :class="[
            'list__list-item',
            'list-item',
            { 'list-item--orange-border': showOrangeBorder(i) }
          ]"
        >
          <AppSingleWithPlayIcon
            :title="item.title"
            :title-line-clamp="2"
            :audio="item.audio"
            :show-duration="true"
            :to="item.link"
            class="list-item__single"
            @mouseover="handleMouseover(i)"
            @mouseout="handleMouseout"
          />
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import AppSingleWithPlayIcon from './AppSingleWithPlayIcon.vue'
import sanitizeContent from '~/plugins/util/sanitizeContent'

export default {
  components: {
    AppSingleWithPlayIcon
  },
  props: {
    albumTitle: {
      type: String,
      required: true
    },
    albumTo: {
      type: String,
      required: true
    },
    albumDescription: {
      type: String,
      required: true
    },
    albumCoverImgSrc: {
      type: String,
      required: true
    },
    listData: {
      type: Array,
      required: true,
      validator(data) {
        return (
          _.isEmpty(data) ||
          (_.every(data, d => 'title' in d) &&
            _.every(data, d => 'link' in d) &&
            _.every(data, d => 'audio' in d))
        )
      }
    }
  },
  data() {
    return {
      isMouseoverAt: -1
    }
  },
  computed: {
    albumDescriptionSanitized() {
      return sanitizeContent(this.albumDescription, 'categoriesShowcase')
    }
  },
  methods: {
    handleMouseover(i) {
      this.isMouseoverAt = i
    },
    handleMouseout() {
      this.isMouseoverAt = -1
    },
    showOrangeBorder(i) {
      return this.isMouseoverAt === i
    }
  }
}
</script>

<style lang="stylus" scoped>
.album-audio-list-wrapper
  width 630px
  background-color white
  padding 20px 20px 7.5px 20px
  min-height 377.5px

.album
  display flex
  &__cover-img
    width 100px
    min-width 100px
    height 100px
    min-height 100px
    border-radius 10px
    object-fit cover
  &__album-info
    margin 0 0 0 10px

.album-info
  &__title
    margin 10px 0 0 0
    color #1E170F
    font-size 18px
  &__description
    color #6F6F6F
    font-size 14px
    line-height 1.5
    margin 10px 0 0 0
    word-wrap: break-word;
    -webkit-line-clamp: 3;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;

.list
  list-style none
  padding 0
  margin 22px 0 0 0
  &__list-item
    padding 10px 0

.list-item
  border-bottom 1px solid #EFEFEF
  transition border-bottom .25s ease-out
  &--orange-border
    border-bottom 1px solid #FE5000

@media (max-width 768px)
  .album-audio-list-wrapper
    width 100%
    padding 0 10px
    min-height 0
    &__mobile-inner-wrapper
      border 1px solid #B8B8B8
      border-radius 10px
      padding 10px 10px 0 10px

  .album-info
    &__title
      font-size 15px
      margin 0
    &__description
      font-size 12px
      line-height 1.6

  .list
    margin 12px 0 0 0
    &__list-item
      &:nth-last-child(1)
        border-bottom none
</style>
