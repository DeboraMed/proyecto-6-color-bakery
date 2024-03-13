<script setup>
import {defineProps, defineEmits, ref} from "vue";
import {onClickOutside} from '@vueuse/core'

const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["modal-close"]);

const target = ref(null)
onClickOutside(target, () => emit('modal-close'))

</script>

<template>
  <div v-if="isOpen" class="modal__mask">
    <div class="modal-wrapper">
      <div class="modal__container" ref="target">
        <div class="modal-header">
          <slot name="header"> default header</slot>
        </div>
        <div class="modal-body">
          <slot name="content"> default content</slot>
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <div>
              <button class="button" @click.stop="emit('modal-close')">Salir</button>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal__mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal__container {
  width: 50%;
  margin: 6rem auto;
  padding: 2rem 3rem;
  background-color: var(--bg-color-clear);
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}

@media screen and (max-width: 75rem /*1200px*/
) {
  .modal__container {
    width: 80%;
    margin: 2rem auto;
    padding: 1rem 2rem;
  }

  .modal__container input,
  .modal__container textarea {
    width: 80%;
    box-sizing: border-box;
  }
}

@media only screen and (max-width: 48rem /*768px*/
) {
  .modal__container {
    width: 80%;
    margin: 2rem auto;
    padding: 1rem 2rem;
  }

  .modal__container input,
  .modal__container textarea {
    width: 100%;
    box-sizing: border-box;
  }
}

/*medias generales*/
@media only screen and (max-width: 29.8125rem /*477px*/
) {
  .modal__container {
    min-width: 300px;
    width: 90%;
    margin: 2rem auto;
    padding: 1rem 1.5rem;
  }
}
</style>