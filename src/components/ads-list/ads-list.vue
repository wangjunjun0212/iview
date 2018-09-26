<template>
  <Card dis-hover style="min-height: 600px;">
      <div slot="title">
          <Row>
              <Col span="2" v-if="showStartHandle">
                <Button @click.native="startHandle">{{listTitle1}}</Button>
              </Col>
              <Col span="2" v-if="showEndHandle">
                <Button @click.native="endHandle">{{listTitle2}}</Button>
              </Col>
              <Col span="1" v-if="showDownLoad">
                <Button icon="md-download" :loading="exportLoading" @click.native="exportExcel">{{downLoadTitle}}</Button>
                <!-- <Button @click.native="downLoad">{{downLoadTitle}}</Button> -->
              </Col>
              <Col span="1" v-if="showAddAds">
                <Button @click.native="addAds">{{showAddAdsTitle}}</Button>
              </Col>
          </Row>
      </div>
      <Table height="420"
        :columns="columns"
        :row-class-name="rowClassName"
        :data="listdata"
        :excel-data="tableData"
        @on-select="onSelect"
        @on-select-all="onSelectAll"
        @on-select-cancel="onSelectCancel"
        @on-model-change="modelChange"
      ></Table>
      <Page
        :total="total"
        :current.sync="currentPage"
        :page-size="pageSize"
        show-total
        @on-change="onChangePage"
        class="page"
      />
  </Card>
</template>
<script>
export default {
  name: 'AdsList',
  props: {
    columns: {
      type: Array, required: true
    },
    listdata: {
      type: Array, required: true
    },
    tableData: {
      type: Array, required: true
    },
    listTitle1: {
      type: String, default: '信息列表'
    },
    listTitle2: {
      type: String, default: '信息列表'
    },
    downLoadTitle: {
      type: String, default: '下载'
    },
    exportLoading: {
      type: Boolean, default: true
    },
    showAddAdsTitle: {
      type: String, default: '完成制作'
    },
    showAddAds: {
      type: Boolean, default: true
    },
    showStartHandle: {
      type: Boolean, default: true
    },
    showEndHandle: {
      type: Boolean, default: true
    },
    showDownLoad: {
      type: Boolean, default: true
    },
    total: {
      type: Number, default: 0
    },
    currentPage: {
      type: Number, default: 1
    },
    pageSize: {
      type: Number, default: 10
    }
  },
  computed: {
    rules () {
      return {
        userName: this.userNameRules,
        password: this.passwordRules
      }
    }
  },
  watch: {
    listdata (val, old) {
      if (val !== old) {
        this.selects = []
      }
    }
  },
  methods: {
    rowClassName (row, index) {
      return 'zzld-tr'
    },
    onSelect (select, row) {
      this.selects = select
    },
    onSelectAll (select) {
      this.selects = select
    },
    onSelectCancel (select) {
      this.selects = select
    },
    onSelectionChange (select) {
      this.selects = select
    },
    addAds () {
      this.$emit('on-add')
    },
    modelChange () {
      this.$emit('on-model-change')
    },
    startHandle () {
      switch (this.selects.length) {
        case 0:
          this.$Message.info('最少选择一条数据')
          break
        case 1:
          this.$emit('on-start', this.selects[0].id)
          break
        default:
          this.$Message.info('最多选择一条数据')
          break
      }
    },
    onChangePage (page) {
      this.$emit('on-change-page', page)
    },
    exportExcel () {
      this.$emit('on-download', this.selects)
    }
  },
  data () {
    return {
      selects: []
    }
  }
}
</script>
