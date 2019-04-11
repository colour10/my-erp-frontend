import globals from './globals.js'
import {httpPost,httpGet} from './http.js'

const _label = globals.getLabel;

export default {
    data() {
        return {
            globals
        }
    },
    methods: {
        _log() {
            var arr = Array.prototype.slice.call(arguments)
            arr.unshift("<" + this.$options.name + ">")
            console.log.apply(console, arr);
        },
        _label,
        _fetch(path, form, options) {
            const self = this
            options = options || {}
            httpPost(path, form).then(function(result) {
                //console.log(result)
                if (result.messages.length > 0) {
                    //提示信息
                    if (options.showMessage == true) {
                        const h = self.$createElement;
                        var message = h("ul", null, result.messages.map(function(v) {
                            return h("li", null, v)
                        }))

                        self.$alert(message, _label("error_tip"), {
                            confirmButtonText: _label("ok")
                        });
                    }

                    if (options && typeof(options.onFail) == 'function') {
                        options.onFail()
                    }
                } else {
                    if (options.showMessage == true) {
                        let tip = options && options.successTip ? options.successTip : 'success'
                        self.$message({
                            message: _label(tip),
                            type: 'success'
                        });
                    }

                    if (result.is_add == "1") {
                        form.id = result.id;
                    }

                    if (typeof(options) == 'function') {
                        options(result)
                    } else if (options && typeof(options.onSuccess) == 'function') {
                        options.onSuccess(result)
                    }
                }
            })
        },
        _fetchPromise(path, form) {
            const self = this
            return new Promise((resolve, reject)=>{
                self._fetch(path, form, function(res){
                    resolve(res)
                })
            })
        },
        _submit(path, form, options) {
            const self = this
            options = options || {}
            options.showMessage = true

            self._fetch(path, form, options)
        },
        _submitPromise(path, form) {
            const self = this

            return new Promise((resolve, reject)=>{
                resolve.showMessage = true
                self._fetch(path, form, resolve)
            })
        },
        _confirm(message, callback) {
            var self = this;
            self.$confirm(message, _label('tip'), {
                confirmButtonText: _label('ok'),
                cancelButtonText: _label('cancel'),
                type: 'warning'
            }).then(() => {
                callback()
            }).catch(() => {});
        },
        async _remove(path, form, options) {
            var self = this;
            
            try {
                await self.$confirm(_label('delete_warning'), _label('tip'), {
                    confirmButtonText: _label('ok'),
                    cancelButtonText: _label('cancel'),
                    type: 'warning'
                })

                let result = await httpPost(path, form);

                if (result.messages.length > 0) {
                    const h = self.$createElement;
                    var message = h("ul", null, result.messages.map(function(v) {
                        return h("li", null, v)
                    }))

                    self.$alert(message, _label("error_tip"), {
                        confirmButtonText: _label("ok")
                    });

                    return false;
                } 
                else {
                    self.$message({
                        message: _label('delete_success'),
                        type: 'success'
                    });

                    return true;
                }
            }
            catch(e) {
                //self._log(e)
                return false
            }
        },
        _info(message) {
            let self = this
            self.$notify({
                type: 'warning',
                title: self._label("tishi"),
                message: message
            });
        },
        clearValidate(delay) {
            let form = this.$refs['order-form']
            //console.log(form)

            if(form) {
                if(delay && delay>0) {
                    setTimeout(function(){
                        //console.log("clearValidate")
                        form.clearValidate()
                    },delay)
                }
                else {
                    form.clearValidate()
                }
            }
        },
        validate() {
            let self = this
            return new Promise((resolve,reject)=>{
                self.$refs["order-form"].validate(function(valid) {
                    if(valid) {
                        resolve()
                    }
                })
            })
            
        }
    }
}