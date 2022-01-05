<template>
  <q-table flat class='table-box' :rows='directReferralsList' :columns='directReferralsListColumns' row-key='Name'
           color='#e1eeef' :no-data-label="$t('NoData')" />
</template>

<script setup lang='ts'>
import { computed } from 'vue'
import { useStore } from 'src/store'
import { Invitation, InvitationSummary } from 'src/store/affiliate/types'
import { useI18n } from 'vue-i18n'
import { TimeStampToDate } from 'src/utils/utils'

const store = useStore()
const invitationList = computed(() => store.getters.getInvitationList)
const directReferralsList = computed(() => {
  if (invitationList.value.length > 0) {
    return invitationList.value[0].children.filter((invitee: Invitation) => {
      return !invitee.Kol
    })
  }
  return invitationList.value
})

const totalUnits = (summarys: Map<string, InvitationSummary>) => {
  let total = 0
  for (const [, summary] of summarys) {
    total += summary.Units
  }
  return total
}

const totalAmount = (summarys: Map<string, InvitationSummary>) => {
  let total = 0
  for (const [, summary] of summarys) {
    total += summary.Amount
  }
  return total
}

// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n()

const directReferralsListColumns = [
  {
    name: 'Name',
    label: t('affiliate.Direct.Name'),
    align: 'center',
    field: 'Username'
  },
  {
    name: 'JoinDate',
    label: t('affiliate.Direct.Date'),
    align: 'center',
    field: (row: Invitation) => TimeStampToDate(row.JoinDate, 'YYYY-MM-DD HH:mm:ss')
  },
  {
    name: 'TBsPurchased',
    label: t('affiliate.Direct.Purchased'),
    align: 'center',
    field: (row: Invitation) => totalUnits(row.MySummarys).toString() + ' TB'
  },
  {
    name: 'TotalPayment',
    label: t('affiliate.Direct.Total'),
    align: 'center',
    field: (row: Invitation) => totalAmount(row.MySummarys).toString() + ' USDT'
  },
  {
    name: 'ReferralValue',
    label: t('affiliate.Direct.Referral'),
    align: 'center',
    field: (row: Invitation) => totalAmount(row.Summarys).toString() + ' USDT'
  }
]
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
