<!--
 * @Author: spOmwenda
 * @Date: 2023-06-12 15:01:53
 * @LastEditTime: 2023-06-12 19:41:02
 * @LastEditors: spOmwenda
 * @Description: desc
 * @FilePath: /practice/src/components/Editor/index.vue
-->

<template>
  <div class="dark">
      <el-card id="box-card">
        <div class="editor_wrap">
          <div id="group">
            <div class="notice mb-10">
              <el-alert :closable="false" type="warning" effect="dark" description="仅有限语言提供高亮、提示、报错等功能 暂不支持LSP，暂未提供运行环境." />
            </div>
          </div>
          <div class="main-editor">
            <el-row>
              <el-col :span="12">
                <div class="btn-group">
                  <el-row class="mb-10" :gutter="10">
                    <el-col :span="4">
                      <el-select v-model="language" placeholder="Select" @change="handleLanguage">
                        <el-option v-for="item in languageOptions" :key="item.value" :label="item.label"
                          :value="item.value" />
                      </el-select>
                    </el-col>
                    <el-col :span="4">
                      <el-button @click="handleDiff" type="primary" v-show="editOrDiff">
                        比对代码
                      </el-button>
                      <el-button @click="handleBack" type="primary" v-show="!editOrDiff">
                        返回
                      </el-button>
                    </el-col>
                  </el-row>
                </div>
                <div ref="oringeRef" id="oriangeEditor" v-show="editOrDiff"></div>
              </el-col>
              <el-col :span="12">
                <el-row class="mb-10">
                  <el-col :span="5" class="mr-10">
                    <el-select v-model="languageM" placeholder="Select" @change="handleLanguageM">
                      <el-option v-for="item in languageOptions" :key="item.value" :label="item.label"
                        :value="item.value" />
                    </el-select>
                  </el-col>
                </el-row>
                <div ref="modifyRef" id="modifiEditor" v-show="editOrDiff"></div>
              </el-col>
              <el-col :span="24" v-show="!editOrDiff">
                <div id="diffEditor" ref="diffEditorRef"></div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-card>
    </div>
</template>
  
<script lang="ts" setup>
import type { Monaco } from '@monaco-editor/loader';
import { editor as EditorType } from 'monaco-editor/esm/vs/editor/editor.api';
import { ref, onMounted, onUnmounted } from 'vue';
import useBoolean from "@/composables/useBoolean";
//   import { useBgState } from "@/composables/state";
//   import { getCodeList } from '~~/api/code';

// 比对界面的 编辑器
const oringeRef = ref();
const modifyRef = ref();
const diffEditorRef = ref();
const monaco = ref<Monaco>()
const [editOrDiff, { setTrue, setFalse }] = useBoolean(true);

// 编辑器的值 使用ref的方式有问题，可能是我没找到正确的打开方式，因此 采用以下方式
let diffEditor: EditorType.IStandaloneDiffEditor;
let oringeditor: EditorType.IStandaloneCodeEditor;
let modifyEditor: EditorType.IStandaloneCodeEditor;

// const templateList = ref([]);

// watchEffect(() => {
//   const { data } = useAsyncData(
//     'editor/list',
//     () => getCodeList(),
//     {
//       server: false, // 首屏直接请求
//     }
//   );
//   templateList.value = (data.value as any)?.data?.map(item => {
//     return {
//       key: item?.id,
//       value: item?.content,
//       label: item?.title,
//       language: item.key,
//     }
//   });
// });

// const template = ref('');
// 模版选择
// const handleSelectTemplate = (v: string) => {
//   languageM.value = v.language;
//   monaco.value?.editor.setModelLanguage(modifyEditor.getModel(), v.language);
//   modifyEditor?.setValue(v.value);
// };

