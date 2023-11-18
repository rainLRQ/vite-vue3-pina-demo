<template>
    <div class="layout-container">
			<Header></Header>
      <Aside class="layout-aside"></Aside>
			<main class="layout-main">
				<router-view></router-view>
			</main>
    </div>
</template>

<script setup lang='ts'>
  import Aside from './Aside.vue';
	import Header from "./Header.vue";
</script>

<style lang="scss">
  .layout{
    &-container {
			box-sizing: border-box;
			padding-top: 60px;
			position: relative;
      display: grid;
			grid-template-rows: auto;
      grid-template-columns: 260px auto;
      grid-template-areas: 'aside main';
    }

    &-aside {
      grid-area: aside;
			height: 100%;
    }
    &-main {
			padding: 10px;
      grid-area: main;
    }
  }
</style>
