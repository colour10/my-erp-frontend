<template>
  <div>
    <el-form ref="order-form" class="formx2" :model="form" label-width="80px" :inline="true" style="width:100%;" size="mini" :rules="rules" :inline-message="false" :show-message="false">
      <el-row :gutter="0">
        <asa-button @click="submit">{{_label("shangxin")}}</asa-button>
        <asa-button @click="showPicturePick">{{_label("xiangqingtu")}}</asa-button>
      </el-row>
      <el-row :gutter="0">
        <el-col :span="16" style="width:750px">
          <el-col :span="16">
            <el-form-item :label="_label('shangpinmingcheng')" class="twocol" prop="Name">
              <el-input v-model="form.Name" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="_label('chandi')" prop="CountryId">
              <simple-select v-model="form.CountryId" source="country" :isIgnoreZero="false" :clearable="false"></simple-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="_label('guojima')" prop="InternationalCode">
              <el-input v-model="form.InternationalCode" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="_label('niandai')">
              <simple-select v-model="form.Times" source="ageseason" :isIgnoreZero="false" :clearable="false"></simple-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="_label('haiguanbianma')">
              <el-input v-model="form.HsCode" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="_label('pinpai')" prop="Manufacturer">
              <el-input v-model="form.Manufacturer" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="_label('baoguantongdao')">
              <el-input v-model="form.CustomsChannelId" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="_label('caizhi')" prop="Material">
              <el-input v-model="form.Material" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="_label('maoyileixing')">
              <simple-select v-model="form.TradeType" source="tradetype" :isIgnoreZero="false" :clearable="false"></simple-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item :label="_label('zengzhishuilv')">
              <el-input v-model="form.VATRate" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="_label('xiaofeishuilv')">
              <el-input v-model="form.ConsumptionTaxRate" />
            </el-form-item>
          </el-col>

        </el-col>
        <el-col :span="8" style="width:250px;padding-right:10px" align="right">
          <simple-avatar v-model="product.picture" :size="130" :disabled="true"></simple-avatar>
        </el-col>
      </el-row>
      <el-row :gutter="0">
        <el-col :span="24" style="width:1000px">
          <el-col :span="6">
            <el-form-item :label="_label('shifouqiyong')">
              <simple-select v-model="form.Published" source="publishtype" :isIgnoreZero="false" :clearable="false"></simple-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="_label('jiliangdanwei')" prop="UnitId">
              <simple-select v-model="form.UnitId" source="customsunit" :isIgnoreZero="false" :clearable="false"></simple-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="_label('baozhuangleibie')" class="twocol" prop="WrapId">
              <simple-select v-model="form.WrapId" source="customswrap" :isIgnoreZero="false" :clearable="false"></simple-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="_label('shangpinjianyao')" class="twocol">
              <el-input v-model="form.ShortDescription" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="_label('shengchandanwei')" class="twocol">
              <el-input v-model="form.ProductionCompany" />
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24" style="width:1000px">
          <el-col :span="6">
            <el-form-item :label="_label('xiangganggonghuojia')">
              <el-input v-model="form.HKGCost" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="_label('guoneigonghuojia')">
              <el-input v-model="form.CHNCost" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="_label('baoshuigonghuojia')">
              <el-input v-model="form.BDACost" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="_label('ouzhougonghuojia')">
              <el-input v-model="form.EURCost" />
            </el-form-item>
          </el-col>
        </el-col>
      </el-row>
    </el-form>
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
    <sp-dialog ref="pictures" :width="800">
      <el-row :gutter="10">
        <el-checkbox-group v-model="selected">
          <el-col :span="6" v-for="item in pictures" :key="item.id" style="margin-bottom: 20px;text-align:center;">
            <el-checkbox :label="item"><img :src="_fileLink(item.filename)" class="avatar" style="margin:auto;" /></el-checkbox>
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
  </div>
</template>

<script>
import API from '../api.js';
import { ProductDetail } from '../model.js';
import draggable from 'vuedraggable'

