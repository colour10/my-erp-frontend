import {httpPost,httpGet, host} from '../http.js'
import {label} from "../application.js"

export default {
    methods: {
        _fetch(path, form, options={}) {
            const self = this
            return new Promise((resolve,reject)=>{
                httpPost(path, form).then(function(result) {
                    //self._log(result)
                    if (result.messages.length > 0) {
                        //提示信息
                        if (options.showMessage == true) {
                            const h = self.$createElement;
                            var message = h("ul", null, result.messages.map(function(v) {
                                return h("li", null, v)
                            }))

                            self.$alert(message, label("error_tip"), {
                                confirmButtonText: label("ok")
                            });

                            if(options.isReject) {
                                reject()
                            }
                        }
                    } else {
                        if (options.showMessage == true) {
                            let tip = options && options.successTip ? options.successTip : 'success'
                            self.$message({
                                message: label(tip),
                                type: 'success'
                            });
                        }

                        if (result.is_add == "1") {
                            form.id = result.id;
                        }

                        resolve(result)
                    }
                })
            })            
        },
        _submit(path, form, options) {
            const self = this
            options = options || {}
            options.showMessage = true
            options.isReject = true

            return self._fetch(path, form, options)
        },
        _confirm(message) {
            return this.$confirm(message, label('tip'), {
                confirmButtonText: label('ok'),
                cancelButtonText: label('cancel'),
                type: 'warning'
            })
        },
        async _remove(path, form, options) {
            var self = this;
            
            try {
                await self.$confirm(label('delete_warning'), label('tip'), {
                    confirmButtonText: label('ok'),
                    cancelButtonText: label('cancel'),
                    type: 'warning'
                })

                let result = await httpPost(path, form);

                if (result.messages.length > 0) {
                    const h = self.$createElement;
                    var message = h("ul", null, result.messages.map(function(v) {
                        return h("li", null, v)
                    }))

                    self.$alert(message, label("error_tip"), {
                        confirmButtonText: label("ok")
                    });

                    return false;
                } 
                else {
                    self.$message({
                        message: label('delete_success'),
                        type: 'success'
                    });

                    return true;
                }
            }
            catch(e) {
                return false
            }
        }
    }
}