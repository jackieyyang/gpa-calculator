<script setup lang="ts">
import {onMounted, onUnmounted, ref, h, reactive, watchEffect} from "vue";
import {type PaginationProps} from "@arco-design/web-vue";
import {IconSearch} from "@arco-design/web-vue/es/icon";
import {i18n} from "@/locale";
import {downloadExcel, readExcel} from "@/hooks/excel";

const width = ref(0);
const height = ref(0);
const uploadRef = ref();
const files = ref([]);
const addFormVisible = ref(false);
const addForm = reactive({
  学年: '',
  课程名称: '',
  课程代码: '',
  是否学位课程: '',
  学分: 0,
  绩点: 0,
  成绩: 0
});
const columns: any = [{
  title: i18n.global.t('academicYear'),
  dataIndex: '学年',
  slotName: 'academicYear',
}, {
  title: i18n.global.t('courseName'),
  dataIndex: '课程名称',
  filterable: {
    filter: (value: any, record: any) => record.课程名称.includes(value),
    slotName: 'name-filter',
    icon: () => h(IconSearch)
  }
}, {
  title: i18n.global.t('courseCode'),
  dataIndex: '课程代码',
  slotName: 'courseCode',
}, {
  title: i18n.global.t('isDegreeCourse'),
  dataIndex: '是否学位课程',
  slotName: 'isDegreeCourse',
  filterable: {
    filters: [{
      text: i18n.global.t('yes'),
      value: '是',
    }, {
      text: i18n.global.t('no'),
      value: '否',
    }],
    filter: (value: any, record: any) => record.是否学位课程 == value
  }
}, {
  title: i18n.global.t('credit'),
  dataIndex: '学分',
  slotName: 'credit',
  sortable: {
    sortDirections: ['ascend', 'descend']
  }
}, {
  title: i18n.global.t('gpa'),
  dataIndex: '绩点',
  slotName: 'gpa',
  sortable: {
    sortDirections: ['ascend', 'descend']
  }
}, {
  title: i18n.global.t('score'),
  dataIndex: '成绩',
  slotName: 'score',
  sortable: {
    sortDirections: ['ascend', 'descend']
  }
}, {
  title: i18n.global.t('operation'),
  dataIndex: 'operation',
  slotName: 'operation',
}];
const columnsLg: any = [{
  title: i18n.global.t('courseName'),
  dataIndex: '课程名称',
  ellipsis: true,
  filterable: {
    filter: (value: any, record: any) => record.课程名称.includes(value),
    slotName: 'name-filter',
    icon: () => h(IconSearch)
  }
}, {
  title: i18n.global.t('credit'),
  dataIndex: '学分',
  slotName: 'credit',
  sortable: {
    sortDirections: ['ascend', 'descend']
  }
}, {
  title: i18n.global.t('gpa'),
  dataIndex: '绩点',
  slotName: 'gpa',
  sortable: {
    sortDirections: ['ascend', 'descend']
  }
}, {
  title: i18n.global.t('score'),
  dataIndex: '成绩',
  slotName: 'score',
  sortable: {
    sortDirections: ['ascend', 'descend']
  }
}, {
  title: i18n.global.t('operation'),
  dataIndex: 'operation',
  slotName: 'operation',
}];
const paginationProps: PaginationProps = {
  showTotal: true,
  showJumper: true,
  showPageSize: true
};
const data = reactive([] as any[]);
const dataBackup = reactive([] as any[]);
const summary = ref<any>({
  totalCredits: 0,
  averageGpa: 0,
  weightedGpa: 0,
  averageScore: 0,
  weightedScore: 0
});

onMounted(async () => {
  updateSize();
  window.addEventListener('resize', updateSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateSize);
});

const updateSize = () => {
  width.value = window.innerWidth;
  height.value = window.innerHeight - 112;
};

const onChange = (fileList: any) => {
  files.value = fileList;
};

const handleAddOK = () => {
  data.push({...addForm});
  addFormVisible.value = false;
  emptyAddForm();
}

const handleAddCancel = () => {
  addFormVisible.value = false;
  emptyAddForm();
};

