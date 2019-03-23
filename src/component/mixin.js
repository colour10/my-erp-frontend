import globals from './globals.js'

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
            $ASA.post(path, form, function(result) {
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
            }, "json")

        },
        _submit(path, form, options) {
            const self = this
            options = options || {}
            options.showMessage = true

            self._fetch(path, form, options)
        },
        _remove(path, options) {
            var self = this;
            self.$confirm(_label('delete_warning'), _label('tip'), {
                confirmButtonText: _label('ok'),
                cancelButtonText: _label('cancel'),
                type: 'warning'
            }).then(() => {
                $ASA.get(path, function(result) {
                    if (result.messages.length > 0) {
                        const h = self.$createElement;
                        var message = h("ul", null, result.messages.map(function(v) {
                            return h("li", null, v)
                        }))

                        self.$alert(message, _label("error_tip"), {
                            confirmButtonText: _label("ok")
                        });

                        if (options && typeof(options.onFail) == 'function') {
                            options.onFail()
                        }
                    } else {
                        self.$message({
                            message: _label('delete_success'),
                            type: 'success'
                        });

                        if (typeof(options) == 'function') {
                            options(result)
                        } else if (options && typeof(options.onSuccess) == 'function') {
                            options.onSuccess(result)
                        }
                    }
                }, "json")
            }).catch(() => {});
        },
        _info(message) {
            let self = this
            self.$notify({
                type: 'warning',
                title: self._label("tishi"),
                message: message
            });
        }
    }
}