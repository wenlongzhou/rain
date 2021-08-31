import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    musicName: '',
    rainList: [{
        name: "无",
        fileName: '',
      },{
        name: "小雨浠沥沥",
        fileName: 'rainXyxll',
      },
      {
        name: "小雷雨",
        fileName: "rainLy"
      },
      {
        name: "大雨",
        fileName: "rainKfby"
      },
      {
        name: "森林的雨",
        fileName: "rainSldy"
      }
    ],
    rainIndex: typeof(uni.getStorageSync('rainIndex')) === 'number' ? uni.getStorageSync('rainIndex') : 1,
    bgmList: [{
        name: "无",
        fileName: '',
      },{
        name: "Kiss The Rain",
        fileName: "bgmKissTheRain"
      },
      {
        name: "Eternal Flame",
        fileName: "bgmEternalFlame"
      },
      {
        name: "In Autumn, the Leaves Came to Our House",
        fileName: "bgmInAutumn"
      }
    ],
    bgmIndex: typeof(uni.getStorageSync('bgmIndex')) === 'number' ? uni.getStorageSync('bgmIndex') : 1,
    alarmList: [{
        name: "滴滴",
        src: "https://img.nazzzz.cn/DiDi.mp3"
      },
      {
        name: "布谷",
        src: "https://img.nazzzz.cn/BuGu.mp3"
      }
    ],
    alarmIndex: typeof(uni.getStorageSync('alarmIndex')) === 'number' ? uni.getStorageSync('alarmIndex') : 0,
  },
  getters: {
    music(state) {
      let fileName = '';
      if (state.bgmIndex >= 0) {
        fileName += state.bgmList[state.bgmIndex].fileName;
      }
      if (state.rainIndex >= 0) {
        fileName += state.rainList[state.rainIndex].fileName;
      }
      
      return  `https://img.nazzzz.cn/${fileName}.mp3`;
    },
    musicName(state) {
      let musicName = [];
      if (state.bgmIndex >= 0) {
        musicName.push(state.bgmList[state.bgmIndex].name);
      }
      if (state.rainIndex >= 0) {
        musicName.push(state.rainList[state.rainIndex].name);
      }
      
      return musicName.join(' ');
    },
    alarm(state) {
      return state.alarmList[state.alarmIndex];
    },
  },
  mutations: {
    changeRain(state, index) {
      state.rainIndex = index;
      uni.setStorage({
        key: 'rainIndex',
        data: parseInt(index)
      });
    },
    changeBgm(state, index) {
      state.bgmIndex = index;
      uni.setStorage({
        key: 'bgmIndex',
        data: parseInt(index)
      });
    },
    changeAlarm(state, index) {
      state.alarmIndex = index;
      uni.setStorage({
        key: 'alarmIndex',
        data: parseInt(index)
      });
    }
  }
});
