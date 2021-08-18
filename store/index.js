import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    rain_list: [
      {
        name: "春雨舒缓",
        src: "https://img.nazzzz.cn/rain_cysh.wav"
      },
	  {
	    name: "小雷雨",
	    src: "https://img.nazzzz.cn/rain_xly.wav"
	  },
	  {
	    name: "狂风暴雨",
	    src: "https://img.nazzzz.cn/rain_hfby.wav"
	  },
	  {
	    name: "暴雨哗哗哗",
	    src: "https://img.nazzzz.cn/rain_byhhh.wav"
	  }
    ],
    rain_index: 0,
    bgm_list: [
      {
        name: "Kiss The Rain",
        src: "https://img.nazzzz.cn/bgm_KissTheRain.mp3"
      },
	  {
	    name: "致爱丽丝",
	    src: "https://img.nazzzz.cn/bgm_elise.mp3"
	  }
    ],
    bgm_index: 0,
    alarm_list: [
      {
        name: "滴滴",
        src: "https://img.nazzzz.cn/alarm_didi.wav"
      },
	  {
	    name: "布谷",
	    src: "https://img.nazzzz.cn/alarm_bugu.wav"
	  }
    ],
    alarm_index: 0,
  },
  getters: {
    rain(state ) {
      return state.rain_list[state.rain_index];
    },
    bgm(state ) {
      return state.bgm_list[state.bgm_index];
    },
    alarm(state ) {
      return state.alarm_list[state.alarm_index];
    },
  },
  mutations: {
    changeRain(state, index) {
      state.rain_index = index;
      uni.setStorage({key: 'rain_index',data: index});
    },
    changeBgm(state, index) {
      state.bgm_index = index;
      uni.setStorage({key: 'bgm_index',data: index});
    },
    changeAlarm(state, index) {
      uni.setStorage({key: 'bgm_index',data: index});
      state.alarm_index = index;
    }
  }
});