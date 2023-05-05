<script>
export default {
  props: {
    contact: { type: Object, required: true },
  },
};
</script>
<template>
  <div>
    <div class="p-1">
      <strong>Tiêu đề:</strong>
      {{ contact.title }}
    </div>
    <div class="p-1">
      <strong>Ảnh bìa:</strong>
      <img width="300" :src="contact.img" alt="">

    </div>
    <div class="p-1">
      <strong>Mô tả:</strong>
      {{ contact.desc }}
    </div>
    <div class="p-1">
      <strong>Nội dung:</strong>
      {{ contact.content }}
    </div>

  </div>
</template>
