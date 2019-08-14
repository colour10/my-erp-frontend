
<script>
export default {
    name: 'auth',
    render(h) {
        let self = this;
        if (self.$store.getters.allow(self.auth)) {
            return self.$slots.default;
        } else {
            return null;
        }
    },
    props: {
        auth: String,
    },
};
</script>