// 语言选择
const language = ref('cpp');
const languageM = ref('cpp');
const languageOptions = [
  {
    key: 'cpp',
    label: 'C++',
    value: 'cpp',
  },
  {
    key: 'c',
    label: 'C',
    value: 'c',
  },
  {
    key: 'javascript',
    label: 'JavaScript',
    value: 'javascript',
  },
  {
    key: 'typescript',
    label: 'TypeScript',
    value: 'typescript',
  },
  {
    key: 'java',
    label: 'Java',
    value: 'java',
  },
  {
    key: 'python',
    label: 'Python',
    value: 'python',
  },
  {
    key: 'golang',
    label: 'Golang',
    value: 'go',
  },
];

// 处理语言改变

const handleLanguage = (v: string) => {
  monaco.value?.editor.setModelLanguage(oringeditor.getModel() as EditorType.ITextModel, v);
  const oldV = oringeditor.getValue();
  if (oldV === "// 请输入原始代码" || oldV === "# 请输入原始代码") {
    if (v === 'python') oringeditor.setValue("# 请输入原始代码");
    else oringeditor.setValue("// 请输入原始代码")
  }

  // 特殊处理 从复代码  后续优化 // todo
  const originalModel = monaco.value?.editor.createModel(oringeditor.getValue(), language.value);
  const modifiedModel = monaco.value?.editor.createModel(modifyEditor.getValue(), languageM.value);
  diffEditor.setModel({
    original: originalModel as EditorType.ITextModel,
    modified: modifiedModel as EditorType.ITextModel,
  });
};

const handleLanguageM = (v: string) => {
  monaco.value?.editor.setModelLanguage(modifyEditor.getModel() as EditorType.ITextModel, v);
  const oldV = modifyEditor.getValue();
  if (oldV === "// 请输入原始代码" || oldV === "# 请输入原始代码") {
    if (v === 'python') modifyEditor.setValue("# 请输入原始代码");
    else modifyEditor.setValue("// 请输入原始代码")
  }

  // 特殊处理 从复代码  后续优化 // todo
  const originalModel = monaco.value?.editor.createModel(oringeditor.getValue(), language.value);
  const modifiedModel = monaco.value?.editor.createModel(modifyEditor.getValue(), languageM.value);
  diffEditor.setModel({
    original: originalModel as EditorType.ITextModel,
    modified: modifiedModel as EditorType.ITextModel,
  });
};

// theme
// const bgState = useBgState();
const theme = "dark"; // computed(() => bgState.value === "SUN" ? 'light' : 'dark');
// const themeOptions = [
//   {
//     key: 'light',
//     label: '明亮',
//     value: 'light'
//   },
//   {
//     key: 'dark',
//     label: '暗黑',
//     value: 'dark'
//   },
// ];
// watch(theme, (nv) => {
//   handleTheme(nv);
// });

// 处理编辑器主题改遍
// const handleTheme = (v: "light" | "dark") => {
//   monaco.value?.editor.setTheme(`vs-${v}`);
// }

// 处理比对逻辑
const handleDiff = async () => {
  const originalModel = monaco.value?.editor.createModel(oringeditor.getValue(), language.value);
  const modifiedModel = monaco.value?.editor.createModel(modifyEditor.getValue(), languageM.value);
  diffEditor.setModel({
    original: originalModel as EditorType.ITextModel,
    modified: modifiedModel as EditorType.ITextModel,
  });
  setFalse()
};

// 处理返回
const handleBack = () => {
  setTrue();
};

