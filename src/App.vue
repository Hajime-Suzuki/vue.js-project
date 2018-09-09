<template lang='pug'>
#app
  #top.top(ref='top')
    h1
      | Hello,
      br
      | I'm {{fName}}!
      i(class="far fa-arrow-alt-circle-down" @click='scroll({target:"#section", delay:0})').icon.pointer
  #section
    .photo(:class='{fixed: isPicFixed}')
    #text-top.text-wrapper(:class='{fixed: isPicFixed}')
      div
        h1.name.hide-desktop {{fName}} {{lName}}
        transition-group(name='fade' mode='out-in')
          .text(v-for='(text, i) in texts' v-if='page===i' :key='i')

            .subtitle(v-if='page===0')
              h3 About Me
              i(class="far fa-smile").icon

            .subtitle(v-else-if='page==1')
              h3 My Backgorund
              i(class="far fa-building").icon

            .subtitle(v-else-if='page==2')
              h3 Other Interests
              i(class="fab fa-medapps").icon

            .paragraph(v-for='p in text' )
              p(v-if="p!=='travelPhoto' && p!=='craftPhoto'") {{p}}
              .images(v-if='page===2 && (p==="travelPhoto" || p==="craftPhoto")')
                img(
                  v-for='imgIndex in photos[p]'

                  :src='"./img/" +  imgIndex + ".jpg"'
                  :key='imgIndex'
                  )

      .nav
        i(class="far fa-caret-square-left" @click='clickPrev' v-if='page>0').icon.pointer
        i(class="far fa-caret-square-right" @click='clickNext' v-if='page<texts.length -1').icon.pointer
        p.page {{page + 1}}/{{texts.length}}
</template>

<script>
import throttle from 'lodash.throttle'
import texts from './texts/mainText.js'
export default {
  data() {
    return {
      fName: 'Hajime',
      lName: 'Suzuki',
      texts,
      photos: {
        travelPhoto: ['travel2', 'travel5', 'travel3'],
        craftPhoto: ['craft1', 'craft3', 'craft2']
      },
      page: 0,
      isPicFixed: null
    }
  },
  mounted() {
    this.topSection = this.$refs.top
    window.addEventListener(
      'resize',
      throttle(() => {
        if (window.innerWidth >= 1280) {
          window.location.reload()
        }
      }, 200)
    )

    if (window.innerWidth >= 1280) {
      window.addEventListener('scroll', this.onScroll)
    }
  },

  methods: {
    clickNext() {
      const options = {
        target: '#section',
        delay: 500,
        speed: 300
      }
      this.page++
      this.scroll(options)
    },
    clickPrev() {
      const options = {
        target: '#section',
        delay: 500,
        speed: 300
      }
      this.page--
      this.scroll(options)
    },
    scroll({ target, delay, speed = 500 }) {
      const options = {
        easing: 'ease-in-out',
        cancelable: true
      }
      setTimeout(() => {
        this.$scrollTo(target, speed, options)
      }, delay)
    },
    onScroll() {
      const topPos = this.topSection.getBoundingClientRect()
      this.isPicFixed = topPos.height + topPos.top < 0
    }
  }
}
</script>

<style lang="scss">
@import './scss/mixin.scss';
@import './scss/var.scss';
@import './scss/main.scss';

@keyframes upDown {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(0);
  }
}

.top {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h1 {
    margin: 0;
    font-size: 60px;
    line-height: 1.5em;
    font-family: 'Amatic SC';
    font-weight: bold;
    letter-spacing: 0.15em;
  }
  .icon {
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    font-size: 50px;
    width: 80px;
    color: $color_accent;
    bottom: 70px;
    animation: upDown 2s ease-in-out infinite;
    transition: $transition;
    &:hover {
      color: lighten($color_accent, 20%);
    }
  }
}

#section {
  min-height: calc(100vh - #{$section_margin});
  margin-bottom: $section_margin;
  @include desktop_m() {
    display: flex;
    margin: 0;
    position: relative;
    min-height: 100vh;
  }
}

.photo {
  width: 100%;
  height: 100vw * 2 / 3;
  background-image: url('./img/main2.jpg');
  background-size: cover;
  background-position: top;
  margin-bottom: $section_margin;
  @include tablet() {
    height: 100vw * 8 / 16;
    background-image: url('./img/main-m.jpg');
  }
  @include desktop_m() {
    width: $photo_width_desktop;
    height: 100vh;
    margin: 0;
    position: relative;
    background-position: top;
    background-image: url('./img/main2.jpg');

    &.fixed {
      position: fixed;
      top: 0;
      left: 0;
    }

    &:after {
      content: 'Hajime Suzuki';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 1em;
      font-size: 70px;
      color: white;
    }
  }
}

.text-wrapper {
  @include desktop_m() {
    box-sizing: border-box;
    width: $text_width_desktop;
    position: relative;
    margin: $section_margin 0 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: $section_margin;
    &.fixed {
      position: absolute;
      top: 0;
      left: $text_width_desktop;
    }
  }

  .name {
    margin-bottom: $section_margin;
  }

  .text {
    width: 80vw;
    margin: auto auto $section_margin;

    @include tablet() {
      width: 60%;
    }
    @include desktop_m() {
      width: 80%;
      margin-bottom: 0;
    }

    .subtitle {
      margin-bottom: calc(#{$section_margin} - 1em);
      h3 {
        font-weight: normal;
        margin: 0.5em;
        color: $color;
      }
      .icon {
        font-size: 30px;
        color: $color;
      }
    }

    .paragraph {
      text-align: justify;
      &:nth-of-type(2) {
        p {
          &:first-child {
            margin-top: 0;

            &:first-letter {
              font-size: 3em;
              color: $color_accent;
            }
          }
          text-align: justify;
        }
      }
    }

    .images {
      margin: 3em 0;
    }
    img {
      width: 100%;
      @include desktop_m() {
        width: 31%;
        margin: 0 1%;
      }
    }
  }
}

.nav {
  @include desktop_m() {
    margin-top: $section_margin;
  }
  .icon {
    font-size: 40px;
    margin: 0 20px;
    color: $color;
    transition: $transition;
    &:hover {
      color: darken($color, 10%);
    }
  }
  .page {
    margin-top: 0.5em;
    margin-bottom: 0;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave {
  opacity: 1;
}

.fade-leave-active {
  position: absolute;
  top: 0;
  right: 10%;
  transition: opacity 0.4s;
  @include tablet() {
    right: 20%;
  }

  @include desktop_m() {
    width: $text_width_desktop - $text_margin_desktop;
    right: 0;
    left: 0;
    margin: auto;
  }
}
</style>
