<template>
    <div>
        <Content :style="{margin: '0 0 10px'}">
          <Card :style="{padding: '20px 0 0'}">
              <div style="min-height: 60px;">
                  <Form ref="form" :label-width="80">
                      <Row>
                          <Col span="6">
                              <FormItem label="商户名称">
                                  <Input  placeholder="请输入商户名称"></Input>
                              </FormItem>
                          </Col>
                          <Col span="6">
                              <FormItem label="商户手机号">
                                  <Input  placeholder="请输入商户手机号"></Input>
                              </FormItem>
                          </Col>
                          <Col span="3" style="margin-left:50px">
                              <Button type="primary" icon="ios-search"  size="large" @click.native="search">查询</Button>
                          </Col>
                      </Row>
                  </Form>
              </div>
          </Card>
        </Content>
        <div>
          <ads-list
            :total="total"
            :listTitle1="listTitle1"
            :listTitle2="listTitle2"
            :listdata="data1"
            :exportLoading="exportLoading"
            :tableData="tableData"
            :columns="columns"
            :showStartHandle=false
            :showEndHandle=false
            :showAddAds=false
            @on-start="onAds"
            @on-download="downLoad"
            @on-change-page="onChangePage"
          ></ads-list>
        </div>
    </div>
</template>
<script>
import AdsList from '@/components/ads-list'
import excel from '@/libs/excel'
export default {
  name: 'Query',
  components: {
    AdsList
  },
  methods: {
    onAds (id) {
      console.log(id)
    },
    onSearch () {

    },
    downLoad (lists) {
      let titleLists = this.columns.slice(1)
      let titles = []
      let keys = []
      titleLists.forEach(item => {
        titles.push(item.title)
        keys.push(item.key)
      })
      this.tableData = lists
      if (lists.length > 0) {
        this.exportLoading = true
        const params = {
          title: titles,
          key: keys,
          data: lists,
          autoWidth: true,
          filename: '广告投放列表'
        }
        excel.export_array_to_excel(params)
        this.exportLoading = false
      } else {
        this.$Message.info('最少选择一条数据')
      }
    },
    onChangePage (page) {
      console.log(page)
    }
  },
  data () {
    return {
      downLoadTitle: '下载',
      total: 0,
      currentPage: 1,
      exportLoading: false,
      tableData: [],
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '编号',
          key: 'id',
          width: 60,
          align: 'center'
        },
        {
          title: '广告名称',
          key: 'name'
        },
        {
          title: '商户名称',
          key: 'age'
        },
        {
          title: '手机号',
          key: 'address'
        },
        {
          title: '投放省份',
          key: 'sum'
        },
        {
          title: '投放地市',
          key: 'methods'
        },
        {
          title: '投放区县',
          key: 'date'
        },
        {
          title: '投放社区',
          key: 'date'
        },
        {
          title: '投放时间',
          key: 'date'
        },
        {
          title: '投放数量',
          key: 'date'
        },
        {
          title: '制作模式',
          key: 'fee'
        },
        {
          title: '当前状态',
          key: 'status'
        },
        {
          title: '续费时间',
          key: 'total'
        }
      ],
      data1: [
        {
          id: 0,
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park 123123456',
          date: '2016-10-03'
        },
        {
          id: 1,
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        }
      ]
    }
  }
}
</script>
