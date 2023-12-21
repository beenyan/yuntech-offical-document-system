<script setup lang="ts">
import { TextHandle, SwapElements, numToChinese } from '../modules/Utils.js';
import Content, { useContentStore } from '../stores/Content.js';

defineProps({
  Sender: {
    type: String,
    default: [],
    request: true,
  },
  contentList: {
    type: Array<Content>,
    default: [],
    request: true,
  },
  level: {
    type: Number,
    default: 1,
    request: true,
  },
});

const Store = useContentStore();
const KeyToDo = (
  event: KeyboardEvent,
  content: Content,
  contentList: Array<Content>,
  index: number,
) => {
  event.shiftKey
    ? Store.AddChildren(content)
    : Store.InsertInto(contentList, index);
};
</script>

<template>
  <div class="box" v-for="(content, index) in contentList">
    <v-row class="my-2">
      <v-col class="pa-1" sm="10">
        <v-text-field
          v-model="content.text"
          autofocus
          :label="`${index + 1} - ${numToChinese(level, false)}`"
          hide-details="auto"
          @change="content.text = TextHandle($event.target.value, Sender)"
          @keyup.enter="(event:KeyboardEvent) => KeyToDo(event, content, contentList, index+1)"
        ></v-text-field>

        <v-btn
          size="small"
          class="w-100"
          @click="Store.InsertInto(contentList, index + 1)"
        >
          <v-icon icon="mdi-plus" color="green" />
        </v-btn>
      </v-col>

      <v-col sm="2" class="align-space-between pa-0">
        <v-btn
          size="x-small"
          icon="$vuetify"
          :disabled="Store.ContentList.length == 1 && level == 1"
          @click="contentList.splice(index, 1)"
        >
          <v-icon icon="mdi-delete" color="red" />
        </v-btn>

        <v-btn
          size="x-small"
          icon="$vuetify"
          v-if="content.children.length == 0"
          @click="Store.AddChildren(content)"
        >
          <v-icon icon="mdi-plus" color="green" />
        </v-btn>

        <v-btn
          size="x-small"
          icon="$vuetify"
          v-if="index != 0"
          @click="SwapElements(contentList, index, index - 1)"
        >
          <v-icon icon="mdi-pan-up" size="x-large" color="green" />
        </v-btn>

        <v-btn
          size="x-small"
          icon="$vuetify"
          v-if="index != contentList.length - 1"
          @click="SwapElements(contentList, index, index + 1)"
        >
          <v-icon icon="mdi-pan-down" size="x-large" color="green" />
        </v-btn>
      </v-col>
    </v-row>

    <ContentHandle
      v-if="content.children.length != 0"
      :content-list="content.children"
      :level="level + 1"
    ></ContentHandle>
  </div>
</template>

<style lang="scss" scoped>
.box {
  padding-left: 20px;
}
</style>
