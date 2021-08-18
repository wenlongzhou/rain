import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    rain_list: [
      {
        name: "致爱丽丝",
        src: "https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3",
      },
    ],
    rain_index: 0,
    bgm_list: [
      {
        name: "致爱丽丝",
        src: "https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3",
      },
    ],
    bgm_index: 0,
    alarm_list: [
      {
        name: "致爱丽丝",
        src: "https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3",
      },
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