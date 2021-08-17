<template>
	<view class="content">
		<view class="control">
		</view>
		
		<view class="">
			<slider value="50" @change="sliderChange" show-value class="volume"/>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				"volume": 20,
			}
		},
		onLoad() { 
	
		},
		methods: {
			sliderChange(e) {
				console.log('value 发生变化：' + e.detail.value)
			}
		}
	}
</script>

<style>
	.volume {
		width: 750rpx;
		margin: 0;
	}
</style>
