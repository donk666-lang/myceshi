<template>
  <div class="box">
    <div class="header" :style="!showMenu ? 'height:44px' : 'height:80px'">
      <div>
        <img src="../../assets/images/logo.png" class="logo" />
        <span class="headerText" v-show="showMenuList">
          塾専用コミュニケーション&業務管理システム
        </span>
      </div>
      <div class="nav" v-if="showMenu">
        <div>
          <menuTemplate :showMenuList="showMenuList" />
        </div>
        <div class="loginBtn">塾講師ログイン</div>
      </div>
      <div
        v-else
        :class="{ change: true, clicked: isClicked }"
        @click="handleClick"
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div :class="mainClass" v-if="!isClicked">
      <div class="mainTitle">
        <h1>その他の登録</h1>
      </div>
      <div class="oneList" :class="{ vertical: !showMenu }">
        <div class="oneListMain" :class="{ vertical: !showMenu }">
          <p>メールアドレス（共通アカウント）でログインする場合はこちら</p>
          <div class="oneListBottom">
            <el-button color="#fddc3e">共通アカウントログイン</el-button>
          </div>
        </div>
        <div class="oneListMain" :class="{ vertical: !showMenu }">
          <p>
            Comiruをすでに友達に追加済みの方
            以下のアイコンをクリックしてログイン
          </p>
          <div class="oneListBottom">
            <img src="../../assets/images/btn_base.png" class="btnBase" />
          </div>
        </div>
        <div
          class="oneListMain"
          :class="{ vertical: !showMenu }"
          style="border-right: none"
        >
          <p>メールアドレス（共通アカウント）でログインする場合はこちら</p>
          <div class="oneListBottom">
            <img src="../../assets/images/ja.png" class="ja" />
          </div>
        </div>
      </div>
      <div class="twoList">
        <div class="mainTitle">
          <h1>生徒・保護者ログイン（スクールポパー）</h1>
        </div>
        <p>
          生徒番号とパスワードを入力してログインしてください。生徒番号やパスワードパスワードがわからない場合は、教室にお問い合わせください。
        </p>
        <div class="form" :class="{ vertical: !showMenu }">
          <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="rules"
            label-width="120px"
            class="demo-ruleForm"
            :size="formSize"
            label-position="top"
            status-icon
          >
            <el-form-item>
              <el-radio-group v-model="ruleForm.resource">
                <el-radio :label="1" class="custom-radio">保護者</el-radio>
                <el-radio :label="2" class="custom-radio">生徒</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="生徒番号" prop="name">
              <el-input v-model="ruleForm.name" />
            </el-form-item>
            <el-form-item label="パスワード" prop="password">
              <el-input v-model="ruleForm.password" />
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="ruleForm.checked2"  class="custom-checkbox"
                >パスワードを表示</el-checkbox
              >
            </el-form-item>
            <el-form-item>
              <el-button color="#16bfb7" style="color: #ffffff;" @click="submitForm(ruleFormRef)" round
                >ログインする</el-button
              >
            </el-form-item>
            <div class="bottomLink">
              <li><a href="#">パスワードを忘れた方はこちら</a></li>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <div class="mainApp" v-else>
      <div class="container">
        <!-- 左侧主导航栏 -->
        <nav class="sidebar">
          <ul>
            <li
              v-for="(item, index) in mainNavItems"
              :key="index"
              :class="{ active: selectedMainIndex === index }"
              @click="selectMainItem(index)"
            >
            <div style="display: flex;justify-content: space-between;">
              <div>
              {{ item.name }}
            </div>
              <el-icon v-if="item.subItems.length > 0" class="icon">
                <ArrowRightBold />
              </el-icon>
            </div>
           
            </li>
          </ul>
        </nav>

        <!-- 右侧子导航栏 -->
        <nav class="sub-sidebar">
          <el-menu
            background-color="#f8f8f8"
            active-text-color="#16bfb7"
            :default-active="selectedSubIndex.toString()"
          >
            <template v-for="(subItem, subIndex) in subNavItems">
              <el-sub-menu
                v-if="subItem.subSubItems.length > 0"
                :key="'submenu-' + subIndex"
                :index="(subIndex + 1).toString()"
              >
                <template #title>
                  <span>{{ subItem.name }}</span>
                </template>
                <el-menu-item-group
                  v-for="(subSubItem, subSubIndex) in subItem.subSubItems"
                  :key="'submenu-item-' + subIndex + '-' + subSubIndex"
                >
                  <el-menu-item :index="`${subIndex + 1}-${subSubIndex + 1}`">{{
                    subSubItem
                  }}</el-menu-item>
                </el-menu-item-group>
              </el-sub-menu>
              <el-menu-item
                v-else
                :key="'menu-item-' + subIndex"
                :index="(subIndex + 1).toString()"
              >
                {{ subItem.name }}
              </el-menu-item>
            </template>
          </el-menu>
        </nav>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, onUnmounted, computed, reactive } from "vue";
