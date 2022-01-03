<template>
  <q-tree :nodes='invitationList' node-key='UserID' default-expand-all :expanded='[UserID]'>
    <template v-slot:default-header='prop'>
      <div>
        <div class='invitation-box'>
          <div class='invitation-header'>
            <div class='header-content'>
                <span style='font-size: 20px; font-weight: 600'>{{
                    prop.node.Username
                  }}</span>
            </div>
          </div>

          <div class='invitation-content'>
            <span>{{ prop.node.EmailAddress }}</span>
          </div>
        </div>
      </div>
    </template>
  </q-tree>

  <q-inner-loading :showing="innerLoading">
    <q-spinner-gears size="50px" color="primary" />
  </q-inner-loading>
</template>

<script setup lang='ts'>
import { computed, onBeforeMount } from 'vue'
import { useStore } from 'src/store'
import { GetDirectInvitationsRequest } from 'src/store/affiliate/types'
import { useQuasar } from 'quasar'
import { ItemStateTarget } from 'src/store/types'
import { ActionTypes } from 'src/store/affiliate/action-types'
import { MutationTypes } from 'src/store/notify/mutation-types'

const q = useQuasar()
const UserID = q.cookies.get('UserID')
const target = ItemStateTarget.GetDirectInvitationList

const innerLoading = computed(() => store.getters.getInnerLoading.get(target))

onBeforeMount(() => {
  getInvitationList()
})

const store = useStore()
const invitationList = computed(() => store.getters.getInvitationList)
const userBasicInfo = computed(() => store.getters.getUserBasicInfo)

const getInvitationList = () => {
  store.commit(MutationTypes.SetInnerLoading, {
    key: target,
    value: true
  })
  const request: GetDirectInvitationsRequest = {
    AppID: q.cookies.get('AppID'),
    InviterID: q.cookies.get('UserID'),
    Username: userBasicInfo.value.Username,
    EmailAddress: userBasicInfo.value.EmailAddress,
    Target: target
  }
  store.dispatch(ActionTypes.GetDirectInvitationList, request)
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
  width: 600px;
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
  width: 600px;
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
</style>
