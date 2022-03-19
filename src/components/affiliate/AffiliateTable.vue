<template>
  <q-table flat class='table-box' :rows='directReferralsList' :columns='directReferralsListColumns' row-key='Name'
           color='#e1eeef' :no-data-label="$t('NoData')" :rows-per-page-options='[10, 15, 20, 25]' />
</template>

<script setup lang='ts'>
import { computed } from 'vue'
import { useStore } from 'src/store'
import { useI18n } from 'vue-i18n'
import { TimeStampToDate } from 'src/utils/utils'
import { Referral } from 'src/store/affiliate/types'

const store = useStore()
const referrals = computed(() => store.getters.getReferrals)
const directReferralsList = computed(() => referrals.value.filter((r) => !r.Kol))

// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n()

const directReferralsListColumns = computed(() => [
  {
    name: 'Name',
    label: t('affiliate.Direct.Name'),
    align: 'center',
    field: (row: Referral) => row.User.EmailAddress
  },
  {
    name: 'JoinDate',
    label: t('affiliate.Direct.Date'),
    align: 'center',
    field: (row: Referral) => TimeStampToDate(row.Invitation ? row.Invitation.CreateAt : row.User.CreateAt as number, 'YYYY-MM-DD HH:mm:ss')
  },
  {
    name: 'TBsPurchased',
    label: t('affiliate.Direct.Purchased'),
    align: 'center',
    field: (row: Referral) => row.USDAmount.toString() + ' TB'
  },
  {
    name: 'TotalPayment',
    label: t('affiliate.Direct.Total'),
    align: 'center',
    field: (row: Referral) => row.USDAmount.toString() + ' USDT'
  },
  {
    name: 'ReferralValue',
    label: t('affiliate.Direct.Referral'),
    align: 'center',
    field: (row: Referral) => row.SubUSDAmount.toString() + ' USDT'
  }
])
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
}

.table-box >>> th {
  font-size: 16px !important;
}
</style>