const emptyAddForm = () => {
  addForm.学年 = '';
  addForm.课程名称 = '';
  addForm.课程代码 = '';
  addForm.是否学位课程 = '';
  addForm.学分 = 0;
  addForm.绩点 = 0;
  addForm.成绩 = 0;
};

const loadExcel = async (e: any) => {
  e.stopPropagation();
  const file: any = files.value[0];
  const newData: any[] = await readExcel(file.file) as any[];
  // 清空
  data.splice(0, data.length);
  dataBackup.splice(0, dataBackup.length);
  // 插入新数据
  data.push(...newData);
  dataBackup.push(...newData.map(item => ({...item})));
  files.value = [];
};

const recoverTable = () => {
  data.splice(0, data.length);
  data.push(...dataBackup.map(item => ({...item})));
};

const removeCourse = (record: any) => {
  const index = data.findIndex((item: any) => item === record);
  data.splice(index, 1);
};

const handleHighestScore = () => {
  // 课程名称完全一样的, 保留最高分
  const result = data.reduce((acc: any[], cur: any) => {
    const existingCourse = acc.find(item => item.课程名称 === cur.课程名称);
    if (existingCourse) {
      if (existingCourse.成绩 < cur.成绩) {
        // 如果当前元素的成绩更高，替换结果数组中的元素
        const index = acc.indexOf(existingCourse);
        acc[index] = cur;
      }
    } else {
      // 如果结果数组中不存在当前元素的课程名称，添加当前元素到结果数组
      acc.push(cur);
    }
    return acc;
  }, []);
  // 清空data数组，并将结果添加到data数组
  data.splice(0, data.length);
  data.push(...result);
};

watchEffect(() => {
  const totalCredits = data.reduce((acc: number, cur: any) => acc + cur.学分, 0);
  const averageGpa = data.reduce((acc: number, cur: any) => acc + cur.绩点, 0) / data.length;
  const weightedGpa = data.reduce((acc: number, cur: any) => acc + cur.学分 * cur.绩点, 0) / totalCredits;
  const averageScore = data.reduce((acc: number, cur: any) => acc + cur.成绩, 0) / data.length;
  const weightedScore = data.reduce((acc: number, cur: any) => acc + cur.学分 * cur.成绩, 0) / totalCredits;
  summary.value = {
    totalCredits: totalCredits.toFixed(2),
    averageGpa: averageGpa.toFixed(2),
    weightedGpa: weightedGpa.toFixed(2),
    averageScore: averageScore.toFixed(2),
    weightedScore: weightedScore.toFixed(2)
  };
});
</script>

