<script setup lang="ts">
import Content from '../stores/Content.js';
import { IndexToStr } from '../modules/Utils.js';

defineProps({
  contentList: {
    type: Array<Content>,
    default: [],
    request: true,
  },
  level: {
    type: Number,
    default: 0,
    request: true,
  },
});
</script>

<template>
  <div style="padding-left: 2rem">
    <p
      style="word-wrap: break-word; max-width: 100%"
      v-for="(content, index) in contentList"
    >
      {{ IndexToStr(index, level) }} {{ content.text }}

      <ContentComponent
        v-if="content.children.length != 0"
        :content-list="content.children"
        :level="level + 1"
      ></ContentComponent>
    </p>
  </div>
</template>
