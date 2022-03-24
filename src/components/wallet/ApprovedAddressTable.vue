<template>
  <div class='container'>
    <q-table
      flat
      :rows='accounts'
      class='table-box'
      :columns='accountTable'
      color='#e1eeef'
      :no-data-label='$t("NoData")'
      :hide-bottom='true'
      :rows-per-page-options='[accounts.length]'
    >
      <template #body='props'>
        <q-tr :props='props'>
          <q-td key='Blockchain' :props='props'>
            {{ store.getters.getCoinByID(props.row.Account.CoinTypeID).Name }}
          </q-td>
          <q-td key='Address' :props='props'>
            {{ props.row.Account.Address }}
          </q-td>
          <q-td key='Label' :props='props'>
            {{ props.row.Address.Labels?.join(',') }}
          </q-td>
          <q-td key='DateAdded' :props='props'>
            {{ TimeStampToDate(props.row.Address?.CreateAt, 'YYYY-MM-DD HH:mm', locale) }}
          </q-td>
          <q-td>
            <q-btn
              no-caps
              :label='$t("MSG_DELETE")'
              class='filled-button small-button'
              @click='onDeleteClick(props.row)'
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-btn class='common-button filled-button small-button' @click='onAddNewAddressClick'>
      {{ t('MSG_ADD_NEW_ADDRESS') }}
    </q-btn>
  </div>
</template>

<script setup lang='ts'>
import { computed, onMounted, ref, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from '../../store'
import { WithdrawAccount } from '../../store/accounts/types'
import { TimeStampToDate } from '../../utils/utils'
import { useRouter } from '../../router'
import { ActionTypes as AccountActionTypes } from '../../store/accounts/action-types'
import { MutationTypes as NotificationMutationTypes } from '../..//store/notifications/mutation-types'
import { notificationPop, notify } from '../..//store/notifications/helper'
import { ModuleKey, Type as NotificationType } from '../../store/notifications/const'
import { ActionTypes as CoinActionTypes } from '../../store/coins/action-types'
import { State } from '../../store/kycs/const'

// eslint-disable-next-line @typescript-eslint/unbound-method
const { t, locale } = useI18n({ useScope: 'global' })
const store = useStore()

const accounts = computed(() => store.getters.getWithdrawAccounts.filter((address: WithdrawAccount) => address.State === State.Verified))

const accountTable = computed(() => [
  {
    name: 'Blockchain',
    label: t('MSG_BLOCKCHAIN'),
    align: 'left',
    field: (row: WithdrawAccount) => store.getters.getCoinByID(row.Account.CoinTypeID).Name
  },
  {
    name: 'Address',
    label: t('MSG_ADDRESS'),
    align: 'center',
    field: (row: WithdrawAccount) => row.Account.Address
  },
  {
    name: 'Label',
    label: t('MSG_LABEL'),
    align: 'center',
    field: (row: WithdrawAccount) => row.Address.Labels?.join(',')
  },
  {
    name: 'DateAdded',
    label: t('MSG_DATE_ADDED'),
    align: 'center',
    field: (row: WithdrawAccount) => TimeStampToDate(row.Address?.CreateAt, 'YYYY-MM-DD HH:mm', locale.value)
  },
  {
    name: '',
    label: '',
    align: 'center',
    field: ''
  }
])

const router = useRouter()

const onAddNewAddressClick = () => {
  void router.push({ path: '/add/withdraw/address' })
}

type MyFunction = () => void
const unsubscribe = ref<MyFunction>()

onMounted(() => {
  unsubscribe.value = store.subscribe((mutation) => {
    if (mutation.type === NotificationMutationTypes.Push) {
      const notification = store.getters.peekNotification(ModuleKey.ModuleApplications)
      if (notification) {
        notify(notification)
        store.commit(NotificationMutationTypes.Pop, notificationPop(notification))
      }
    }
  })

  store.dispatch(CoinActionTypes.GetCoins, {
    Message: {
      ModuleKey: ModuleKey.ModuleApplications,
      Error: {
        Title: t('MSG_GET_COINS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  store.dispatch(AccountActionTypes.GetUserWithdrawAccountsByAppUser, {
    Message: {
      ModuleKey: ModuleKey.ModuleApplications,
      Error: {
        Title: t('MSG_GET_WITHDRAW_ADDRESSES_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
})

onUnmounted(() => {
  unsubscribe.value?.()
})

const onDeleteClick = (account: WithdrawAccount) => {
  store.dispatch(AccountActionTypes.DeleteWithdrawAddress, {
    ID: account.Address.ID,
    Message: {
      ModuleKey: ModuleKey.ModuleApplications,
      Error: {
        Title: t('MSG_DELETE_WITHDRAW_ADDRESS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
}

</script>

<style scoped>
.container {
  background: linear-gradient(
    to bottom right,
    rgba(225, 238, 239, 0.2) 0,
    rgba(161, 208, 208, 0.2) 100%
  );
  box-shadow: 16px 16px 20px 0 #23292b;
  border-radius: 12px;
  padding: 24px;
  margin: 24px;
}

.table-box {
  background: transparent;
  color: #e1eeef;
  margin-bottom: 16px;
  border-radius: 0px;
  border-bottom: 1px solid rgb(95, 99, 99);
}

.table-box >>> th {
  font-size: 16px !important;
}

.filled-button {
  background: linear-gradient(to bottom right, #ff964a 0, #ce5417 100%);
  border: 0;
  color: #e4f4f0;
  text-shadow: 1px 1px 1px #ce5417;
}

.small-button {
  font-size: 10px;
}
</style>
