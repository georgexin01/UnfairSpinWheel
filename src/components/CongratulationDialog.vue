<template>
  <div class="congrats" ref="congrats" @click="close">
    <div ref="label" class="bounce-in-fwd text-8xl label text-center max-w-screen overflow-x-hidden">
      {{ dialogRef?.data.item.label }}
    </div>

    <div v-for="i in 20" :key="i" class="blob pi pi-star-fill" :class="'blob-' + i"></div>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, ref, type Ref } from 'vue';
import { CongratulationSound } from '@/services/SettingService';
import type { DynamicDialogInstance } from 'primevue/dynamicdialogoptions';

const dialogRef = inject<DynamicDialogInstance>('dialogRef') as unknown as
  | Ref<DynamicDialogInstance>
  | undefined;
const congrats = ref();
const label = ref();

const playSound = () => {
  if (!CongratulationSound.value) return;

  var src = CongratulationSound.value.value.startsWith('data:')
    ? CongratulationSound.value.value
    : `/bniwheelspin/sound/${CongratulationSound.value.value}`;
  const audio = new Audio(src);
  audio.volume = 0.7;
  audio.play();
};

const close = () => {
  dialogRef?.value.close();
};

onMounted(() => {
  playSound();
});
</script>

<style scoped lang="scss">
.label {
  color: white;
  z-index: 2;
}

.blob {
  height: 100px;
  width: 100px;
  color: #ffcc00;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  font-size: 30px;
}

.bounce-in-fwd {
  animation: bounce-in-fwd 0.9s both;
}

/* ----------------------------------------------
 * Generated by Animista on 2023-10-24 9:44:34
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation bounce-in-fwd
 * ----------------------------------------
 */
@keyframes bounce-in-fwd {
  0% {
    transform: scale(0);
    animation-timing-function: ease-in;
    opacity: 0;
  }

  38% {
    transform: scale(1);
    animation-timing-function: ease-out;
    opacity: 1;
  }

  55% {
    transform: scale(0.7);
    animation-timing-function: ease-in;
  }

  72% {
    transform: scale(1);
    animation-timing-function: ease-out;
  }

  81% {
    transform: scale(0.84);
    animation-timing-function: ease-in;
  }

  89% {
    transform: scale(1);
    animation-timing-function: ease-out;
  }

  95% {
    transform: scale(0.95);
    animation-timing-function: ease-in;
  }

  100% {
    transform: scale(1);
    animation-timing-function: ease-out;
  }
}

@for $i from 1 through 20 {
  .blob-#{$i} {
    animation: puff-out-center-#{$i} 2s cubic-bezier(0.165, 0.84, 0.44, 1) both;
  }

  /**
  * ----------------------------------------
  * animation puff-out-center
  * ----------------------------------------
  */
  @keyframes puff-out-center-#{$i} {
    0% {
      transform: translate(0, 0) scale(1);
      filter: blur(0px);
      opacity: 1;
    }

    100% {
      transform: translate(#{floor(random() * 500)-250}px, #{floor(random() * 500)-250}px) scale(2);
      filter: blur(4px);
      opacity: 0;
    }
  }
}
</style>