<template>
  <div class="w-full h-full">
    <div class="mx-auto max-w-96 sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl box-border py-10 flex flex-col"
         :style="{ minHeight: height + 'px' }">

      <!-- 筛选栏 -->
      <div class="w-full mb-5 flex flex-col lg:flex-row justify-between">

        <!-- 左侧选择 -->
        <div class="flex flex-col mb-4 lg:mb-0">
          <div class="flex flex-row mb-4 gap-4">
            <a-button type="primary" shape="round" @click="addFormVisible=true">{{ $t('addNewCourse') }}</a-button>
            <a-button type="primary" shape="round" @click="recoverTable">{{ $t('recoverTable') }}</a-button>
            <a-button shape="round" @click="downloadExcel">{{
                $t('downloadTranscriptTemplate')
              }}
            </a-button>
          </div>
          <div class="flex flex-row gap-4">
            <a-button type="primary" shape="round" @click="handleHighestScore">{{ $t('highestScore') }}</a-button>
            <a-button type="primary" shape="round">{{ $t('wholeProcessScore') }}</a-button>
            <a-upload
                action="/"
                :auto-upload="false"
                ref="uploadRef"
                @change="onChange"
                multiple
            >
              <template #upload-button>
                <a-space>
                  <a-button shape="round">{{ $t('uploadTranscript') }}</a-button>
                  <a-button shape="round" v-if="files.length>0" @click="loadExcel">{{
                      $t('confirmUpload')
                    }}
                  </a-button>
                </a-space>
              </template>
            </a-upload>
          </div>
        </div>

        <!-- 成绩显示 -->
        <div class="flex flex-col">
          <div class="flex flex-row gap-4 justify-start lg:justify-end">
            <a-typography-text>{{ $t('averageGpa') }}: {{ summary.averageGpa }}</a-typography-text>
            <a-typography-text>{{ $t('averageScore') }}: {{ summary.averageScore }}</a-typography-text>
          </div>
          <div class="flex flex-row gap-4 justify-start lg:justify-end">
            <a-typography-text>{{ $t('weightedGpa') }}: {{ summary.weightedGpa }}</a-typography-text>
            <a-typography-text>{{ $t('weightedScore') }}: {{ summary.weightedScore }}</a-typography-text>
          </div>
          <div class="flex flex-row justify-start lg:justify-end">
            <a-typography-text>{{ $t('totalCredits') }}: {{ summary.totalCredits }}</a-typography-text>
          </div>
        </div>

      </div>

      <!-- 表单 -->
      <div class="w-full">
        <a-table :columns="width>1024? columns: columnsLg" :data="data"
                 :pagination="width>1024?paginationProps: undefined">
          <template #name-filter="{ filterValue, setFilterValue, handleFilterConfirm, handleFilterReset}">
            <div class="custom-filter">
              <a-space direction="vertical">
                <a-input :model-value="filterValue[0]" @input="(value)=>setFilterValue([value])"/>
                <div class="custom-filter-footer">
                  <a-button @click="handleFilterConfirm">{{ $t('confirm') }}</a-button>
                  <a-button @click="handleFilterReset">{{ $t('reset') }}</a-button>
                </div>
              </a-space>
            </div>
          </template>
          <template #isDegreeCourse="{ record }">
            <div class="w-20">
              <a-select v-model="record.是否学位课程" :options="['是', '否']"/>
            </div>
          </template>
          <template #credit="{ record }">
            <div class="w-20">
              <a-input-number v-model="record.学分" :precision="2"/>
            </div>
          </template>
          <template #gpa="{ record }">
            <div class="w-20">
              <a-input-number v-model="record.绩点" :precision="2"/>
            </div>
          </template>
          <template #score="{ record }">
            <div class="w-24">
              <a-input-number v-model="record.成绩" :precision="2"/>
            </div>
          </template>
          <template #operation="{ record }">
            <a-space>
              <a-button type="text" status="danger" @click="removeCourse(record)">{{ $t('delete') }}</a-button>
            </a-space>
          </template>
        </a-table>
      </div>

      <!-- 新增弹窗 -->
      <a-modal v-model:visible="addFormVisible" :title="$t('addNewCourse')" @cancel="handleAddCancel" @ok="handleAddOK">
        <a-form :model="addForm">
          <a-form-item :label="$t('academicYear')">
            <a-input v-model="addForm.学年"/>
          </a-form-item>
          <a-form-item :label="$t('courseName')">
            <a-input v-model="addForm.课程名称"/>
          </a-form-item>
          <a-form-item :label="$t('courseCode')">
            <a-input v-model="addForm.课程代码"/>
          </a-form-item>
          <a-form-item :label="$t('isDegreeCourse')">
            <a-select v-model="addForm.是否学位课程" :options="['是', '否']"/>
          </a-form-item>
          <a-form-item :label="$t('credit')">
            <a-input-number v-model="addForm.学分" :precision="2"/>
          </a-form-item>
          <a-form-item :label="$t('gpa')">
            <a-input-number v-model="addForm.绩点" :precision="2"/>
          </a-form-item>
          <a-form-item :label="$t('score')">
            <a-input-number v-model="addForm.成绩" :precision="2"/>
          </a-form-item>
        </a-form>
      </a-modal>
    </div>
  </div>
</template>

<style scoped>
.custom-filter {
  padding: 20px;
  background: var(--color-bg-5);
  border: 1px solid var(--color-neutral-3);
  border-radius: var(--border-radius-medium);
  box-shadow: 0 2px 5px rgb(0 0 0 / 10%);
}

.custom-filter-footer {
  display: flex;
  justify-content: space-between;
}
</style>