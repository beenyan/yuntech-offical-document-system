import { ref } from 'vue';
import { defineStore } from 'pinia';

export default class Content {
  text: String;
  children: Content[];

  constructor(text: String = '', children: Array<Content> = []) {
    this.text = text;
    this.children = children;
  }
}

export const useContentStore = defineStore('content', () => {
  const ContentList = ref([new Content()]);

  const InsertInto = (contentList: Array<Content>, index: number) => {
    contentList.splice(index + 1, 0, new Content());
  };

  const AddChildren = (content: Content) => {
    content.children.push(new Content());
  };

  return { ContentList, InsertInto, AddChildren };
});
