<template>
  <Layout style="height: 100%" class="main">
    <Sider hide-trigger collapsible :width="256" :collapsed-width="64" v-model="collapsed" class="left-sider" :style="{overflow: 'hidden'}">
      <side-menu accordion ref="sideMenu" :active-name="$route.name" :collapsed="collapsed" @on-select="turnToPage" :menu-list="menuList">
        <!-- 需要放在菜单上面的内容，如Logo，写在side-menu标签内部，如下 -->
        <div class="logo-con">
          <!-- <h2>广告投放</h2> -->
          <!-- <img  :src="logo"/> -->
          <span v-if="!collapsed">广告投放管理</span>
        </div>
      </side-menu>
    </Sider>
    <Layout>
      <Header class="header-con">
        <header-bar :collapsed="collapsed" @on-coll-change="handleCollapsedChange">
          <user :user-avator="userAvator"/>
        </header-bar>
      </Header>
      <Content class="main-content-con">
        <Layout class="main-layout-con">
          <div class="tag-nav-wrapper">
            <tags-nav :value="$route" @input="handleClick" :list="tagNavList" @on-close="handleCloseTag"/>
          </div>
          <Content class="content-wrapper">
            <!-- 主要内容-->
            <keep-alive :include="cacheList">
              <router-view/>
            </keep-alive>
            <!-- 内容区底部备案信息-->
            <div class="zzld-footer">
              <div class="zzld-footer-copy">
                  2017-2017 &copy; AiiuA
              </div>
              <div class="zzld-footer-record">
                  <ul>
                      <li>宁ICP备17001712号</li>
                      <li>宁ICP备17001712号-1</li>
                  </ul>
              </div>
            </div>
          </Content>
        </Layout>
      </Content>
    </Layout>
  </Layout>
</template>
<style scoped>
  .logo-con {
    height:60px;
  }
  .logo-con img {
    width:52px;
    height:52px;
    float: left;
  }
  .logo-con span {
    color:#fff;
    line-height: 60px;
    font-weight: bold;
    margin-left:10px;
    font-size:22px;
  }
</style>

<script>
import SideMenu from './components/side-menu'
import HeaderBar from './components/header-bar'
import TagsNav from './components/tags-nav'
import User from './components/user'
import { mapMutations, mapActions } from 'vuex'
import { getNewTagList, getNextRoute, routeEqual } from '@/libs/util'
import logo from '@/assets/images/logo.gif'
import './main.less'
export default {
  name: 'Main',
  components: {
    SideMenu,
    HeaderBar,
    TagsNav,
    User
  },
  data () {
    return {
      collapsed: false,
      logo,
      isFullscreen: false
    }
  },
  computed: {
    tagNavList () {
      return this.$store.state.app.tagNavList
    },
    tagRouter () {
      return this.$store.state.app.tagRouter
    },
    userAvator () {
      return this.$store.state.user.avatorImgPath
    },
    cacheList () {
      return this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : []
    },
    menuList () {
      return this.$store.getters.menuList
    }
  },
  methods: {
    ...mapMutations([
      'setBreadCrumb',
      'setTagNavList',
      'addTag'
    ]),
    ...mapActions([
      'handleLogin'
    ]),
    turnToPage (route) {
      let { name, params, query } = {}
      if (typeof route === 'string') name = route
      else {
        name = route.name
        params = route.params
        query = route.query
      }
      if (name.indexOf('isTurnByHref_') > -1) {
        window.open(name.split('_')[1])
        return
      }
      this.$router.push({
        name,
        params,
        query
      })
    },
    handleCollapsedChange (state) {
      this.collapsed = state
    },
    handleCloseTag (res, type, route) {
      let openName = ''
      if (type === 'all') {
        this.turnToPage('home')
        openName = 'home'
      } else if (routeEqual(this.$route, route)) {
        if (type === 'others') {
          openName = route.name
        } else {
          const nextRoute = getNextRoute(this.tagNavList, route)
          this.$router.push(nextRoute)
          openName = nextRoute.name
        }
      }
      this.setTagNavList(res)
      this.$refs.sideMenu.updateOpenName(openName)
    },
    handleClick (item) {
      this.turnToPage(item)
    }
  },
  watch: {
    '$route' (newRoute) {
      this.setBreadCrumb(newRoute.matched)
      this.setTagNavList(getNewTagList(this.tagNavList, newRoute))
    }
  },
  mounted () {
    /**
     * @description 初始化设置面包屑导航和标签导航
     */
    this.setTagNavList()
    this.addTag({
      route: this.$store.state.app.homeRoute
    })
    this.setBreadCrumb(this.$route.matched)
    // 设置初始语言
  }
}
</script>
