<template>
    <simple-select v-model="value" source="colortemplate" :lang="_label('lang')" :disabled="disabled" :filter-method="onFilterColor" @change="onChange">
        <template v-slot="{row}">
            <div class="imgline">
                <img :src="_fileLink(row.row.picture)" class="icon"> <span>{{row.name}}</span> <span>{{row.row.name_en}}</span>
            </div>
        </template>
    </simple-select>
</template>

<script>
import DataSource from '../DataSource.js'
import globals, { _label } from '../globals.js'

export default {
    name:"colorselect",
    props: {
        mvalue: {
            required: true
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    model: {
        prop: 'mvalue',
        event: 'change'
    },
    data() {
        return {
            value: ""
        }
    },
    methods: {
        onFilterColor(keyword, row) {
            let k = keyword.toUpperCase()
            let name_en = row.row.name_en ||""
            return row.name.toUpperCase().indexOf(k)>=0 || name_en.toUpperCase().indexOf(k)>=0
        },
        onChange() {
            this.$emit("change", this.value)
        }
    },
    watch: {
        mvalue(newValue) {
            this.value = newValue
        }
    },
    mounted: function() {
        var self = this;
        self.value = self.mvalue
    }
}
</script>
