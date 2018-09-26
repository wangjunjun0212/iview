<template>
    <div>
        <Content :style="{margin: '0 0 10px'}">
          <Card :style="{padding: '20px 0 0'}">
              <div style="min-height: 60px;">
                  <Form ref="form" :label-width="100">
                      <Row>
                          <Col span="6">
                              <FormItem label="广告名称">
                                  <Input  placeholder="请输入广告名称"></Input>
                              </FormItem>
                          </Col>
                          <Col span="6">
                              <FormItem label="客户手机号">
                                  <Input  placeholder="请输入客户手机号"></Input>
                              </FormItem>
                          </Col>
                          <Col span="12">
                              <FormItem label="提交审核日期">
                                <Row>
                                    <Col span="6">
                                        <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择开始时间"></DatePicker>
                                    </Col>
                                    <Col span="1" style="text-align: center">--</Col>
                                    <Col span="6">
                                        <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择结束时间"></DatePicker>
                                    </Col>
                                </Row>
                            </FormItem>
                          </Col>
                      </Row>
                      <Row>
                          <Col span="6">
                              <FormItem label="审核状态">
                                  <Select  clearable >
                                      <Option value="1">全部</Option>
                                      <Option value="1">投放中</Option>
                                      <Option value="1">已投放</Option>
                                      <Option value="1">续费中</Option>
                                  </Select>
                              </FormItem>
                          </Col>
                          <Col span="3" style="margin-left:30px">
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
            :listdata="data1"
            :columns="columns"
            :showDownLoad=false
            :showAddAds=false
            :listTitle1="listTitle1"
            :listTitle2="listTitle2"
            @on-start="showModal"
            @on-change-page="onChangePage"
          ></ads-list>
        </div>
        <Modal v-model="modalVisible" >
            <div class="model">
                <div class="formTitle">确定审核通过吗？</div>
            </div>
            <div slot="footer">
                <Button icon="android-close" shape="circle" size="large" @click="onModalClose" style="color:#666">取消</Button>
                <Button type="primary" icon="android-create" shape="circle" size="large" @click="onModalAdd">确定</Button>
            </div>
        </Modal>
    </div>
</template>
<style scoped>
    .formTitle {
        margin:10px auto;
        font-size:20px;
        text-align: center
    }
    .add-form .ivu-input-wrapper{
        width:260px;
    }
    .form-opt {
        color:red;
        font-size:12px;
    }
</style>

<script>
import AdsList from '@/components/ads-list'
export default {
  name: 'Private',
  components: {
    AdsList
  },
  methods: {
    showModal () {
      this.modalVisible = true
    },
    onSearch () {

    },
    onModalClose () {
      alert('取消')
    },
    onModalAdd () {
      alert('确定')
    },
    onChangePage (page) {
      console.log(page)
    }
  },
  data () {
    return {
      modalVisible: false,
      listTitle1: '审核通过',
      listTitle2: '审核失败',
      items: {
        name: '',
        single: false
      },
      statu: 1,
      total: 0,
      currentPage: 1,
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '广告名称',
          key: 'name'
        },
        {
          title: '客户手机号',
          key: 'age'
        },
        {
          title: '提交制作日期',
          key: 'address'
        },
        {
          title: '素材',
          key: 'sum'
        },
        {
          title: '制作状态',
          key: 'methods'
        },
        {
          title: '完成日期',
          key: 'date'
        },
        {
          title: '修改次数',
          key: 'date'
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
