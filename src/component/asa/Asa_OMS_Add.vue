<template>
  <div>
    <el-form ref="order-form" class="formx2" :model="form" label-width="90px" :inline="true" style="width:100%;"
             size="mini" :rules="rules" :inline-message="false" :show-message="false">
      <!-- 按钮组 start -->
      <el-row :gutter="0">
        <!-- 上新 start -->
        <asa-button @click="submit">{{_label("shangxin")}}</asa-button>
        <!-- 上新 end -->

        <!-- 详情图 start -->
        <asa-button @click="showPicturePick">{{_label("xiangqingtu")}}</asa-button>
        <!-- 详情图 end -->
      </el-row>
      <!-- 按钮组 end -->

      <!-- 必填项目1 start -->
      <el-row :gutter="0">
        <el-col :span="16" style="width:750px">
          <!-- 商品名称 start -->
          <el-col :span="16">
            <el-form-item :label="_label('shangpinmingcheng')" class="twocol" prop="Name">
              <el-input v-model="form.Name"/>
            </el-form-item>
          </el-col>
          <!-- 商品名称 end -->

          <!-- 产地 start -->
          <el-col :span="8">
            <el-form-item :label="_label('chandi')" prop="CountryId">
              <simple-select v-model="form.CountryId" source="country" :isIgnoreZero="false"
                             :clearable="false"></simple-select>
            </el-form-item>
          </el-col>
          <!-- 产地 end -->

          <!-- 国际码 start -->
          <el-col :span="8">
            <el-form-item :label="_label('guojima')" prop="InternationalCode">
              <el-input v-model="form.InternationalCode"/>
            </el-form-item>
          </el-col>
          <!-- 国际码 end -->

          <!-- 年代 start -->
          <el-col :span="8">
            <el-form-item :label="_label('niandai')">
              <simple-select v-model="form.Times" source="ageseason" :isIgnoreZero="false"
                             :clearable="false"></simple-select>
            </el-form-item>
          </el-col>
          <!-- 年代 end -->

          <!-- 海关编码 start -->
          <el-col :span="8">
            <el-form-item :label="_label('haiguanbianma')">
              <el-input v-model="form.HsCode"/>
            </el-form-item>
          </el-col>
          <!-- 海关编码 end -->

          <!-- 品牌 start -->
          <el-col :span="8">
            <el-form-item :label="_label('pinpai')" prop="Manufacturer">
              <el-input v-model="form.Manufacturer"/>
            </el-form-item>
          </el-col>
          <!-- 品牌 end -->

          <!-- 报关通道 start，这个非必填 -->
          <el-col :span="8">
            <el-form-item :label="_label('baoguantongdao')">
              <el-input v-model="form.CustomsChannelId"/>
            </el-form-item>
          </el-col>
          <!-- 报关通道 end -->

          <!-- 材质 start -->
          <el-col :span="8">
            <el-form-item :label="_label('caizhi')" prop="Material">
              <el-input v-model="form.Material"/>
            </el-form-item>
          </el-col>
          <!-- 材质 end -->

          <!-- 贸易类型 start -->
          <el-col :span="8">
            <el-form-item :label="_label('maoyileixing')">
              <simple-select v-model="form.TradeType" source="tradetype" :isIgnoreZero="false"
                             :clearable="false"></simple-select>
            </el-form-item>
          </el-col>
          <!-- 贸易类型 end -->

          <!-- 增值税率 start -->
          <el-col :span="8">
            <el-form-item :label="_label('zengzhishuilv')">
              <el-input v-model="form.VATRate"/>
            </el-form-item>
          </el-col>
          <!-- 增值税率 end -->

          <!-- 消费税率 start -->
          <el-col :span="8">
            <el-form-item :label="_label('xiaofeishuilv')">
              <el-input v-model="form.ConsumptionTaxRate"/>
            </el-form-item>
          </el-col>
          <!-- 消费税率 end -->

        </el-col>

        <!-- 示意图 start -->
        <el-col :span="8" style="width:250px;padding-right:10px" align="right">
          <simple-avatar v-model="product.picture" :size="130" :disabled="true"></simple-avatar>
        </el-col>
        <!-- 示意图 end -->

      </el-row>
      <!-- 必填项目2 end -->

      <!-- 必填项目2 start -->
      <el-row :gutter="0">

        <el-col :span="24" style="width:1000px">
          <el-col :span="6">
            <!-- 是否启用 start -->
            <el-form-item :label="_label('shifouqiyong')">
              <simple-select v-model="form.Published" source="publishtype" :isIgnoreZero="false"
                             :clearable="false"></simple-select>
            </el-form-item>
            <!-- 是否启用 end -->
          </el-col>

          <!-- 计量单位 start -->
          <el-col :span="6">
            <el-form-item :label="_label('jiliangdanwei')" prop="UnitId">
              <simple-select v-model="form.UnitId" source="customsunit" :isIgnoreZero="false"
                             :clearable="false"></simple-select>
            </el-form-item>
          </el-col>
          <!-- 计量单位 end -->

          <!-- 包装类别 start -->
          <el-col :span="12">
            <el-form-item :label="_label('baozhuangleibie')" class="twocol" prop="WrapId">
              <simple-select v-model="form.WrapId" source="customswrap" :isIgnoreZero="false"
                             :clearable="false"></simple-select>
            </el-form-item>
          </el-col>
          <!-- 包装类别 end -->

          <!-- 商品简要 start -->
          <el-col :span="12">
            <el-form-item :label="_label('shangpinjianyao')" class="twocol">
              <el-input v-model="form.ShortDescription"/>
            </el-form-item>
          </el-col>
          <!-- 商品简要 end -->

          <!-- 生产单位 start, 非必填 -->
          <el-col :span="12">
            <el-form-item :label="_label('shengchandanwei')" class="twocol">
              <el-input v-model="form.ProductionCompany"/>
            </el-form-item>
          </el-col>
        </el-col>
        <!-- 生产单位 end -->


        <el-col :span="24" style="width:1000px">
          <!-- 以下 4个 价格至少传一个值 -->
          <!-- 香港供货价 start -->
          <el-col :span="6">
            <el-form-item :label="_label('xiangganggonghuojia')">
              <el-input v-model="form.HKGCost"/>
            </el-form-item>
          </el-col>
          <!-- 香港供货价 end -->

          <!-- 国内供货价 start -->
          <el-col :span="6">
            <el-form-item :label="_label('guoneigonghuojia')">
              <el-input v-model="form.CHNCost"/>
            </el-form-item>
          </el-col>
          <!-- 国内供货价 end -->

          <!-- 保税供货价 start -->
          <el-col :span="6">
            <el-form-item :label="_label('baoshuigonghuojia')">
              <el-input v-model="form.BDACost"/>
            </el-form-item>
          </el-col>
          <!-- 保税供货价 end -->

          <!-- 欧洲供货价 start -->
          <el-col :span="6">
            <el-form-item :label="_label('ouzhougonghuojia')">
              <el-input v-model="form.EURCost"/>
            </el-form-item>
          </el-col>
          <!-- 欧洲供货价 end -->
        </el-col>

      </el-row>
      <!-- 必填项目2 end -->
    </el-form>

    <!-- 主图列表 start -->
    <el-row :gutter="6">
      <el-col :span="12">
        <el-table :data="specItems" stripe border style="width:100%;">
          <el-table-column :label="_label('zhutu')" align="center" width="60">
            <template v-slot="{row}">
              <sp-product-icon :file="row.picture"></sp-product-icon>
            </template>
          </el-table-column>
          <el-table-column prop="number" :label="_label('sku')" align="center" width="300">
            <template v-slot="{row, $index}">
              {{row.product.wordcode+'|'+row.sizecontent.name}}
            </template>
          </el-table-column>
          <el-table-column prop="total" :label="_label('yanse')" width="100" align="center">
            <template v-slot="{row}">
              {{row.product.brandcolor_label}}
            </template>
          </el-table-column>
        </el-table>
      </el-col>

      <!-- 这段代码有问题，暂时注释 -->
      <el-col :span="12">
        <draggable v-model="detailImgs">
          <transition-group>
            <el-col :span="24" align="center" v-for="row in detailImgs" :key="row.id">
              <img :src="_fileLink(row.filename)" style="max-width:80px;max-height:80px;">
            </el-col>
          </transition-group>
        </draggable>
      </el-col>
    </el-row>
    <!-- 主图列表 end -->

    <!-- 详情图对话框 start -->
    <sp-dialog ref="pictures" :width="800">
      <el-row :gutter="10">
        <el-checkbox-group v-model="selected">
          <el-col :span="6" v-for="item in pictures" :key="item.id" style="margin-bottom: 20px;text-align:center;">
            <el-checkbox :label="item"><img :src="_fileLink(item.filename)" class="avatar" style="margin:auto;"/>
            </el-checkbox>
          </el-col>
        </el-checkbox-group>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24" align="center">
          <as-button type="primary" @click="onSelect">{{_label('queding')}}</as-button>
          <as-button type="primary" @click="_hideDialog('pictures')">{{_label("tuichu")}}</as-button>
        </el-col>
      </el-row>
    </sp-dialog>
    <!-- 详情图对话框 end -->
  </div>
