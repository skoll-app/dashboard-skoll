<script setup lang="ts">
const props = defineProps({
  day: {
    type: String,
    required: true,
  },
  totalHours: {
    type: String,
    required: true,
  },
});

// Emit
const emit = defineEmits(["allowEdit", "resetHour"]);

// Methods
const allowEdit = () => {
  emit("allowEdit", props.day);
};

const resetHour = () => {
  emit("resetHour", props.day);
};
</script>

<template>
  <div class="col-12 md:col-6">
    <div class="flex align-items-center">
      <Button
        class="p-button-info mr-2"
        type="button"
        icon="pi pi-pencil"
        @click="allowEdit"
      ></Button>
      <Button
        class="p-button-danger mr-2"
        type="button"
        icon="pi pi-trash"
        @click="resetHour"
      ></Button>
      <div>
        <Tag :value="totalHours" icon="pi pi-clock" rounded></Tag>
      </div>
    </div>
  </div>
</template>
