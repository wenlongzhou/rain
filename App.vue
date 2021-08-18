<script>
	export default {
		onLaunch: function() {
			let ts = this;
			uni.getStorage({
				key: 'rain_index',
				success: function (res) {
					ts.$store.commit('changeRain', res.data);
				}
			});

			uni.getStorage({
				key: 'bgm_index',
				success: function (res) {
					ts.$store.commit('changeBgm', res.data);
				}
			});

			uni.getStorage({
				key: 'alarm_index',
				success: function (res) {
					ts.$store.commit('changeAlarm', res.data);
				}
			});
		},
		onShow: function() {
		},
		onHide: function() {
		}
	}
</script>

<style>
@import './common/uni.css';

	/*每个页面公共css */
@font-face {
  font-family: 'iconfont';  /* Project id 2752445 */
  src: url('//at.alicdn.com/t/font_2752445_dfytpiujcwf.woff2?t=1629297729759') format('woff2'),
       url('//at.alicdn.com/t/font_2752445_dfytpiujcwf.woff?t=1629297729759') format('woff'),
       url('//at.alicdn.com/t/font_2752445_dfytpiujcwf.ttf?t=1629297729759') format('truetype');
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