import menuTemplate from "../../components/nav.vue";
// import type { FormInstance, FormRules } from "element-plus";
import { useRouter } from "vue-router";
import { ArrowRightBold } from "@element-plus/icons-vue";
const router = useRouter();
const rules = reactive({
  name: [
    {
      required: true,
      trigger: "blur",
      message: "生徒番号 を入力してください",
    },
  ],
  password: [
    {
      required: true,
      message: "パスワード を入力してください",
      trigger: "blur",
    },
  ],
});
const windowWidthThreshold = 1524;
const showMenuList = ref(true);
const showMenu = ref(true);
const isClicked = ref(false);
const handleClick = () => {
  isClicked.value = !isClicked.value;
};
const formSize = ref("default");
const ruleFormRef = ref();
const ruleForm = reactive({
  resource: 1,
  checked2: "",
  name: "",
  password: "",
});
// 主导航项数据
const mainNavItems = ref([
  {
    name: "サービス",
    subItems: [
      { name: "サービス一覧", subSubItems: [] },
      { name: "ComiruBASIC", subSubItems: [] },
      { name: "ComiruFREE", subSubItems: [] },
    ],
  },
  {
    name: "プラン一覧",
    subItems: [],
  },
  {
    name: "基本機能",
    subItems: [
      {
        name: "Comiru",
        subSubItems: [
          "専用アプリ＆LINE連携",
          "指導報告書",
          "お知らせ",
          "入退室管理",
          "請求書",
          "口座振替",
          "カード決済",
          "成績管理",
          "座席管理",
          "見込顧客獲得",
          "Web申込み",
          "口コミ収集＆掲載",
        ],
      },
      { name: "ComiruAir", subSubItems: ["オンライン授業支援"] },
      { name: "ComiruFREE", subSubItems: ["講師人事労務管理"] },
    ],
  },
  {
    name: "導入事例",
    subItems: [],
  },
  {
    name: "お役立ち資料",
    subItems: [],
  },
  {
    name: "セミナー一覧",
    subItems: [],
  },
]);

// 当前选中的主导航索引和子导航数据
const selectedMainIndex = ref(0);
const subNavItems = ref(mainNavItems.value[0].subItems);

// 当前选中的子导航索引
const selectedSubIndex = ref(0);

// 选择主导航项
const selectMainItem = (index: number) => {
  selectedMainIndex.value = index;
  subNavItems.value = mainNavItems.value[index].subItems; // 更新右侧导航内容
  selectedSubIndex.value = 0; // 重置子导航选项的选中状态
};

// 选择子导航项
const selectSubItem = (subIndex: number) => {
  selectedSubIndex.value = subIndex;
};
const handleResize = () => {
  if (window.innerWidth <= windowWidthThreshold) {
    showMenuList.value = false;
  } else {
    showMenuList.value = true;
  }
  if (window.innerWidth <= 1047) {
    showMenu.value = false;
  } else {
    showMenu.value = true;
    isClicked.value = false;
  }
};
const submitForm = async (formEl: any | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid: any, fields: any) => {
    if (valid) {
      router.push("/list");
    } else {
      console.log("error submit!", fields);
    }
  });
};
onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
  // 重新设置 showMenu 和 showMenuList 的值
  if (window.innerWidth <= 1047) {
    showMenu.value = false;
  } else {
    showMenu.value = true;
  }
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

const mainClass = computed(() => {
  return showMenu.value ? "main" : "main vertical";
});
</script>

<style lang="scss" scoped>
@import "../../assets/css/home.scss";
.container {
  display: flex;
  width: 100%;
  height: 100%;
}

.sidebar {
  width: 50%;
  background-color: #ffffff;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    padding: 17.5px;
    cursor: pointer;
    border-bottom: 1px solid #dcdcdc; // 添加下划线
  }
  li.active {
    background-color: #f8f8f8;
    color: black;
  }
  .icon {
    font-size: 14px;
  }
}
.sub-sidebar {
  width: 50%;
  background-color: #f8f8f8;
  ul {
    list-style: none;
    padding: 0;
  }

  li {
    padding: 10px;
    cursor: pointer;
  }

  li.active {
    background-color: #007bff;
    color: white;
  }
}
.el-menu-item,
.el-sub-menu__title {
  border-bottom: 1px solid #d0d0d5; /* 默认状态下透明的下划线 */
  height: 57px;
  &:hover {
    border-bottom: 1px solid #d0d0d5; /* 鼠标悬停时的下划线颜色 */
    background-color: #e6f7ff !important; /* 鼠标经过的背景颜色 */
  }
}
.sub-sidebar li {
  padding: 0;
}
.el-menu-item.is-active,
.el-sub-menu__title.is-active {
  border-bottom: 1px solid #d0d0d5; /* 选中项的下划线颜色 */
  background-color: #bae7ff !important; /* 选中项的背景颜色 */
  color: #1890ff !important; /* 选中项的文字颜色 */
}
:deep(.custom-checkbox .el-checkbox__label) {
  color: #16bfb7; /* 自定义文本颜色 */
}

:deep(.custom-checkbox .el-checkbox__input.is-checked .el-checkbox__inner) {
  background-color: #16bfb7; /* 自定义勾选框颜色 */
  border-color: #16bfb7;
}

.custom-checkbox .el-checkbox__inner:hover {
  border-color: #16bfb7; /* 鼠标悬停时的边框颜色 */
}
</style>
