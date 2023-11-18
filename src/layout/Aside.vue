<template>
		<div class="aside">
			<div class="logo" v-if="false">vue3-app</div>
				<a-menu
						id="aside-nav"
						v-model:selectedKeys="selectedKeys"
						style="width: 100%;"
						mode="inline"
						:items="items"
						@click="handleClick"
				></a-menu>

		</div>

</template>
<script lang="ts" setup>
import {useRouter, Router, RouteRecordRaw, useRoute} from 'vue-router'
import { routes } from "../router"
import { reactive, ref, watch, VueElement, h} from 'vue'
import type { MenuProps, ItemType } from 'ant-design-vue'
import { Menu as AMenu } from 'ant-design-vue'

const route = useRoute()
let selectedKeys = ref([''])
watch(route, ()=> {
	selectedKeys.value = route.path.split('/')
}, {immediate: true})
// const openKeys = ref<string[]>(['']);
const router:Router = useRouter()
const asideRoutes: RouteRecordRaw[] | undefined = routes[0].children
console.log(asideRoutes,' asideRoutes')
function handleAsideRoutes(asideRoutes: Array<RouteRecordRaw> | undefined):Array<ItemType> {
	if(!asideRoutes || asideRoutes.length === 0) return []
	return asideRoutes.map((route: RouteRecordRaw)=> {
		return {
			label: route.meta?.title,
			key: route.path.replace('/', ''),
			icon: route.meta?.icon ? () => h(route.meta?.icon as VueElement) : undefined,
			children:  route.children && route.children.length  && handleAsideRoutes(route.children )
		}
	}) as ItemType[]
}
const items: ItemType[] = reactive(handleAsideRoutes(asideRoutes));
console.log(items, 'items')
const handleClick: MenuProps['onClick'] = (e) => {
	console.log('click', e);
	const path = '/' + e.keyPath!.join('/')
	router.push(path)
};

// watch(openKeys, val => {
// 	console.log('openKeys', val);
// });

</script>

<style scoped lang="scss">
.aside {
	min-height: 100%;
}
.logo {
	background-color: var(--theme-bg-color2);
	color: var(--aside-font-color);
	text-align: center;
	line-height: 46px;
}
#aside-nav {
	height: 100%;
}

</style>
