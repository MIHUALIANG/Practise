import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import '../src/CSS/HomeView.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

// 彻底解决ResizeObserver错误
const resizeObserverErrorHandler = e => {
  if (e.message === 'ResizeObserver loop completed with undelivered notifications.') {
    return;
  }
  console.error(e);
};

// 添加多个事件监听器，覆盖所有可能的情况
window.addEventListener('error', resizeObserverErrorHandler);

// 捕获未处理的Promise拒绝
window.addEventListener('unhandledrejection', e => {
  if (e.reason && e.reason.message && e.reason.message.includes('ResizeObserver')) {
    e.preventDefault();
    return;
  }
  console.error('Unhandled promise rejection:', e.reason);
});

// 重写ResizeObserver以避免循环错误
const ResizeObserverOrig = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends ResizeObserverOrig {
  constructor(callback) {
    const wrappedCallback = (entries, observer) => {
      try {
        return callback(entries, observer);
      } catch (e) {
        if (e.message === 'ResizeObserver loop completed with undelivered notifications.') {
          return;
        }
        throw e;
      }
    };
    super(wrappedCallback);
  }
};

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(ElementPlus).use(store).use(router).mount('#app');
