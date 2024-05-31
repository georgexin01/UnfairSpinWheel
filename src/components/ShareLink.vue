<template>

</template>

<script lang="ts" setup>
import { nextTick, onMounted, ref, watch } from 'vue';
import { init } from 'shareon';
import { GroupLabel, Items } from '@/services/ItemService';
import { StringHelper } from '@/helpers/StringHelper';
import type { IItem } from '@/interface/IItem';

const origin = window.location.origin;

const getCompressedCSV = ref('');

const updateShareLink = (newItems: PouchDB.Core.ExistingDocument<IItem>[] | undefined) => {
  getCompressedCSV.value = StringHelper.compress(StringHelper.csvStringify(newItems));
};

onMounted(async () => {
  watch(getCompressedCSV, init, {
    // Trigger after the DOM is updated
    // Shareon get values from data-url attribute
    flush: 'post'
  });
  watch(Items, updateShareLink);

  updateShareLink(Items.value);

  await nextTick();
  init();
});
</script>

<style scoped></style>
