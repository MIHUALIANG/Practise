<template>
  <div class="home">
    <el-container class="container">
      <div class="el-mains">
        <div class="mainstyle">
          <span class="title">Name: </span>
          <el-input
            v-model="inputname"
            style="width: 240px"
            placeholder="Please input your name"
          />
        </div>
        <div class="mainstyle">
          <span class="title">Age: </span>
          <el-input
            v-model="inputage"
            style="width: 240px"
            placeholder="Please input your age"
          />
        </div>
        <div class="mainstyle">
          <span class="title">School: </span>
          <el-select v-model="value" placeholder="Select" style="width: 240px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>

        <div class="mainstyle">
          <span class="title">Birthday: </span>
          <el-date-picker
            v-model="datevalue"
            type="datetime"
            placeholder="Select date and time"
            :shortcuts="shortcuts"
          />
        </div>
        <div class="mainstyle">
          <span class="title">Gender: </span>
          <el-radio-group v-model="gender">
            <el-radio value="1" size="larger">Male</el-radio>
            <el-radio value="2" size="larger">Female</el-radio>
          </el-radio-group>
        </div>
        <div class="mainstyle">
          <el-button
            class="button-submit"
            color="#626aef"
            :dark="isDark"
            @click="submitForm"
            >Submit to Table</el-button
          >
        </div>
      </div>
    </el-container>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';
import { ArrowRight } from '@element-plus/icons-vue';
import avatarImg from '../assets/zz.jpg';

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },

  setup() {
    const router = useRouter();
    const store = useStore();
    const isCollapse = ref(false); // 是否折叠
    const activeIndex = ref(''); // 当前激活菜单项
    const datevalue = ref('');
    const gender = ref('1');
    const inputname = ref('');
    const inputage = ref('');
    const value = ref('');

    const options = [
      {
        value: 'NJUPT',
        label: 'NJUPT'
      },
      {
        value: 'THU',
        label: 'THU'
      },
      {
        value: 'NKU',
        label: 'NKU'
      },
      {
        value: 'NJU',
        label: 'NJU'
      },
      {
        value: 'BIT',
        label: 'BIT'
      }
    ];

    const toggleCollapse = () => {
      isCollapse.value = !isCollapse.value;
    };

    const handleSelect = (index) => {
      router.push(index);
      activeIndex.value = index;
    };

    const handleOpen = (key, keyPath) => {
      console.log('open:', key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      console.log('close:', key, keyPath);
    };

    const shortcuts = [
      {
        text: 'Today',
        value: new Date()
      },
      {
        text: 'Yesterday',
        value: () => {
          const date = new Date();
          date.setDate(date.getDate() - 1);
          return date;
        }
      },
      {
        text: 'A week ago',
        value: () => {
          const date = new Date();
          date.setDate(date.getDate() - 7);
          return date;
        }
      }
    ];

    const submitForm = () => {
      // 验证必填字段
      if (!inputname.value || !inputage.value || !value.value) {
        ElMessage.warning('Please fill in all required fields');
        return;
      }

      // 格式化日期
      const formattedDate = datevalue.value
        ? `${datevalue.value.getFullYear()}-${String(
            datevalue.value.getMonth() + 1
          ).padStart(2, '0')}-${String(datevalue.value.getDate()).padStart(
            2,
            '0'
          )}`
        : '';

      // 创建新数据对象
      const newData = {
        name: inputname.value,
        age: inputage.value,
        school: value.value,
        birthday: formattedDate,
        gender: gender.value === '1' ? 'Male' : 'Female',
        date: formattedDate || new Date().toISOString().split('T')[0] // 如果没有选择日期，使用当前日期
      };

      // 添加到Vuex store
      store.dispatch('addTableData', newData);

      // 显示成功消息
      ElMessage.success('Data has been added to table successfully!');

      // 可选：清空表单
      inputname.value = '';
      inputage.value = '';
      value.value = '';
      datevalue.value = '';
    };

    return {
      handleClose,
      handleOpen,
      handleSelect,
      toggleCollapse,
      isCollapse,
      activeIndex,
      ArrowRight,
      avatarImg,
      shortcuts,
      datevalue,
      gender,
      inputname,
      inputage,
      value,
      options,
      submitForm
    };
  }
};
</script>
