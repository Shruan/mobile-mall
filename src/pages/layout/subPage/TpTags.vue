<template>
  <div class="shy__tp-tags">
    <div
      ref="tagsBox"
      class="tags-box"
      @wheel.prevent="handleScroll">
      <div
        class="tags-list"
        ref="tagsList"
        :style="`transform: translateX(${left}px);`">
        <el-tag
          closable
          ref="tag"
          size="medium"
          color="#fff"
          class="shy__tags"
          v-for="item in tagsList"
          :name="item.routerName"
          :key="item.routerName"
          @close="closeTag"
          @click.native="$router.push({ name: item.routerName })"
          >
          <i class="tags-icon"
            :class="{'icon-active': tag === item.routerName}"
          />
          {{item.label}}
        </el-tag>
      </div>
    </div>
    <div class="tags-btn">
      <el-dropdown trigger="click">
        <el-button
          type="primary"
          size="mini">
          关闭操作
          <i class="el-icon-caret-bottom el-icon--right"/>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>关闭所有</el-dropdown-item>
          <el-dropdown-item>关闭其他</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>

import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  components: {
  },
  data () {
    return {
      left: 0
    }
  },
  computed: {
    ...mapState('globalModule', [
      'user',
      'isCollapse',
      'tagsList',
      'tag'
    ])
  },
  watch: {
    '$route': {
      handler (to, from) {
        // 添加tag标签
        this._AddTag(to)
        this.moveToCurrentTag()
      }
    }
  },
  created () {
  },
  methods: {
    ...mapMutations('globalModule', [
      '_isCollapse',
      '_user'
    ]),
    ...mapActions('globalModule', [
      '_AddTag'
    ]),
    addTag () {
    },
    closeTag (val) {
    },
    // tag鼠标滚动事件
    handleScroll (e) {
      const padding = 15

      const eventDelta = e.wheelDelta || -e.deltaY * 3
      const $container = this.$refs.tagsBox
      const $containerWidth = $container.offsetWidth
      const $wrapper = this.$refs.tagsList
      const $wrapperWidth = $wrapper.offsetWidth
      if (eventDelta > 0) {
        this.left = Math.min(0, this.left + eventDelta)
      } else {
        if ($containerWidth - padding < $wrapperWidth) {
          if (this.left < -($wrapperWidth - $containerWidth + padding)) {
            this.left = this.left
          } else {
            this.left = Math.max(this.left + eventDelta, $containerWidth - $wrapperWidth - padding)
          }
        } else {
          this.left = 0
        }
      }
    },
    // 移动到视口事件
    moveToTarget ($target) {
      const padding = 5
      const $container = this.$refs.tagsBox
      const $containerWidth = $container.offsetWidth
      const $targetLeft = $target.offsetLeft
      const $targetWidth = $target.offsetWidth

      if ($targetLeft < -this.left) {
        // tag in the left
        this.left = -$targetLeft + padding
      } else if ($targetLeft + padding > -this.left && $targetLeft + $targetWidth < -this.left + $containerWidth - padding) {
        // tag in the current view
        // eslint-disable-line
      } else {
        // tag in the right
        this.left = -($targetLeft - ($containerWidth - $targetWidth) + padding) - 100
      }
    },
    moveToCurrentTag () {
      const tags = this.$refs.tag
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.$attrs.name === this.$route.name) {
            this.moveToTarget(tag.$el)
            break
          }
        }
      })
    }
  }
}
</script>

<style lang="css" scoped>
  .shy__tp-tags {
    position: relative;
    height: 45px;
    line-height: 45px;
    padding: 0 0 0 20px;
    box-shadow: 0 2px 6px #EDEDED;
  }
  .shy__tp-tags .icon {
    margin-right: 5px;
  }
  .shy__tp-tags .shy__tags {
    cursor: pointer;
  }
  .shy__tags {
    margin-right: 5px;
    color: #495060;
  }
  .shy__tags:hover {
    color: #999;
    cursor: pointer;
  }
  .tags-icon {
    display: inline-block;
    width: 10px;
    height: 10px;
    background: #eee;
    margin-right: 5px;
    border-radius: 50%;
    vertical-align: unset;
  }
  .icon-active {
    background: #409EFF;
  }
  .tags-box {
    white-space: nowrap;
    position: relative;
    overflow-y: hidden;
    width: 100%;
  }
  .tags-box::-webkit-scrollbar {
    display: none;
  }
  .tags-list {
    padding-right: 100px;
    display: inline-block;
    transition: transform .3s ease;
  }
  .tags-btn {
    position: absolute;
    right: 0;
    top: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-align: center;
    width: 120px;
    height: 100%;
    background: #fff;
    box-shadow: -2px 2px 6px #ededed;
    z-index: 10;
  }
</style>
