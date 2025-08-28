<template>
  <div class="nav">
    <el-icon class="nav-icon"><Tickets /></el-icon>
    <span>//</span>

    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/about' }">
        Navigator
      </el-breadcrumb-item>
      <el-breadcrumb-item>About You</el-breadcrumb-item>
      <el-breadcrumb-item>Information</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div class="home">
    <el-container class="container">
      <div class="el-mains">
        <div class="mainstyle">
          <span class="title">Week:</span>
          <el-segmented
            v-model="weekvalue"
            :options="weekoptions"
            size="default"
          />
        </div>
        <div class="mainstyle">
          <span class="title">Name: </span>
          <el-input
            v-model="inputname"
            style="width: 240px"
            placeholder="Please input your name"
          />
        </div>
        <div class="mainstyle">
          <span class="title">Tel: </span>
          <el-input
            v-model="inputtel"
            style="width: 240px"
            placeholder="Please input your tel number"
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
          <el-select
            v-model="schoolvalue"
            placeholder="Select"
            style="width: 240px"
          >
            <el-option
              v-for="item in schooloptions"
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
import { ref } from 'vue';
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';
import { ArrowRight } from '@element-plus/icons-vue';
import axios from 'axios'; // ✅ 引入 axios

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },

  setup() {
    const store = useStore();
    const datevalue = ref('');
    const gender = ref('1');
    const inputname = ref('');
    const inputage = ref('');
    const inputtel = ref('');
    const schoolvalue = ref('');
    const weekvalue = ref('Mon');

    const weekoptions = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const schooloptions = [
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
      // 验证必填字段 例如!inputname.value || !inputage.value || !schoolvalue.value代表这几项必填
      if (!schoolvalue.value) {
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
        school: schoolvalue.value,
        week: weekvalue.value,
        birthday: formattedDate,
        gender: gender.value === '1' ? 'Male' : 'Female',
        date: formattedDate || new Date().toISOString().split('T')[0], // 如果没有选择日期，使用当前日期
        tel: inputtel.value
      };

      // 添加到Vuex store
      store.dispatch('addTableData', newData);

      //第二步：把数据发送到后端
      axios
        .post('http://localhost:3000/save', newData)
        .then(() => {
          // ElMessage.success('Data saved to backend successfully!');
        })
        .catch(() => {
          ElMessage.error('Failed to save data to backend');
        });

      // 显示成功消息
      // ElMessage.success('Data has been added to table successfully!');

      // 可选：清空表单
      inputname.value = '';
      inputage.value = '';
      inputtel.value = '';
      schoolvalue.value = '';
      datevalue.value = '';
      weekvalue.value = '';
      inputname.value = '';
    };

    return {
      ArrowRight,
      shortcuts,
      datevalue,
      gender,
      inputname,
      inputage,
      inputtel,
      schoolvalue,
      schooloptions,
      submitForm,
      weekvalue,
      weekoptions
    };
  }
};
</script>
