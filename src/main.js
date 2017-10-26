// 步骤1：导入 vue这个包
// var Vue = require('vue');
import Vue from 'vue';

// 步骤2：想要解析和呈现App.vue组件的内容，则导入 App.vue组件
// var App = require('./App.vue');
import App from './App.vue';




// 1.导入vue-router路由  及路由的写法
import vueRouter from 'vue-router';

//   1.1将vueRouter绑定vue
Vue.use(vueRouter);

// 1.2定义路由规则
//   导入login.vue组件对象
import layout from './components/site/layout.vue';

// 导入商品列表组件
import goodslist from './components/site/goodslist.vue';

// 导入商品详情组件
import goodsinfo from './components/site/goodsinfo.vue';


var router = new vueRouter({
    routes: [
        { name: 'default', path: '/', redirect: '/site' },
        {
            name: 'layout',
            path: '/site',
            component: layout,
            children: [
                { name: 'goodslist', path: 'goodslist', component: goodslist }, //商品列表的路由规则
                { name: 'goodsinfo', path: 'goodsinfo/:goodsid', component: goodsinfo }
            ]
        }
    ]
})



// 2.导入axios
//   2.0，导入包
import axios from 'axios';
// 2.1设定axios的基本uel请求前缀
axios.defaults.baseURL = 'http://157.122.54.189:9095';

//    2.2将axios轨道vue的原型属性上
Vue.prototype.$http = axios;

// 设定axios的参数使axios发出的请求自动带上cookie

axios.defaults.withCredentials = true;

// 3.使用element-ui
//    3.1导入文件
import elementUI from 'element-ui';
// 3.0.2 导入elemeui的css控制样式
// 由于项目的样式和elementui的css样式有些不一样，那么修改了这个样式以后，要利用自己的样式替换原来的原有样式

// import 'element-ui/lib/theme-default/index.css';

// 3.0.3 绑定
Vue.use(elementUI);

import '../statics/css/style.css';







// 时间过滤器
Vue.filter('datefmt', (input, fmtstring) => {
    var date = new Date(input)

    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var h = date.getHours();
    var mi = date.getMinutes();
    var s = date.getSeconds();
    if (fmtstring == 'YY-MM-DD') {
        return y + '-' + m + '-' + d;
    } else if (fmtstring == 'YY-MM-DD HH:mm:ss') {
        return y + '-' + m + '-' + d + h + ':' + mi + ':' + s;
    }

})


new Vue({
    el: '#app',
    // 使用app这个组件对象
    // es5的写法
    // render:function(create){create(App);}

    router,

    // es6的写法
    render: create => create(App)
});