<template>
  <div>
    <div style="background: #fff;position: relative;height: 40px;">
      <div class="i-tab">
        <div style="display: inline-block;font-size: 0" v-for="(item,i) in iTabItems">
          <span class="i-tab-item" ref="tab-item" :style="{'color':curTabItem===i?'#E87B0F':'#444'}" @click="setCurTabItem(i)">{{item.title}}</span>
        </div>
      </div>
      <div style="height: 3px;background: #E87B0F;transition: all .3s;position: absolute"
           :style="{'width':width,'left':left}"></div>
    </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    provide() {
      return {
        setiTabItems: this.setiTabItems
      }
    },
    data() {
      return {
        iTabItems: [],
        curTabItem: 0,
        width: '',
        left: ''
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.setCurTabItem(0)
      })
    },
    methods: {
      setiTabItems(title, index,iTabItem) {
        this.iTabItems.push({
          title: title,
          index: index,
          item:iTabItem,
        })
      },
      setCurTabItem(index) {
        this.curTabItem = index
        this.width = this.$refs['tab-item'][this.curTabItem].offsetWidth + 'px'
        this.left = this.$refs['tab-item'][this.curTabItem].offsetLeft + 'px'
        this.iTabItems.forEach(v=>{
          v.item.curItabItem=this.iTabItems[this.curTabItem].index
        })
        this.$emit('on-select-tabItem',this.iTabItems[this.curTabItem].index)
      }
    }
  }
</script>

<style scoped>
  .i-tab {
    color: #444;
    height: 37px;

  }
  .i-tab-item {
    display: inline-block;
    margin: 0 15px;
    line-height: 40px;
    font-size: 15px;
    height: 37px;
    cursor: pointer;
  }


</style>
