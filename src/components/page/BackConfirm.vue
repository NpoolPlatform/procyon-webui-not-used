<template>
  <q-page class='container'>
    <q-btn class='back-button' @click='onBackClick'>⭠</q-btn>
    <div class='content'>
      <div class='form-container'>
        <div class='confirmation'>
          <slot />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang='ts'>
import { useRouter } from 'src/router'
const router = useRouter()
const onBackClick = () => {
  router.back()
}
</script>

<style lang='sass' scoped>
.form-container
  background: linear-gradient(to bottom right, rgba(225, 238, 239, 0.2) 0, rgba(161, 208, 208, 0.2) 100%)
  box-shadow: 16px 16px 20px 0 #23292b
  border-radius: 12px
  color: #e1eeef
  padding: 48px
  margin: 48px auto
  min-width: 360px
  max-width: 480px
  line-height: 100%

.form-container button
  margin: 18px 0 0 0

.confirmation h3
  margin-top: 0

.confirmation h3.form-title
  font-size: 18px
  padding: 0

.confirmation h3.form-title::after
  display: none

.confirmation button
  margin: 0 0 24px 0
  width: 100%

.form-container .full-section
  margin: 0
  width: 100%

.form-container .number
  background: linear-gradient(to bottom right, #ffe91d -50%, #ce5417 150%)
  background-clip: border-box
  filter: contrast(1.5)
  overflow-wrap: anywhere
  -webkit-background-clip: text
  -webkit-box-decoration-break: clone
  -webkit-text-fill-color: transparent

.form-container .unit
  color: #e4f4f0
  filter: contrast(1.5)
  font-size: 16px
  font-weight: 700

.form-container span
  font-size: 28px

.confirmation h3
  margin-top: 0
  line-height: 100%

.confirmation h3.form-title
  font-size: 18px
  padding: 0

.confirmation h3.form-title::after
  display: none

.form-container h4
  font-size: 18px
  font-weight: 400
  margin: 12px 0 4px 0
  text-transform: unset

.form-container label[for="agreement"]
  font-size: 16px
  font-weight: 400
  opacity: .7

.warning
  align-items: center
  border: 1px solid #1ec498
  border-radius: 18px
  display: flex
  font-size: 16px
  font-weight: 600
  padding: 8px

.warning img
  filter: invert(100%) opacity(.8)
  margin: 0 8px 0 0
  height: 24px
  width: 24px

.warning span
  font-size: 12px
  font-weight: 600

.confirmation .btn
  margin: 18px 0 24px 0
  width: 100%

.form-container .btn
  margin: 18px 0 0 0

button,
input[type='submit']
  background: linear-gradient(to bottom right, #ff964a 0, #ce5417 100%)
  border: 0
  border-radius: 18px
  color: #e4f4f0
  cursor: pointer
  font-family: 'Barlow', sans-serif
  font-size: 18px
  font-weight: 600
  height: 48px
  margin: 24px 24px 24px 0
  padding: 12px 24px
  text-shadow: 1px 1px 1px #ce5417
  transition: all ease-in-out .1s

button.alt,
input[type='submit'].send-code
  background: none
  border: 1px solid #ff964a
  color: #ff964a
  text-shadow: 1px 1px 1px #27424c

button:hover,
input[type='submit']:hover
  border-radius: 4px
  filter: contrast(1.5)

button.in-active
  filter: saturate(0) contrast(.7)

.hr
  margin: 24px 0

.back-button
  background: linear-gradient(to bottom right, rgba(225, 238, 239, 0.2) 0, rgba(161, 208, 208, 0.2) 100%)
  box-shadow: 16px 16px 20px 0 #23292b
  border-radius: 0 12px 12px 0
  cursor: pointer
  display: inline-block
  font-size: 24px
  line-height: 30px
  margin: 0
  opacity: .7
  padding: 16px 24px
  position: absolute
  text-transform: uppercase
  transition: all ease-in-out .2s
</style>
