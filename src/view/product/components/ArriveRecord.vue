<template>
  <div>
    <el-table :data="data" border>

      <el-table-column :label="_label('rukushijian')" align="center" sortable>
      </el-table-column>

      <el-table-column :label="_label('rukudanhao')" align="center" sortable>
      </el-table-column>

      <el-table-column :label="_label('nianfenjijie')" align="center" sortable>
      </el-table-column>

      <el-table-column :label="_label('daohuocangku')" align="center" sortable>
      </el-table-column>

      <el-table-column :label="_label('chima')" align="center" sortable>
      </el-table-column>

      <el-table-column :label="_label('shuliang')" align="center" sortable>
      </el-table-column>

      <el-table-column :label="_label('bizhong')" align="center" sortable>
      </el-table-column>

      <el-table-column :label="_label('chengjiaojia')" align="center" sortable>
      </el-table-column>

      <el-table-column :label="_label('huilv')" align="center" sortable>
      </el-table-column>

      <el-table-column :label="_label('zuizhongbenweibi')" align="center" sortable>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
    export default {
        name: "ArriveRecord"
    }
</script>

<style scoped>

</style>
