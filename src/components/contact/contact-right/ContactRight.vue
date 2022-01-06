<template>
  <q-card class='form-container'>
    <q-card-section>
      <h3 class='common-card-title'>{{ $t('contact.Right.Title') }}</h3>
    </q-card-section>
    <q-card-section>
      <div class='box-content'>
        <p class='content-style'>{{ $t('contact.Right.Box1Content.Word1') }}<strong>{{ $t('contact.Right.Box1Content.StrongWord1') }}</strong>{{ $t('contact.Right.Box1Content.Word2') }}<strong>{{ $t('contact.Right.Box1Content.StrongWord2') }}</strong>{{ $t('contact.Right.Box1Content.Word3') }}<strong>{{ $t('contact.Right.Box1Content.StrongWord3') }}</strong>{{ $t('contact.Right.Box1Content.Word4') }}
        </p>
      </div>
    </q-card-section>
    <q-card-section>
      <q-img></q-img>
    </q-card-section>
    <q-card-section>
      <p class='content-style'>{{$t('contact.Right.Content')}}</p>
      <h4 class="signature">—Procyon Support Team</h4>
    </q-card-section>
  </q-card>
</template>

<script setup lang='ts'>
</script>

<style scoped>
.box-content {
  background: #ffffff22;
  border-radius: 12px;
  padding: 12px;
}

.content-style {
  margin-bottom: 0;
  font-size: 16px;
  line-height: 28px;
}

strong {
  color: #1ec498;
}

.signature {
  color: #1ec498;
  font-weight: 400;
}

.form-container {
  background: linear-gradient(to bottom right, rgba(225, 238, 239, 0.2) 0, rgba(161, 208, 208, 0.2) 100%);
  box-shadow: 16px 16px 20px 0 #23292b;
  border-radius: 12px;
  color: #e1eeef;
  padding: 48px;
  margin: 48px auto;
  min-width: 360px;
  max-width: 480px;
  width: 35%;
}
</style>
