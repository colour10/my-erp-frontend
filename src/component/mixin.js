import {_label,extend,config} from './globals.js'
import {httpPost,httpGet, host} from './http.js'
import {isArray, initObject} from './array.js'
import chain from "./chain.js"
import { Rules } from './rules.js'
import { DataSource } from "./DataSource.js"

const _private = function(self){
    const _this = {
        showErorMessage(object) {
            const h = self.$createElement;
            let list = []
            chain(object).forEach(errors=>{

                errors.forEach(row=>{
                    self._log(row,"formRules")
                    let name = row.label || self.formRules[row.field].label
                    list.push(h("p", null, name + row.message))
                })
            })
            self.$msgbox({
                title: self._label("error_tip"),
                message: h('p', null, list),
                showCancelButton: false,
                confirmButtonText: self._label("button-ok")
            }).then(action =>{})
        },
        doUserCheck(usercheck, callback) {
            if(usercheck) {
                usercheck().then(()=>{
                    callback(true)
                }).catch(object=>{
                    callback(false, {x:[object]})
                })
            }
            else {
                callback(true)
            }
        }
    }

    return _this
}

export default {
    data:function(){
        return {
            formRules:{}
        }
    },
    methods: {
        _isAllowed(authname, behavier='any') {
            const self = this;

            let auths = authname.split(',');
            // console.log(authname, auths)
            for(let auth of auths) {
                if(behavier=='any') {
                    if(self.$store.getters.allow(auth)) {
                        return true;
                    }
                }
                else {
                    if(!self.$store.getters.allow(auth)) {
                        return false;
                    }
                }
            }

            return behavier=='all';
        },
        _buttonType(enable=true) {
            return enable===true?'primary':'info';
        },
        async showErrors(messages) {
            const self = this;
            const h = self.$createElement;
            let list = messages.map(message=> {
                return h("p", null, message);
            });

            await self.$msgbox({
                title: self._label("error_tip"),
                message: h('p', null, list),
                showCancelButton: false,
                confirmButtonText: self._label("button-ok"),
            });
        },
        _newbox() {
            return Object.create(null);
        },
        _left(string, length) {
            return (string || '').substr(0, length);
        },
        confirm() {
            //console.log(_label('querentijiao'));
            return confirm(this._label('querentijiao'));
        },
        initRules(callback){
            extend(this.formRules, callback(Rules))
        },
        _log() {
            let arr = Array.prototype.slice.call(arguments)
            arr.unshift("<" + this.$options.name + ">")
            console.log.apply(console, arr);
        },
        _label,
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

                            self.$alert(message, _label("error_tip"), {
                                confirmButtonText: _label("ok")
                            });

                            if(options.isReject) {
                                reject()
                            }
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

                        resolve(result)
                    }
                })
            })
        },
        async _submit(path, form, options) {
            const self = this;
            options = options || {};
            options.showMessage = true;
            options.isReject = true;

            const loading = self.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)',
            });

            return new Promise((resolve, reject)=>{
                self._fetch(path, form, options).then(result=>{
                    loading.close();
                    resolve(result);
                }).catch(()=>{
                    loading.close();
                    reject();
                });
            });
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
                self._log("remove Exception", e)
                return false
            }
        },
        _info(message) {
            let self = this;
            self.$notify({
                type: 'warning',
                title: self._label("tishi"),
                message: message,
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
        async validate(usercheck) {
            let self = this
            let func = _private(self)

            return new Promise((resolve,reject)=>{
                func.doUserCheck(usercheck, function(valid, object){
                    if(valid) {
                        self.$refs["order-form"].validate((valid, object)=>{
                            if(valid) {
                                resolve()
                            }
                            else {
                                self._log(object)
                                func.showErorMessage(object)
                            }
                        })
                    }
                    else {
                        func.showErorMessage(object)
                    }
                })
            })
        },
        _showErorMessage(object){
            return _private(this).showErorMessage({x:[object]})
        },
        _setting(name, value) {
            let self = this;
            if(isArray(name)) {
                extend(self.setting, initObject(name,value))
            }
            else if(typeof(name)=='object') {
                extend(self.setting, name)
            }
            else {
                self.setting[name] = value;
            }
            return self
        },
        _fileLink(file, size=40) {
            if(!file) {
                return host+'/imgs/none.png';
            }
            let arr = file.split('.')

            return _label('_image_url_prex') + file //+'_'+ size +'x' + size + '.' + arr[arr.length-1]
        },
        _setTitle(title) {
            let self = this;

            self.$store.commit("setTagLabel", {
                label: title,
                path: self.$route.path
            })
        },
        closeCurrent() {
            let store = this.$store
            store.commit("closeTag", {
                tag:store.getters.getTags.current
            })
        },

        _reload(){
            let self = this
            self._redirect(self.$route.path)
        },

        _redirect(path) {
            let self = this

            self.closeCurrent()
            setTimeout(function(){
                self.$router.push(path)
            }, 100)
        },

        _open(path) {
            this.$router.push(path)
        },

        _dataSource(name) {
            return DataSource.getDataSource(name, this._label('lang'))
        },
        _showDialog(name, option){
            let dialog = this.$refs[name]
            if(dialog) {
                dialog.show(option)
            }
        },
        _hideDialog(name){
            let dialog = this.$refs[name]
            if(dialog) {
                dialog.hide()
            }
        },
        _path(){
            return this.$route.path;
        },
    },
}