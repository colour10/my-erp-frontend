// alert.js
import Vue from 'vue';

// 具体的组件
import ImagePreview from './image-preview.vue';

const newInstance = properties => {
    const props = properties || {};
    // 实例化一个组件，然后挂载到body上
    const Instance = new Vue({
        data: props,
        render(h) {
            return h(ImagePreview, {
                props: props
            });
        }
    });
    const component = Instance.$mount();
    document.body.appendChild(component.$el);

    return Instance.$children[0];
};

//单例
let instance;

// 对外暴露的方法
export default {
    show (options) {
        instance = instance || newInstance(options)
        instance.show(options)
    }
}