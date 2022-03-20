<template>
  <div class='product-card' v-for='(good, index) in myGoods' :key='index'>
    <div class='card-header'>
      <q-img :src='spacemeshImg' class='header-img'></q-img>
      <h3 class='header-title'>{{ good.Good.Good.Title.length > 0 ? good.Good.Good.Title : good.Main?.Name }}</h3>
    </div>

    <div class='product-price'>
      <span>{{ goodPrice(good) }}</span
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
      >{{ good.Good.Good.DurationDays }} {{ $t('product.ServicePeriodValue') }}</span
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
      <q-btn class='common-button product-btn' @click='onStartMiningClick(good)'>{{
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
import { Good } from 'src/store/goods/types'
import { goodPrice } from 'src/store/goods/utils'
import { useRouter } from 'src/router'
import { ModuleKey, Type as NotificationType } from 'src/store/notifications/const'
import { useI18n } from 'vue-i18n'

const store = useStore()
const router = useRouter()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const getPromotionProduct = () => {
  store.dispatch(GoodActionTypes.GetGoods, {
    Message: {
      ModuleKey: ModuleKey.ModuleApplications,
      Error: {
        Title: t('MSG_GET_GOODS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  store.dispatch(GoodActionTypes.GetRecommendGoods, {
    Message: {
      ModuleKey: ModuleKey.ModuleApplications,
      Error: {
        Title: t('MSG_GET_RECOMMENDS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  store.dispatch(GoodActionTypes.GetPromotions, {
    Message: {
      ModuleKey: ModuleKey.ModuleApplications,
      Error: {
        Title: t('MSG_GET_PROMOTIONS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  store.dispatch(GoodActionTypes.GetAppGoods, {
    Message: {
      ModuleKey: ModuleKey.ModuleApplications,
      Error: {
        Title: t('MSG_GET_GOODS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
}

onMounted(() => {
  getPromotionProduct()
})

const myGoods = computed(() => {
  const goods = [] as Array<Good>
  if (store.getters.getRecommends.length > 0) {
    for (let i = 0; i < 3 && i < store.getters.getRecommends.length; i++) {
      goods.push(store.getters.getRecommends[i].Good)
    }
    if (goods.length >= 3) {
      return goods
    }
  }

  for (let i = goods.length; i < 3 && i < store.getters.getGoods.length + goods.length; i++) {
    let found = false
    for (let j = 0; j < goods.length; j++) {
      if (goods[j].Good.Good.ID === store.getters.getGoods[i - goods.length].Good.Good.ID) {
        found = true
        break
      }
    }
    if (found) {
      continue
    }
    goods.push(store.getters.getGoods[i - goods.length])
  }

  return goods
})

const onStartMiningClick = (good: Good) => {
  void router.push({
    path: '/purchase',
    query: {
      goodId: good.Good.Good.ID
    }
  })
}
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

.disabled {
  filter: saturate(0);
}
</style>
