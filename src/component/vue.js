import { extend } from './object.js'

const extendComponent = function(component, wrapInfo) {
    wrapInfo.props = component.props;
    wrapInfo.methods = wrapInfo.methods || {}
    wrapInfo.methods.paramsPipe = wrapInfo.methods.paramsPipe || function(p){}
    wrapInfo.render = function(h) {
        const slots = Object.keys(this.$slots)
            .reduce((arr, key) => arr.concat(this.$slots[key]), [])
            .map(vnode => {
                vnode.context = this._self
                return vnode
            })


        let params = {
            on: this.$listeners,
            props: extend({}, this.$props),
            // 透传 scopedSlots
            scopedSlots: this.$scopedSlots,
            attrs: this.$attrs
        }
        this.paramsPipe(params);

        return h(component, params, slots)
    }

    return wrapInfo
}

export {extendComponent}

export default {}