export default {
  name: 'asa-oms-add',
  components: {
    draggable
  },
  props: {
    product: {
      type: Object,
      default: function() {
        return {};
      },
    },
  },
  data() {
    let self = this;
    let product = self.product;

    return {
      form: {
        Name: '',
        ShortDescription: '',
        InternationalCode: '',
        Manufacturer: '',
        CountryId: '',
        CustomsChannelId: '0',
        WrapId: '43',
        UnitId: '',
        HsCode: '',
        TradeType: '2',
        VATRate: '0.13',
        ConsumptionTaxRate: '0.05',
        Published: '0',
        Material: '',
        ProductionCompany: '',
        HKGCost: '',
        EURCost: '',
        CHNCost: '',
        BDACost: '',
        Times: '',
      },
      // 固定传的参数
      formoption: {
        VendorId: 29,
        WarehouseId: 6,
        StockQuantity: 0,
        ProductTags: '测试',
        UploadType: 2,
        OldPrice: 0,
        HKGPrice: '',
        EURPrice: '',
        CHNPrice: '',
        BDAPrice: '',
        Sku: '',
        UploadType: '1',
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
    async submit() {
      const self = this;
      const product = self.product;

      /*self.$refs['order-form'].validate(function(valid, object) {
        console.log(valid, object)
        if(valid===false) {
          self._showErorMessage(object);
        }
      });*/

      self.doValidate('order-form', self.rules, async function() {
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
        params.CreatedTimeStamp = date.getTime()/1000;
        params.DefaultImg = self._fileLink(product.picture);
        params.CountryId = await self._getNameById('country', countryid, 'customsid');
        params.CountryName = await self._getNameById('country', countryid, 'name_cn');
        params.UnitId = await self._getNameById('customsunit', unitid, 'code');
        params.UnitName = await self._getNameById('customsunit', unitid, 'name');
        params.WrapId = await self._getNameById('customswrap', wrapid, 'code');
        params.WrapName = await self._getNameById('customswrap', wrapid, 'name');
        params.CiqCountry = await self._getNameById('country', countryid, 'ciqid');

        params.DetailImgs = self.detailImgs.map((item,index)=>{
          return {
            order: index+1,
            url: self._fileLink(item.filename),
          };
        });
        params.DetailImgs = JSON.stringify(params.DetailImgs);

        params.ProductImgs = self.specItems.map((item,index)=>{
          return {
            order: index+1,
            url: self._fileLink(item.picture),
          };
        });
        params.ProductImgs = JSON.stringify(params.ProductImgs);

        params.SpecItems = [];
        for(let item of self.specItems) {
          let attrComb = [{k: '颜色', v: item.product.brandcolor_label}, {k: '尺码', v: item.sizecontent.name}];
          params.SpecItems.push({
            Sku: item.product.wordcode+'|'+item.sizecontent.name,
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

        console.log(JSON.stringify(params));

        try {
          let result = await self._submit("/oms/update", { params: JSON.stringify(params) });
          console.log(result);
        }
        catch(e) {
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
        let product = await ProductDetail.load({ data: color.id, depth:1 });
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
      for(let item of codes) {
        self.codes[item.sizecontentid] = item.goods_code;
      }
    },

    async showPicturePick() {
      const self = this;

      const ids = self.product.colors.map(item => item.id);
      let { data } = await self._fetch('/picture/ofproducts', { productids: ids.join(',') });

      self.pictures = [];
      self.pictures.push(...data);


      self._showDialog('pictures');
    },

    onSelect() {
      const self = this;
      for(let item of self.selected) {
        console.log(item);

        let target = self.detailImgs.find(row=>row.id==item.id);
        if(!target) {
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

    self.setRules(Rules=>{
      self.rules['UnitId'] = Rules.required({ message: _label("8000"), label: _label("jiliangdanwei") });
      self.rules['CountryId'] = Rules.required({ message: _label("8000"), label: _label("chandi") });
      self.rules['Name'] = Rules.required({ message: _label("8000"), label: _label("shangpinmingcheng") });
      self.rules['InternationalCode'] = Rules.required({ message: _label("8000"), label: _label("guojima") });
      self.rules['Manufacturer'] = Rules.required({ message: _label("8000"), label: _label("pinpai") });
      self.rules['Material'] = Rules.required({ message: _label("8000"), label: _label("caizhi") });
    });
  },
};
</script>
