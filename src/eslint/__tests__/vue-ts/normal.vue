<template>
  <div>
    <div class="wang-editor">
      <Toolbar
        :editor="editorRef"
        :default-config="toolbarConfig"
        mode="default"
        style="border-bottom: 1px solid var(--el-border-color)"
      />
      <Editor
        v-model="valueHtml"
        :default-config="editorConfig"
        mode="default"
        style="height: 400px; overflow-y: hidden"
        @on-created="handleCreated"
        @on-change="handleChange"
        @on-blur="handleBlur"
        @custom-alert="customAlert"
        @custom-paste="customPaste"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import type {
  IEditorConfig,
  IToolbarConfig,
  IDomEditor,
} from '@wangeditor/editor';
import { deleteFileOnOss, uploadFileToOss } from '@/api/util';

const props = defineProps({
  description: {
    type: String,
    default() {
      return '';
    },
  },
});
const emit = defineEmits(['blur', 'change']);

// 编辑器实例，必须用 shallowRef，重要！
const editorRef = shallowRef<IDomEditor>();

// 内容 HTML
const description = toRef(props, 'description');
const valueHtml = ref(description.value);
watch(description, (newVal) => {
  valueHtml.value = newVal;
});

const toolbarConfig: Partial<IToolbarConfig> = {};
toolbarConfig.excludeKeys = [
  'blockquote', // 引用
  'fullScreen', // 全屏
  'group-video', // 视频组 - 上传视频、插入视频
  'codeBlock', // 代码块
];
const editorConfig: Partial<IEditorConfig> = {
  placeholder: '请输入内容...',
  MENU_CONF: {},
};
editorConfig.MENU_CONF!['uploadImage'] = {
  async customUpload(
    file: File,
    insert: (url: string, alt: string, href: string) => void,
  ) {
    const res = await uploadFileToOss(file);
    insert(
      res.data.data.file,
      `${res.data.data.name}_${res.data.data.id}`,
      res.data.data.file,
    );
  },
};

let startImages: (HTMLImageElement | null)[] = [];
let endImages: (HTMLImageElement | null)[] = [];
editorConfig.MENU_CONF!['insertImage'] = {
  onInsertedImage(imageNode: HTMLImageElement | null) {
    if (imageNode === null) return;
    startImages.push(imageNode);
  },
};

const onEditEnd = (editor: IDomEditor) => {
  endImages = editor.getElemsByType('image');
  console.log(startImages, endImages);
  if (
    startImages &&
    endImages &&
    (startImages.length > 0 || endImages.length > 0)
  ) {
    const startImageIds = startImages.map((image) => {
      const arr = image?.alt.split('_');
      if (!arr || arr.length < 2) return -1;
      return arr[arr.length - 1];
    });
    const endImageIds = endImages.map((image) => {
      const arr = image?.alt.split('_');
      if (!arr || arr.length < 2) return -1;
      return arr[arr.length - 1];
    });

    const deletedImageIds = startImageIds.filter(
      (image) => !endImageIds.find((i) => i === image),
    );
    if (deletedImageIds.length > 0) {
      Promise.all(deletedImageIds.map((id) => deleteFileOnOss(id))).then(() => {
        ElMessage.warning('图片已删除，撤销无法重新加载图片');
      });
    }
  }
};

// 组件销毁时，也及时销毁编辑器，重要！
onBeforeUnmount(() => {
  if (!editorRef.value) return;
  editorRef.value.destroy();
});

// 编辑器回调函数
const handleCreated = (editor: IDomEditor) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
  // 不加延迟可能拿不到image
  setTimeout(() => {
    startImages = editor.getElemsByType('image');
  }, 100);
};
const handleChange = (editor: IDomEditor) => {
  emit('change', editor.getHtml());
};
const handleBlur = (editor: IDomEditor) => {
  onEditEnd(editor);
  emit('blur', editor.getHtml());
};
const customAlert = (info: string, type: string) => {
  ElMessage.warning(`${type}: ${info}`);
};
const customPaste = (
  _editor: IDomEditor,
  _event: unknown,
  callback: (param: boolean) => void,
) => {
  // 自定义插入内容
  // editor.insertText("xxx");

  // 返回值（注意，vue 事件的返回值，不能用 return）
  // callback(false); // 返回 false ，阻止默认粘贴行为
  callback(true); // 返回 true ，继续默认的粘贴行为
};
</script>

<style scoped lang="less">
.wang-editor {
  border: 1px solid var(--el-border-color);
  border-radius: 4px;
  margin-top: 10px;
}

.dark .wang-editor {
  --w-e-toolbar-color: var(--el-text-color-regular);
  --w-e-toolbar-bg-color: var(--el-bg-color);
  --w-e-textarea-bg-color: var(--el-bg-color);
  --w-e-textarea-color: var(--el-text-color-regular);
}
</style>
