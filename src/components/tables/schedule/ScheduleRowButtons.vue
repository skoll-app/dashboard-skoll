<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  day: {
    type: String,
    required: true,
  },
  totalHours: {
    type: Number,
    required: true,
  },
});

const showSaveButton = ref(false);

// Emit
const emit = defineEmits(["allowEdit", "resetHour", "saveHour"]);

// Methods
const allowEdit = () => {
  showSaveButton.value = true;
  emit("allowEdit", props.day);
};

const resetHour = () => {
  emit("resetHour", props.day);
};

const saveHour = () => {
  showSaveButton.value = false;
  emit("saveHour", props.day);
};
</script>

<template>
  <div class="col-12 md:col-6">
    <div class="flex align-items-center">
      <Button
        v-if="showSaveButton"
        class="p-button-success mr-2"
        type="button"
        icon="pi pi-check"
        @click="saveHour"
      ></Button>
      <Button
        v-else
        class="p-button-warning mr-2"
        type="button"
        icon="pi pi-pencil"
        @click="allowEdit"
      ></Button>
      <Button
        class="p-button-secondary mr-2"
        type="button"
        icon="pi pi-trash"
        @click="resetHour"
      ></Button>
      <div>
        <Tag
          :value="totalHours > 0 ? totalHours + ' Horas' : 'Sin asignar'"
          icon="pi pi-clock"
          rounded
          :severity="totalHours > 0 ? 'success' : 'danger'"
        ></Tag>
      </div>
    </div>
  </div>
</template>
