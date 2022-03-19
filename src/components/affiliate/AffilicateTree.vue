<template>
  <q-tree :nodes='kolList' node-key='UserID' default-expand-all :expanded='[UserID]'>
    <template v-slot:default-header='prop'>
      <div class='invitation-box'>
        <div class='invitation-header'>
          <div class='header-content row'>
            <span style='font-size: 20px; font-weight: 600;'>{{ prop.node.Username }}</span>
            <q-space />
            <span
              style='font-size: 14px; font-weight: 300; margin-right: 5px; margin-top: 6px;'>{{ $t('affiliate.OnBoarded')
              }}</span>
            <span class='invited-count'>{{ prop.node.InvitedCount }}</span>
          </div>
        </div>

        <div class='invitation-content'>
          <span>{{ prop.node.EmailAddress }}</span>
        </div>

        <div class='invitation-content'>
          <span>SMH: </span>
          <span class='sales-number'>{{ prop.node.USDAmount + prop.node.SubUSDAmount }}</span>
          <span> TiB / </span>
          <span class='sales-number'>{{ prop.node.USDAmount + prop.node.SubUSDAmount }}</span>
          <span> USDT</span>
        </div>
      </div>
      <q-inner-loading dark :showing='innerLoading' v-if='userInfo.User.ID === prop.node.UserID'>
        <q-spinner-gears size='50px' color='primary' />
      </q-inner-loading>
    </template>
  </q-tree>
</template>

<script setup lang='ts'>
import { computed, onBeforeMount, ref, onMounted, onUnmounted } from 'vue'
import { useStore } from 'src/store'
import { useQuasar } from 'quasar'
import { ActionTypes } from 'src/store/affiliate/action-types'
import { ModuleKey, Type as NotificationType } from 'src/store/notifications/const'
import { useI18n } from 'vue-i18n'
import { MutationTypes } from 'src/store/affiliate/mutation-types'
import { GetReferralsRequest } from 'src/store/affiliate/types'
import { referralTree } from 'src/store/affiliate/utils'

const q = useQuasar()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })
const UserID = q.cookies.get('UserID')

const innerLoading = ref(false)

type FunctionVoid = () => void
const unsubscribe = ref<FunctionVoid>()

onBeforeMount(() => {
  getInvitationList()
})

onMounted(() => {
  unsubscribe.value = store.subscribe((mutation) => {
    if (mutation.type === MutationTypes.SetReferrals) {
      innerLoading.value = false
    }
  })
})

onUnmounted(() => {
  unsubscribe.value?.()
})

const store = useStore()
const referrals = computed(() => store.getters.getReferrals)
const userInfo = computed(() => store.getters.getUserInfo)
const kolList = computed(() => referralTree(referrals.value))

const getInvitationList = () => {
  innerLoading.value = true

  const request: GetReferralsRequest = {
    Message: {
      ModuleKey: ModuleKey.ModuleApplications,
      Error: {
        Title: t('MSG_GET_MY_INVITATIONS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  }
  store.dispatch(ActionTypes.GetReferrals, request)
}
</script>

<style scoped>
.content {
  margin: 0 72px;
  padding: 0 24px;
}

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
  margin: 24px;
  position: relative;
  width: 400px;
  height: auto;
}

.invitation-header::after {
  background: linear-gradient(
    to right,
    transparent 0,
    #e1eeef 10%,
    transparent 30%
  );
  display: block;
  content: "";
  position: absolute;
  top: 55px;
  height: 1px;
  width: 1200px;
}

.header-content {
  display: flex;
  justify-content: space-between;
}

.title {
  margin-top: 12px;
  width: 100%;
  background: linear-gradient(to left, #54e280 0, #1ec498 50%);
  background-clip: border-box;
  filter: contrast(2);
  font-size: 28px;
  font-weight: 400;
  margin: 36px auto;
  padding: 0 0 8px 0;
  position: relative;
  text-transform: uppercase;
  -webkit-background-clip: text;
  -webkit-box-decoration-break: clone;
  -webkit-text-fill-color: transparent;
}

.title::after {
  background: linear-gradient(
    to right,
    transparent 0,
    #e1eeef 10%,
    transparent 30%
  );
  display: block;
  content: "";
  position: absolute;
  left: -16px;
  bottom: -4px;
  height: 1px;
  width: 100%;
}

.invitation-content {
  margin-top: 10px;
}

.invited-count {
  background: linear-gradient(to left, #54e280 0, #1ec498 50%);
  background-clip: border-box;
  filter: contrast(2);
  font-size: 20px;
  font-weight: bold;
  -webkit-background-clip: text;
  -webkit-box-decoration-break: clone;
  -webkit-text-fill-color: transparent;
}

.sales-number {
  color: white;
  font-weight: bold;
  font-size: 20px;
}

</style>
