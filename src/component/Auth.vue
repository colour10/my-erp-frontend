<script>
    export default {
        name: 'auth',
        render(h) {
            let self = this;
            if (self.isAllowed()) {
                return self.$slots.default;
            } else {
                return null;
            }
        },
        props: {
            auth: String,
            behavier: {
                type: String,
                default: 'any',
            }
        },
        methods: {
            isAllowed() {
                const self = this;
                let auths = self.auth.split(',');
                // 暂时注释
                // console.log(self.auth, auths)
                for (let auth of auths) {
                    if (self.behavier == 'any') {
                        if (self._isAllowed(auth)) {
                            return true;
                        }
                    } else {
                        if (!self._isAllowed(auth)) {
                            return false;
                        }
                    }
                }

                return self.behavier == 'all';
            },
        },
    };
</script>
