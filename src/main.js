import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button, Icon, Swipe, SwipeItem } from 'vant';
const app = createApp();
let vantarr = [
    Button, Icon, Swipe, SwipeItem
]
vantarr.forEach((item) => {
    return app.use(item)
})
createApp(App).use(store).use(router).mount('#app')