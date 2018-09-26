<template>
    <div>
        <Content :style="{margin: '0 0 10px'}">
          <Card :style="{padding: '20px 0 0'}">
              <div style="min-height: 60px;">
                  <Form ref="form" :label-width="100">
                      <Row>
                          <Col span="6">
                              <FormItem label="角色名称">
                                  <Input  placeholder="请输入角色名称"></Input>
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
            :listdata="data1"
            :tableData="tableData"
            :showAddAdsTitle="showAddAdsTitle"
            :columns="columns"
            :showEndHandle=false
            :showDownLoad=false
            :showStartHandle=false
            @on-add="add"
            @on-model-change="showModal"
            @on-change-page="onChangePage"
          ></ads-list>
        </div>
        <Modal v-model="modalVisible" >
            <div class="model">
                <div class="formTitle">提交作品</div>
                <Form ref="form" :model="items" :label-width="150" class="add-form">
                    <FormItem label="广告名称" prop="name">
                        <Input v-model="items.name" placeholder="请输入生产商"></Input>
                    </FormItem>
                    <FormItem label="客户手机号" prop="name">
                        <Input v-model="items.name"  placeholder="请输入生产商"></Input>
                    </FormItem>
                    <FormItem label="完成制作日期" prop="name">
                        <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择时间" style="width:260px"></DatePicker>
                    </FormItem>
                    <FormItem label="上传作品" prop="name">
                        <Upload action="//jsonplaceholder.typicode.com/posts/">
                            <Button icon="ios-cloud-upload-outline">点击上传</Button>
                        </Upload>
                    </FormItem>
                    <Checkbox v-model="items.single" class="form-opt">是否为公司原因导致修改</Checkbox>
                </Form>
            </div>
            <div slot="footer">
                <template v-if="funType === 'add'">
                    <Button icon="android-close" shape="circle" size="large" @click="onModalClose" style="color:#666">取消</Button>
                    <Button type="primary" icon="android-create" shape="circle" size="large" @click="onModalAdd" :loading="isLoading">确定</Button>
                </template>
                <template v-if="funType === 'edit'">
                    <Button icon="android-close" shape="circle" size="large" @click="onModalClose" style="color:#666">取消</Button>
                    <Button type="primary" icon="android-create" shape="circle" size="large" @click="onModalUpdate" :loading="isLoading">确定</Button>
                </template>
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
  beforeUpdate () {
    switch (this.funType) {
        case 'view':
            this.isModalDisabled = true
            break
        case 'add':
            this.isModalDisabled = false
            break
        case 'edit':
            this.isModalDisabled = false
            break
    }
  },
  methods: {
    add() {
        this.modalVisible = true
        this.funType = 'add'
    },
    onEdit(params) {
        this.modalVisible = true
        this.funType = 'edit'
        console.log(params)
    },
    onDelete (params) {
      console.log(params)
    },
    showModal () {
      this.modalVisible = true
    },
    onSearch () {

    },
    onModalClose () {
      alert('取消')
    },
    onModalAdd () {
      this.isLoading = true
      setTimeout(() => {
          this.isLoading = false
      }, 1000)
    },
    onModalUpdate () {
      this.isLoading = true
      setTimeout(() => {
          this.isLoading = false
      }, 1000)
      alert('更新')
    },
    onChangePage (page) {
      console.log(page)
    }
  },
  data () {
    return {
      modalVisible: false,
      showAddAdsTitle: '新增',
      tableData: [],
      isLoading: false,
      funType: '',
      items: {
        name: '',
        single: false
      },
      statu: 1,
      total: 0,
      currentPage: 1,
      columns: [
        {
          title: '编号',
          key: 'id'
        },
        {
          title: '角色名称',
          key: 'name'
        },
        {
          title: '创建时间',
          key: 'age'
        },
        {
          title: '拥有权限',
          key: 'address'
        },
        {
          title: '操作',
          key: 'action',
          width: 200,
          align: 'center',
          render: (h, params) => {
              return h('div', {
                  class: 'xcm-action'
              }, [
                  h('Button', {
                      props: {
                          type: 'primary',
                          size: 'small'
                      },
                      style: {
                          marginRight: '10px'
                      },
                      on: {
                          click: () => {
                              this.onEdit(params)
                          }
                      }
                  }, '修改'),
                  h('Button', {
                      props: {
                          size: 'small',
                          type: 'error'
                      },
                      on: {
                          click: () => {
                              this.onDelete(params)
                          }
                      }
                  }, '删除')
              ])
          }
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
