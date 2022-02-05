<template>
  <q-table
    flat
    style='color: #e1eeef'
    :rows='userLoginHistories'
    :columns='userLoginHistoryColumns'
    row-key='name'
    class='table-box'
    v-model:pagination='pagination'
    hide-pagination
    :no-data-label="$t('NoData')"
  />
  <div class='flex flex-center'>
    <q-pagination
      v-model='pagination.page'
      :max='pagesNumber'
      color='white'
      input
      input-class='text-white'
    />
  </div>
</template>

<script setup lang='ts'>
import { computed, onMounted, ref } from 'vue'
import { GetUserLoginHistoryRequest, LoginHistory } from 'src/store/users/types'
import { useStore } from 'src/store'
import { ActionTypes } from 'src/store/users/action-types'
import { useI18n } from 'vue-i18n'
import { TimeStampToDate } from 'src/utils/utils'
import { ModuleKey, Type as NotificationType } from 'src/store/notifications/const'

const store = useStore()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t, locale } = useI18n({ useScope: 'global' })

const getUserLoginHistory = () => {
  const request: GetUserLoginHistoryRequest = {
    Message: {
      ModuleKey: ModuleKey.ModuleApplications,
      Error: {
        Title: t('MSG_GET_LOGIN_HISTORIES_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  }
  store.dispatch(ActionTypes.GetUserLoginHistories, request)
}

onMounted(() => {
  getUserLoginHistory()
})

const userLoginHistories = computed(() => store.getters.getUserLoginHistories)

const userLoginHistoryColumns = [
  {
    name: 'LoginTime',
    label: t('account.History.Date'),
    align: 'left',
    field: (raw: LoginHistory) => TimeStampToDate(raw.CreateAt, 'YYYY-MM-DD HH:mm:ss', locale.value),
    sortable: true
  },
  {
    name: 'IP',
    label: t('account.History.IP'),
    align: 'center',
    field: 'ClientIP'
  },
  {
    name: 'Location',
    label: t('account.History.Location'),
    align: 'center',
    field: 'Location'
  }
]

const pagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 10
})

const pagesNumber = computed(() => Math.ceil((userLoginHistories.value.length / pagination.value.rowsPerPage)))
</script>

<style scoped>
.table-box {
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
}

.table-box >>> th {
  font-size: 16px !important;
}
</style>
