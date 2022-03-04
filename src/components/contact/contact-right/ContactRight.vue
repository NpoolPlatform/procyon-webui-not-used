<template>
  <q-card class='form-container'>
    <q-card-section>
      <h3 class='common-card-title'>{{ $t('contact.Right.Title') }}</h3>
    </q-card-section>
    <q-card-section>
      <p class='qr-code-text text-background'>{{ $t('contact.Right.Box1Content.Word1')
        }}<strong>{{ $t('contact.Right.Box1Content.StrongWord1') }}</strong>{{ $t('contact.Right.Box1Content.Word2')
        }}<strong>{{ $t('contact.Right.Box1Content.StrongWord2') }}</strong>{{ $t('contact.Right.Box1Content.Word3')
        }}<strong>{{ $t('contact.Right.Box1Content.StrongWord3') }}</strong>{{ $t('contact.Right.Box1Content.Word4') }}
      </p>
    </q-card-section>
    <q-card-section class='qr-code-container'>
      <q-img class='img-style' :src='qrcodeUrl' />
    </q-card-section>
    <q-card-section>
      <p class='qr-code-text'>{{ $t('contact.Right.Content') }}</p>
      <h4 class='signature'>{{ $t('contact.Right.Signature') }}</h4>
    </q-card-section>
  </q-card>
</template>

<script setup lang='ts'>
import { ref } from 'vue'

const qrcodeUrl = ref('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAAD6AQAAAACgl2eQAAABu0lEQVR4Xu2WwW3EMAwECagAl6TWWZILEKBwlkbi8+PyXsCEc6fQ89kjl2Ls75HxzDziBTpeoOMFOgRkVBw5lFgxV8Qi1e9sgPpbR9YTRx32OGd9dt4IQFflpXETDTsCuVHH2RoomfXQaSLtgK2W22dQrHN243XeCMDqMs7fQ6rfuQBXRI0v1GH/36QToKkVeF9dp8KN8ybTAahOG7J8D7GlltMcMALQtfA7ZapOG2LG3TgGAN9DLUfynFUmgHs1DYDs2zz0DIzDNGv7+ACVkUBqhHG22m/fiuUAXBmqAwmvSTzNALqLS4TZVbm66+M+xCwAdC1tKUubiTpQqq0AJnDZ5AwZJ3XGSlZAVYflSp02h7puM8fSDDhwvd4GxgGYW+ED1OzS+DrRiIlaqRsQutA3y9Vs73C5RP8ELgBlIk9wuBgzQHe6aoRf1Hg0obrOB8jOQ1awqLTGtAI6sr0vgf3WC0CU6jW3gOiuu60oFsDWHMP7oMRDpgWg/aRHWWoIp5g+eQGJ8ZUcqP6wvw+gPBNsIvZzRbEAtlpuXetWdLRkI4D/mcAaxZQM4b1r+QDf4gU6XqDjBTr+B34Ac7ujAMSWx/8AAAAASUVORK5CYII=')
</script>

<style scoped>
.qr-code-text {
  font-size: 16px;
  line-height: 28px;
}

.qr-code-text strong {
  color: #1ec498;
}

.text-background {
  background: #ffffff22;
  border-radius: 12px;
  padding: 12px;
}

.qr-code-container {
  text-align: center;
  width: 100%;
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
  width: 45%;
}

.img-style {
  border-radius: 12px;
  width: 100%;
}
</style>
