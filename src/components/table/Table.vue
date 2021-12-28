<template>
  <q-table
    flat
    class='table-box'
    :rows='tableRows'
    :columns='tableColumns'
    row-key='name'
    color='#e1eeef'
    :no-data-label="$t('NoData')"
  >
  </q-table>

  <div class='buttons'>
    <q-btn disabled class='common-button export-button'>
      {{ $t('button.Export') }}
    </q-btn>
    <q-btn disabled class='common-button purchase-button'>
      {{ $t('button.Purchase') }}
    </q-btn>
  </div>
</template>

<script setup lang='ts'>
import { defineProps, toRef, withDefaults } from 'vue'
import { TableColum } from 'src/utils/type'

interface Props {
  tableColumns: Array<TableColum<any>>
  tableRows: Array<any>
}

const props = withDefaults(defineProps<Props>(), {})

const tableColumns = toRef(props, 'tableColumns')
const tableRows = toRef(props, 'tableRows')
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

.buttons {
  display: flex;
  justify-content: space-between;
  margin: 0 24px 30px 24px;
}

.export-button {
  border: 1px solid #ff964a;
  color: #ff964a;;
  text-shadow: 1px 1px 1px #27424c;
}

.purchase-button {
  background: linear-gradient(to bottom right, #ff964a 0, #ce5417 100%);
  border: 0;
  color: #e4f4f0;
  text-shadow: 1px 1px 1px #ce5417;
}
</style>
