import DataSource from '../DataSource.js'

export default function(self) {
    let _label = self._label

    let _this = {
        addSeries() {
            if (self.form.brandid > 0) {
                self.$prompt(_label("mingcheng"), _label("chuangjianxinxilie"), {
                    confirmButtonText: _label("button-ok"),
                    cancelButtonText: _label("quxiao")
                }).then(async ({value}) => {
                    self._log(value)

                    if(value.trim().length==0) {
                        return ;
                    }

                    let result = await self._fetch("/series/add", {product:self.form.id, name_en:value, brandid:self.form.brandid})
                    if(result.id>0) {
                        self._log(result)
                        DataSource.getDataSource("series", _label("lang")).clear()
                        self.$refs.series.load(self.form.brandid)
                        self.form.series = result.id
                    }
                }).catch(() => {
                });
            }
        }
    }


    return _this
}