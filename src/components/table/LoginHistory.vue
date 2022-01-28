<template>
  <q-table
    flat
    style='color: #e1eeef'
    :rows='userLoginHistory'
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
import { GetUserLoginHistoryRequest, LoginRecord } from 'src/store/users/types'
import { useStore } from 'src/store'
import { ActionTypes } from 'src/store/users/action-types'
import { useI18n } from 'vue-i18n'
import { TimeStampToDate } from 'src/utils/utils'

const store = useStore()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t, locale } = useI18n({ useScope: 'global' })

const getUserLoginHistory = () => {
  const request: GetUserLoginHistoryRequest = {}
  store.dispatch(ActionTypes.GetUserLoginHistory, request)
}

onMounted(() => {
  getUserLoginHistory()
})

const userLoginHistory = computed(() => store.getters.getUserLoginHistory)

const userLoginHistoryColumns = [
  {
    name: 'LoginTime',
    label: t('account.History.Date'),
    align: 'left',
    field: (raw: LoginRecord) => TimeStampToDate(raw.LoginTime, 'YYYY-MM-DD HH:mm:ss', locale.value),
    sortable: true
  },
  {
    name: 'IP',
    label: t('account.History.IP'),
    align: 'center',
    field: 'IP'
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

const pagesNumber = computed(() => Math.ceil((userLoginHistory.value.length / pagination.value.rowsPerPage)))
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
