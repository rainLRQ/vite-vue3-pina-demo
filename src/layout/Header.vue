<script setup lang="ts">
import {computed} from 'vue'
import Logo from "./Logo.vue";
import {Breadcrumb as ABreadcrumb} from 'ant-design-vue'
import {useRoute} from "vue-router";
const routes = useRoute()
const matched = computed(() => routes.matched)
const ABreadcrumbItem = ABreadcrumb.Item

</script>

<template>
	<header class="layout-header">
		<Logo class="header-logo"></Logo>
		<a-breadcrumb class="header-breadcrumb">
			<a-breadcrumb-item v-for="item in matched" :key="item.name">{{ item.meta?.title || item.name }}</a-breadcrumb-item>
		</a-breadcrumb>
	</header>
</template>

<style scoped lang="scss">
.layout-header {
	position: absolute;
	height: 60px;
	top: 0;
	left: 0;
	right: 0;
	//border: 1px solid #efefef;
	//box-shadow: 0 0 10px 0 #dedede;
	box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);
	.header-logo {
		position: absolute;
	}
	.header-breadcrumb {
		padding-left: 16px;
		margin-left: 260px;
		line-height: 60px;
	}
}

</style>