onMounted(async () => {
  const loader = await import('@monaco-editor/loader').then(m => m?.default);

  loader.config({
    paths: {
      vs: 'https://cdn.bootcdn.net/ajax/libs/monaco-editor/0.34.0/min/vs' // 设置 vs cdn 引用 地址
    },
    // "vs/nls": {
    //   availableLanguages: { 配置需要加载那种语言，不知道选项，就先这样吧

    //   }
    // }
  })

  monaco.value = await loader.init();

  // 创建 比对界面的编辑器
  oringeditor = monaco.value.editor.create(oringeRef.value, {
    language: "cpp",
    value: "// 请输入原始代码",
    automaticLayout: true,
    folding: true,
    links: true,
    scrollBeyondLastLine: false,
    theme: `vs-${theme}`,
  });

  modifyEditor = monaco.value.editor.create(modifyRef.value, {
    language: "cpp",
    value: "// 请输入比对代码",
    automaticLayout: true,
    folding: true,
    links: true,
    scrollBeyondLastLine: false,
    theme: `vs-${theme}`,
  });

  diffEditor = monaco.value.editor.createDiffEditor(document.getElementById('diffEditor') as HTMLElement, {
    automaticLayout: true,
    folding: true,
    links: true,
    scrollBeyondLastLine: false,
    readOnly: true,
    theme: `vs-${theme}`,
  });
  const originalModel = monaco.value.editor.createModel('heLLo world!', 'text/plain');
  const modifiedModel = monaco.value.editor.createModel('hello orlando!', 'text/plain');
  diffEditor.setModel({
    original: originalModel,
    modified: modifiedModel,
  });

  // let uri = monaco.value.Uri.parse("file://" + 'code/cpp/test');
  // let model = monaco.value.editor.getModel(uri);	// 如果该文档已经创建/打开则直接取得已存在的model
  // if (!model) {// 否则创建新的model
  //   //暂定cpp
  //   model = monaco.value.editor.createModel(code.value, ext.value, uri) // 可以不传uri 自动分配 如 code="console.log('hello')", language="javascript"
  // }

  // Editor.value = monaco.value.editor.create(editor.value, {
  //   theme: 'vs-dark',
  //   language: "cpp",
  //   model,
  //   automaticLayout: true,
  //   folding: true,
  //   links: true,
  //   scrollBeyondLastLine: false,
  //   // inDiffEditor: true,
  //   // cursorSmoothCaretAnimation: true,
  //   // minimap: { 右侧色小地图

  //   // },
  //   // dragAndDrop: true
  //   tabCompletion: "on",
  //   // showFoldingControls: "always"
  //   // renderWhitespace: "all"
  //   // renderControlCharacters: true,
  //   peekWidgetDefaultFocus: 'editor',
  //   // roundedSelection: false // 编辑器预览框
  // });
});

onUnmounted(() => {
  oringeditor.dispose();
  modifyEditor.dispose();
  diffEditor.dispose();
});


onMounted(() => {
  const elcard = document.getElementById('box-card') as HTMLElement;
  const group = document.getElementById('group') as HTMLElement;

  const diff = elcard?.offsetHeight - group?.offsetHeight - 50;
  const oriangeEditor = document.getElementById('oriangeEditor') as HTMLElement;
  oriangeEditor.style.height = diff + 'px';
  const diffEditor = document.getElementById('diffEditor') as HTMLElement;
  diffEditor.style.height = diff + 'px';
  const modifiEditor = document.getElementById('modifiEditor') as HTMLElement;
  modifiEditor.style.height = diff + 'px';
});
</script>
<style lang="less" scoped>
.editor_wrap {
  min-height: 80vh;
  display: flex;
  flex-direction: column;

  margin: 10px auto;
  width: 100%;
  height: 80%;

  .group {
    flex: .1;
    display: flex;
    flex-direction: column;

    .notice {
      margin-bottom: 5px;
    }

    .btn-group {
      margin-bottom: 5px;
    }
  }


  .main-editor {
    flex: .9;
  }
}

#box-card {
  margin: 0 auto;
  width: 100%;
  height: 80%;
}

.dark {
  #box-card {
    border: 1px solid #414243 !important;

    :deep(.el-card__body) {
      background-color: #1d1e1f;
    }

    :deep(.el-input__wrapper) {
      background-color: #1d1e1f;
    }

    :deep(.el-button--primary) {
      background-color: #409eff;
    }
  }
}
</style>
