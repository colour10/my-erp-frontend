import { getFetcherPromise } from './fetcher.js';

export default {
    name: 'sp-fetch-text',
    props: {
        table: {},
        pid: {},
        column: {},
    },
    data() {
        return {
            text: '',
        };
    },
    methods: {
        async getText() {
            let self = this;

            let fetcher = getFetcherPromise(self.table);

            let row = await fetcher(self.pid);
            if(row) {
                self.text = row[self.column];
            }
            else {
                self.text = '';
            }
        },
    },
    render(h) {
        return h("span", this.text)
    },
    watch: {
        pid: function(newvalue) {
            this.getText();
        },
    },
    mounted: function() {
        this.getText();
    },
};