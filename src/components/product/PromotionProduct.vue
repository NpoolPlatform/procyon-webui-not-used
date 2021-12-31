<template>
  <div class='product-card' v-for='(good, index) in myGoods' :key='index'>
    <div class='card-header'>
      <q-img :src='spacemeshImg' class='header-img'></q-img>
      <h3 class='header-title'>{{ good.CoinInfo.Name }}</h3>
    </div>

    <div class='product-price'>
      <span>{{ good.Price }}</span
      >USDT / TB
    </div>

    <div class='product-line'>
      <span class='line-label'>{{
          $t('product.DailyMiningRewardsLabel')
        }}</span>
      <span class='line-value'
      >*{{ $t('product.DailyMiningRewardsValue') }}</span
      >
    </div>

    <div class='product-line'>
      <span class='line-label'>{{ $t('product.ServicePeriodLabel') }}</span>
      <span class='line-value'
      >{{ good.DurationDays }} {{ $t('product.ServicePeriodValue') }}</span
      >
    </div>

    <div class='product-line'>
      <span class='line-label'>{{
          $t('product.TechnicalServiceFeeLabel')
        }}</span>
      <span class='line-value'>20%</span>
    </div>

    <div class='product-line'>
      <span class='line-label'>{{ $t('product.MaintenanceFeeLabel') }}</span>
      <span class='line-value'
      >* / {{ $t('product.MaintenanceFeeValue') }}</span
      >
    </div>

    <div class='product-line'>
      <span class='line-label'>{{ $t('product.OrderEffectiveLabel') }}</span>
      <span class='line-value'>*</span>
    </div>

    <div>
      <q-btn disable class='common-button product-btn'>{{
          $t('button.StartMining')
        }}
      </q-btn>
    </div>
  </div>
</template>

<script setup lang='ts'>
import spacemeshImg from 'src/assets/product-spacemesh.svg'
import { computed, onMounted } from 'vue'
import { useStore } from 'src/store'
import { ActionTypes as GoodActionTypes } from 'src/store/goods/action-types'
import { GetGoodDetailsRequest } from 'src/store/goods/types'
import { RequestInput } from 'src/store/types'
import { useI18n } from 'vue-i18n'

const store = useStore()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const getPromotionProduct = () => {
  const request: GetGoodDetailsRequest = {
    AppID: ''
  }

  const getGoodDetailsRequest: RequestInput<GetGoodDetailsRequest> = {
    requestInput: request,
    messages: {
      successMessage: t('notify.GetGoodDetails.Success'),
      failMessage: t('notify.GetGoodDetails.Fail')
    },
    loadingContent: ''
  }
  store.dispatch(GoodActionTypes.GetGoodDetails, getGoodDetailsRequest)
}

onMounted(() => {
  getPromotionProduct()
})

const myGoods = computed(() => store.getters.getGoodDetails)
</script>

<style scoped>
.product-card {
  background: linear-gradient(
    to bottom right,
    rgba(225, 238, 239, 0.2) 0,
    rgba(161, 208, 208, 0.2) 100%
  );
  box-shadow: 16px 16px 20px 0 #23292b;
  border-radius: 12px;
  color: #e1eeef;
  padding: 36px;
  margin: 24px;
  min-width: 320px;
  max-width: 360px;
  text-align: center;
  transition: all ease-in-out 0.5s;
}

.product-card:hover {
  background: linear-gradient(
    to bottom right,
    rgba(225, 238, 239, 0.4) 0,
    rgba(161, 208, 208, 0.4) 100%
  );
  transition: all ease-in-out 0.5s;
  box-shadow: 8px 8px 20px 0 #051319;
}

.card-header {
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 0 0 10px 0;
  position: relative;
  width: 100%;
}

.card-header::after {
  background: linear-gradient(
    to right,
    transparent 0,
    #e85f1a 30%,
    #ffe91d 50%,
    #1ec498 80%,
    transparent 100%
  );
  display: block;
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  height: 1px;
  width: 100%;
}

.header-img {
  margin: 0 8px 0 0;
  width: 16px;
  max-height: 32px;
}

.header-title {
  color: #e1eeef;
  font-size: 28px;
  font-weight: 200;
  margin: 0;
}

.product-price {
  color: #1ec498;
  filter: contrast(1.1) brightness(1.1);
  font-size: 18px;
  font-weight: 500;
  margin: 16px;
}

.q-card__section--vert {
  margin: 0;
}

.product-price span {
  color: #e1eeef;
  font-weight: 700;
  font-size: 200%;
  margin-right: 4px;
}

.product-line {
  border-bottom: 1px dashed #a1d0d0;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  padding: 8px 0;
}

.line-label {
  font-weight: 400;
}

.line-value {
  color: #e4f4f0;
  font-weight: 700;
}

.product-btn {
  font-size: 16px !important;
  margin: 24px 0 0 0 !important;
  width: 100%;
  border: 0px;
  background: none;
  color: #ff964a;
  border: 1px solid #ff964a;
}
</style>
