<template>
  <div class='mining-summary'>
    <div class='mining-heading'>
      <img class='mining-icon' :src='spacemeshImg' />
      <h3 class='mining-title'>Spacemesh</h3>
    </div>

    <div class='top-line-summary'>
      <div class='top-line-item'>
        <span class='label'>{{ $t('dashboard.Column2.Earning') }}</span>
        <span class='value'>* SMH</span>
        <span class='sub-value'>(* USDT)</span>
      </div>

      <div class='top-line-item'>
        <span class='label'>{{ $t('dashboard.Column2.Last') }}</span>
        <span class='value'>* SMH</span>
        <span class='sub-value'>(* USDT)</span>
      </div>

      <div class='top-line-item'>
        <span class='label'>{{ $t('dashboard.Column2.Capacity') }}</span>
        <span class='value'>{{ totalCapacity }} TB</span>
      </div>
    </div>

    <div class='detailed-summary'>
      <div class='line'>
        <span class='label'>{{ $t('dashboard.Column2.DailyOutput') }}</span>
        <span class='value'>* SMH</span>
      </div>

      <div class='line'>
            <span class='label'>{{
                $t('dashboard.Column2.TechnicalServiceFee')
              }}</span>
        <span class='value'>* SMH (20%)</span>
      </div>

      <div class='line'>
        <span class='label'>{{ $t('dashboard.Column2.NetDailyOutput') }}</span>
        <span class='value'>* SMH</span>
      </div>

      <div class='line'>
            <span class='label'>{{
                $t('dashboard.Column2.TotalDaysMining')
              }}</span>
        <span class='value'>{{ durationDays }}{{ $t('dashboard.Day') }}</span>
      </div>

      <div class='line'>
        <span class='label'>{{ $t('dashboard.Column2.Hashrate') }}</span>
        <span class='value'>* MH/s</span>
      </div>

      <div class='line'>
            <span class='label'>{{
                $t('dashboard.Column2.NetworkDailyOutput')
              }}</span>
        <span class='value'>* SMH</span>
      </div>
    </div>

    <div class='buttons'>
      <q-btn disabled class='common-button export-button'>
        {{ $t('dashboard.Column2.Export') }}
      </q-btn>
      <q-btn disabled class='common-button purchase-button'>
        {{ $t('button.Purchase') }}
      </q-btn>
    </div>
  </div>
</template>

<script setup lang='ts'>
import spacemeshImg from 'src/assets/product-spacemesh.svg'
import { computed } from 'vue'
import { useStore } from 'src/store'

const store = useStore()

const totalCapacity = computed(() => store.getters.getTotalCapacity)
const durationDays = computed(() => store.getters.getDurationDays)
</script>

<style scoped>
.mining-summary {
  background: linear-gradient(
    to bottom right,
    rgba(225, 238, 239, 0.2) 0,
    rgba(161, 208, 208, 0.2) 100%
  );
  box-shadow: 16px 16px 20px 0 #23292b;
  border-radius: 12px;
  color: #e1eeef;
  padding: 24px;
  margin: 24px 24px 10px 24px;
}

.mining-heading {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.mining-icon {
  margin: 0 8px 0 0;
  max-width: 36px;
  max-height: 36px;
}

h3.mining-title {
  color: #e1eeef;
  font-size: 36px;
  font-weight: 700;
  margin: 0;
  text-transform: uppercase;
}

.top-line-summary {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 16px 0;
  position: relative;
}

.top-line-summary::after {
  background: linear-gradient(
    to right,
    transparent -10%,
    #e1eeef 50%,
    transparent 110%
  );
  display: block;
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  height: 1px;
  width: 100%;
}

.top-line-item {
  font-size: 24px;
  margin: 0 0 16px 0;
}

.top-line-item .label {
  font-weight: 400;
}

.top-line-item .value {
  font-weight: 700;
}

.top-line-item .sub-value {
  font-size: 16px;
}

.detailed-summary {
  font-size: 16px;
}

.detailed-summary .line {
  border-bottom: 1px dashed #a1d0d0;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  padding: 8px 0;
}

.detailed-summary .label {
  font-weight: 400;
}

.detailed-summary .value {
  font-weight: 500;
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin: 24px 12px 0 12px;
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
