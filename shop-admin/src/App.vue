<template>
  <router-view></router-view>
</template>

<script setup>

</script>

<style>
/*去掉scoped 直接去污染 nprogress进度条的样式*/
/*修改全局nprogress进度条的样式*/
#nprogress .bar {
  background: #f4f4f4 !important;
  height: 3px !important;
}

</style>
