import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import '../src/CSS/HomeView.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

// 彻底解决ResizeObserver错误 - 重写 ResizeObserver
const ResizeObserverOrig = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends ResizeObserverOrig {
  constructor(callback) {
    const wrappedCallback = (entries, observer) => {
      try {
        return callback(entries, observer);
      } catch (e) {
        if (
          e.message && e.message.includes('ResizeObserver') ||
          e.message && e.message.includes('ResizeObserver loop')
        ) {
          return;
        }
        throw e;
      }
    };
    super(wrappedCallback);
  }
};

// 全局错误抑制
const originalError = window.console.error;
window.console.error = function(...args) {
  const message = args.join(' ');
  if (message.includes('ResizeObserver')) {
    return;
  }
  originalError.apply(window.console, args);
};

// 捕获所有错误
window.addEventListener('error', (e) => {
  if (e.message && e.message.includes('ResizeObserver')) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
}, true);

// 捕获未处理的Promise拒绝
window.addEventListener('unhandledrejection', (e) => {
  if (
    e.reason && 
    (
      (typeof e.reason === 'string' && e.reason.includes('ResizeObserver')) ||
      (e.reason.message && e.reason.message.includes('ResizeObserver'))
    )
  ) {
    e.preventDefault();
    return false;
  }
});

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(ElementPlus).use(store).use(router).mount('#app');
