<template>
  <div class="invitation-box row">
    <div class="invitation-header">
      <div class="header-content">
        <span>
          {{ userInvitationCode }}
        </span>
      </div>
    </div>
    <div class='column'>
      <q-space class='col-1' />
      <q-btn
        class='common-button copy-button'
        :label='$t("affiliate.CopyCode")'
        dense />
      <q-space class='col-1' />
    </div>
  </div>
</template>

<script setup lang='ts'>
import { computed, onMounted } from 'vue'
import { GetUserInvitationCodeRequest } from 'src/store/users/types'
import { useStore } from 'src/store'
import { ActionTypes } from 'src/store/users/action-types'

const store = useStore()

const getUserInvitationCode = () => {
  const request: GetUserInvitationCodeRequest = {}
  store.dispatch(ActionTypes.GetUserInvitationCode, request)
}

onMounted(() => {
  getUserInvitationCode()
})

const userInvitationCode = computed(() => store.getters.getUserInvitationCode)

</script>

<style scoped>
.invitation-box {
  background: linear-gradient(
    to bottom right,
    rgba(225, 238, 239, 0.2) 0,
    rgba(161, 208, 208, 0.2) 100%
  );
  box-shadow: 16px 16px 20px 0 #23292b;
  border-radius: 12px;
  color: #e1eeef;
  padding: 24px;
  margin: 24px 0 24px 48px;
  position: relative;
  width: 600px;
  height: auto;
}

.header-content {
  display: flex;
  justify-content: space-between;
  background: linear-gradient(
    to bottom right,
    rgba(225, 238, 239, 0.2) 0,
    rgba(161, 208, 208, 0.2) 100%
  );
  border: 0;
  border-radius: 12px;
  color: #e4f4f0;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 48px;
  font-size: 28px;
  font-weight: 600;
  padding: 0 48px 0 48px;
  margin-right: 24px;
}

.copy-button {
  background: linear-gradient(to bottom right, #ff964a 0, #ce5417 100%);
  border: 0;
  color: #e4f4f0;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  height: 24px;
  line-height: 18px;
}

</style>
