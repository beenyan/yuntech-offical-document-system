<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ContentComponent from './components/ContentComponent.vue';
import ContentHandle from './components/ContentHandle.vue';
import { TextHandle } from './modules/Utils.js';
import Content, { useContentStore } from './stores/Content.js';
import { writeText } from '@tauri-apps/api/clipboard';
import { getVersion } from '@tauri-apps/api/app';

const AppVersion = ref('');
const Purpose = ref('');
const Title = ref('');
const Sender = ref('');
const Store = useContentStore();
const PDF = ref();

const CopyHTML = async () => {
  const HTML = PDF.value.innerHTML.replace(/<!--[\s\S]*?-->/g, '');
  await writeText(HTML);
};

const Clear = () => {
  Purpose.value = '';
  Title.value = '';
  Sender.value = '';
  Store.ContentList = [new Content()];
};

onMounted(async () => {
  AppVersion.value = `v${await getVersion()}`;
});
</script>

<template>
  <v-app @contextmenu.prevent>
    <v-row no-gutters class="ma-9 pa-3">
      <v-col sm="6">
        <v-text-field v-model="Title" label="標題"></v-text-field>
        <v-text-field v-model="Sender" label="主辦單位"></v-text-field>
        <v-textarea
          v-model="Purpose"
          label="主旨"
          @change="Purpose = TextHandle($event.target.value, Sender)"
        ></v-textarea>
        <ContentHandle
          :Sender="Sender"
          :content-list="Store.ContentList"
        ></ContentHandle>
      </v-col>

      <v-col sm="6">
        <v-sheet class="mx-2 pa-2">
          <v-snackbar :timeout="2000" color="success" variant="outlined">
            成功複製到剪貼簿

            <template v-slot:activator="{ props }">
              <v-btn icon="$vuetify" @click="CopyHTML" v-bind="props">
                <v-icon icon="mdi-content-copy" color="green" />
              </v-btn>
            </template>
          </v-snackbar>

          <v-btn icon="$vuetify" @click="Clear">
            <v-icon icon="mdi-broom" color="red" />
          </v-btn>
        </v-sheet>

        <v-sheet class="mx-2 pa-2">
          <div ref="PDF">
            <h1>
              <b>{{ Title }}</b>
            </h1>
            <p>主旨：{{ Purpose }}</p>
            <p>主辦單位：{{ Sender }}</p>
            <p>說明：</p>
            <ContentComponent
              :content-list="Store.ContentList"
              :level="0"
            ></ContentComponent>
          </div>
        </v-sheet>
      </v-col>
    </v-row>

    <v-footer>
      <v-row justify="center" no-gutters>
        <v-col class="text-center my-2" cols="4">
          <b>BeenYan</b>
        </v-col>

        <v-col class="text-center my-2" cols="4"></v-col>

        <v-col class="text-center my-2" cols="4"> {{ AppVersion }} </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<style scoped></style>