</template>

<script>
    import API from '../api.js';
    import {ProductDetail} from '../model.js';
    import draggable from 'vuedraggable';

    export default {
        name: 'asa-oms-add',
        components: {
            draggable
        },
        props: {
            product: {
                type: Object,
                default: function () {
                    return {};
                },
            },
        },
        data() {
            let self = this;
            let product = self.product;

            return {
                form: {
                    // 商品名称
                    Name: '',
                    // 商品简要介绍
                    ShortDescription: '',
                    // 国际码
                    InternationalCode: '',
                    // 品牌名称
                    Manufacturer: '',
                    // 原产地国家（地区）海关代码（对应海关国家地区代码表）
                    CountryId: '',
                    // 报关通道id，如果选择多个报关通道，用半角逗号分隔，且必须开启属性组合
                    CustomsChannelId: '0',
                    // 包装类别海关代码（对应海关包装类别代码表）
                    WrapId: '43',
                    // 销售单位海关代码（对应海关单位代码表）
                    UnitId: '',
                    // 商品海关编码（对应海关HSCODE表）
                    HsCode: '',
                    // 贸易类型 1:保税备货 2：直邮 3：一般贸易
                    TradeType: '2',
                    // 增值税率，有跨境销售渠道的商品必传，参考最新海关税则
                    VATRate: '0.13',
                    // 消费税率，有跨境销售渠道的商品必传，参考最新海关税则
                    ConsumptionTaxRate: '0.05',
                    // 是否启用 1：启用 0：不启用，默认传0
                    Published: '0',
                    // 材质
                    Material: '',
                    // 生产企业名称
                    ProductionCompany: '',
                    // 香港直邮供货价
                    HKGCost: '',
                    // 欧洲直邮供货价
                    EURCost: '',
                    // 国内发货供货价
                    CHNCost: '',
                    // 保税发货供货价
                    BDACost: '',
                    // 年代季节
                    Times: '',
                },
                // 固定传的参数
                formoption: {
                    // 供应商Id，传OMS指定值
                    VendorId: 29,
                    // 仓库ID OMS调用档案上传接口无需传此字段
                    WarehouseId: 6,
                    // 库存数量，默认传0
                    StockQuantity: 0,
                    // 商品标签，以半角逗号分隔 OMS调用档案上传接口无需传此字段
                    ProductTags: '测试',
                    // 上传类别：1：手动，2：自动
                    UploadType: '1',
                    // 市场价
                    OldPrice: 0,
                    // 香港直邮标价
                    HKGPrice: '',
                    // 欧洲直邮标价
                    EURPrice: '',
                    // 国内发货标价
                    CHNPrice: '',
                    // 保税发货报价
                    BDAPrice: '',
                    // 规格编码，通常为：商品国际码+|+尺码，也可使用其他唯一代码，区分不同颜色尺码
                    Sku: '',
                },
                rules: {},
                detailImgs: [],
                specItems: [],
                pictures: [],
                selected: [],
                codes: {},
            };
        },
        methods: {
            /**
             * 上新逻辑
             *
             * @returns {Promise<void>}
             */
            async submit() {
                const self = this;
                const product = self.product;

                /*self.$refs['order-form'].validate(function(valid, object) {
                  console.log(valid, object)
                  if(valid===false) {
                    self._showErorMessage(object);
                  }
                });*/

                self.doValidate('order-form', self.rules, async function () {
                    const unitid = self.form.UnitId;
                    const wrapid = self.form.WrapId;
                    const countryid = self.form.CountryId;

                    const params = Object.assign({}, self.form, self.formoption);
                    params.Spu = product.product_group;

                    let brandgroupchild = await product.getBrandgroupchild();
                    params.CategoryId = brandgroupchild.row.omscategoryid;
                    params.SpecCount = self.specItems.length;

                    let date = new Date(product.maketime);
                    params.CreatedOnUtc = product.maketime;
                    params.CreatedTimeStamp = date.getTime() / 1000;
                    params.DefaultImg = self._fileLink(product.picture);
                    params.CountryId = await self._getNameById('country', countryid, 'customsid');
                    params.CountryName = await self._getNameById('country', countryid, 'name_cn');
                    params.UnitId = await self._getNameById('customsunit', unitid, 'code');
                    params.UnitName = await self._getNameById('customsunit', unitid, 'name');
                    params.WrapId = await self._getNameById('customswrap', wrapid, 'code');
                    params.WrapName = await self._getNameById('customswrap', wrapid, 'name');
                    params.CiqCountry = await self._getNameById('country', countryid, 'ciqid');

                    params.DetailImgs = self.detailImgs.map((item, index) => {
                        return {
                            order: index + 1,
                            url: self._fileLink(item.filename),
                        };
                    });
                    params.DetailImgs = JSON.stringify(params.DetailImgs);

                    params.ProductImgs = self.specItems.map((item, index) => {
                        return {
                            order: index + 1,
                            url: self._fileLink(item.picture),
                        };
                    });
                    params.ProductImgs = JSON.stringify(params.ProductImgs);

                    params.SpecItems = [];
                    for (let item of self.specItems) {
                        let attrComb = [{k: '颜色', v: item.product.brandcolor_label}, {
                            k: '尺码',
                            v: item.sizecontent.name
                        }];
                        params.SpecItems.push({
                            Sku: item.product.wordcode + '|' + item.sizecontent.name,
                            Price: 0,
                            StockNum: 0,
                            HsCode: params.HsCode,
                            CountryId: params.CountryId,
                            CountryName: params.CountryName,
                            UnitId: params.UnitId,
                            UnitName: params.UnitName,
                            WrapId: params.WrapId,
                            WrapName: params.WrapName,
                            VATRate: params.VATRate,
                            ConsumptionTaxRate: params.ConsumptionTaxRate,
                            TradeType: params.TradeType,
                            Published: params.Published,
                            AttrComb: JSON.stringify(attrComb),
                            CiqCountry: params.CiqCountry,
                            InternationalCode: item.product.wordcode,
                            Gtin: self.codes[item.sizecontent.id],
                        });
                    }

                    // 测试参数正确与否
                    // console.log(JSON.stringify(params));

                    // 开始上新
                    try {
                        // Vue.prototype.$axios.post("http://www.erp.test/oms/update", Vue.prototype.$qs.stringify(params)).then(response => {
                        //     // 需要用到 data
                        //     let data = response.data
                        //     if (data.success === false) {
                        //         self.$message({
                        //             message: _label("success"),
                        //             type: 'success'
                        //         })
                        //         return true;
                        //     } else {
                        //         self.$message.error(data.data.ErrorMsg)
                        //         return false;
                        //     }
                        // }).catch(err => {
                        //     // 记录错误
                        //     self._log("err=", err)
                        //     self.$message.error(_label('operate_fail'));
                        //     return false;
                        // })

                        // 测试 params 的值
                        self._log("oms上新传递的参数为：", JSON.stringify(params))

                        // 逻辑
                        let result = await self._submit("/oms/update", {params: JSON.stringify(params)});
                        console.log(result);
                    } catch (e) {
                        console.log('===', e)
                    }
                });
            },
            async init() {
                const self = this;
                if (!self.product.sizecontents) {
                    return;
                }

                self.form.Material = await self.product.getMaterial();

                if (self.product.countries) {
                    self.form.CountryId = self.product.countries.replace(/,.+$/, '');
                }
                self.form.Name = self.product.getName();
                self.form.ShortDescription = self.form.Name;
                self.form.InternationalCode = self.product.wordcode;
                self.form.Manufacturer = self.product.brand_label;
                self.form.Spu = self.product.product_group;

                if (self.product.ageseason) {
                    self.form.Times = self.product.ageseason.replace(/,.+$/, '');
                }

                self.specItems = [];
                for (let color of self.product.colors) {
                    //console.log(color)
                    let product = await ProductDetail.load({data: color.id, depth: 1});
                    for (let sizecontent of self.product.sizecontents) {
                        console.log(product.wordcode, color, sizecontent);

                        self.specItems.push({
                            picture: product.picture,
                            product,
                            sizecontent,
                            color,
                        });
                    }
                }

                //获得价格信息
                let {data} = await self._fetch('/product/getomsprices', {productid: self.product.id});
                console.log(data)
                self.form.HKGCost = data['hkgcost'];
                self.form.EURCost = data['eurcost'];
                self.form.CHNCost = data['chncost'];
                self.form.BDACost = data['bdacost'];

                //加载商品条码
                let codes = await API.getProductCodeList(self.product.id);
                console.log(codes)
                self.codes = {};
                for (let item of codes) {
                    self.codes[item.sizecontentid] = item.goods_code;
                }
            },

            async showPicturePick() {
                const self = this;

                const ids = self.product.colors.map(item => item.id);
                let {data} = await self._fetch('/picture/ofproducts', {productids: ids.join(',')});

                self.pictures = [];
                self.pictures.push(...data);


                self._showDialog('pictures');
            },

            onSelect() {
                const self = this;
                for (let item of self.selected) {
                    console.log(item);

                    let target = self.detailImgs.find(row => row.id == item.id);
                    if (!target) {
                        self.detailImgs.push(item);
                    }
                }
                self.selected = [];

                self._hideDialog('pictures');
            },

        },
        watch: {
            product() {
                this.init();
            },
        },
        async mounted() {
            const self = this;
            self.init();
            const _label = self._label;

            self.setRules(Rules => {
                self.rules['UnitId'] = Rules.required({message: _label("8000"), label: _label("jiliangdanwei")});
                self.rules['CountryId'] = Rules.required({message: _label("8000"), label: _label("chandi")});
                self.rules['Name'] = Rules.required({message: _label("8000"), label: _label("shangpinmingcheng")});
                self.rules['InternationalCode'] = Rules.required({message: _label("8000"), label: _label("guojima")});
                self.rules['Manufacturer'] = Rules.required({message: _label("8000"), label: _label("pinpai")});
                self.rules['Material'] = Rules.required({message: _label("8000"), label: _label("caizhi")});
            });
        },
    };
</script>
