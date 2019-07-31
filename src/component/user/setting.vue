<template>
    <el-tabs type="border-card" activeName="setting">
        <el-tab-pane :label="_label('morenshezhi')" name="setting">
            <el-form class="order-form" :model="form" label-width="85px" :inline="true" style="width:700px;" size="small">
                <el-form-item :label="_label('xiaoshouduankou')">
                    <simple-select v-model="form.saleportid" source="usersaleport"></simple-select>
                </el-form-item>
                <el-form-item :label="_label('jiage')">
                    <simple-select v-model="form.priceid" source="userprice"></simple-select>
                </el-form-item>
                <el-form-item :label="_label('xiaoshoucangku')">
                    <simple-select v-model="form.warehouseid" source="userwarehouse"></simple-select>
                </el-form-item>
            </el-form>
            <as-button type="primary" @click="onSubmit">{{_label('baocun')}}</as-button>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
import API from '../api.js';

export default {
    name: 'sp-usersetting',
    data() {
        return {
            form: {
                saleportid: '',
                priceid: '',
                warehouseid: '',
            },
        };
    },
    methods: {
        onSubmit() {
            let self = this;
            self._submit("/user/setting", self.form).then(() => {});
        },
    },
    async mounted() {
        const self = this;
        self._setTitle(self._label('gerenshezhi'));

        let setting = await API.getSetting();
        self.form.saleportid = setting.saleportid;
        self.form.warehouseid = setting.warehouseid;
        self.form.priceid = setting.priceid;
    },
};
</script>
