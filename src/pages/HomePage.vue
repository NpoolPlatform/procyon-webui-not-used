<template>
  <q-page>
    <div id="main">
      <div class="content">
        <div class="content-item1 content-title">
          <div class="title-1">
            {{ $t('homepage.Content1.ContentItem1.Title') }}
          </div>
          <div class="title-2">
            {{ $t('homepage.Content1.ContentItem1.Subtitle') }}
          </div>
          <q-btn
            v-if="!logined"
            @click="$router.push('/register')"
            class="common-button register-btn"
            >{{ $t('button.Register') }}</q-btn
          >
        </div>

        <div class="content-item2">
          <div class="section-part-title">
            {{ $t('homepage.Content1.ContentItem2.Title') }}
          </div>

          <div class="product">
            <PromotionProduct />
          </div>
        </div>
      </div>

      <div class="content">
        <h2 class="section-part-title">
          {{ $t('homepage.Why.Title') }}
        </h2>

        <div class="columns-2">
          <div class="column-2">
            <p>
              {{ $t('homepage.Why.Content1') }}
              <strong>{{ $t('homepage.Why.Content2') }}</strong
              >{{ $t('homepage.Why.Content3')
              }}<strong>{{ $t('homepage.Why.Content4') }}</strong
              >{{ $t('homepage.Why.Content4Comma')
              }}{{ $t('homepage.Why.Content5')
              }}<strong>{{ $t('homepage.Why.Content55H') }}</strong
              >{{ $t('homepage.Why.Content55') }}
            </p>
          </div>

          <div class="column-2">
            <p>
              {{ $t('homepage.Why.Content6')
              }}<strong>{{ $t('homepage.Why.Content7') }}</strong
              >{{ $t('homepage.Why.Content8')
              }}<strong>{{ $t('homepage.Why.Content9') }}</strong
              >{{ $t('homepage.Why.Content9Comma') }}
            </p>
          </div>
        </div>
      </div>

      <div class="feature">
        <div class="content">
          <div class="feature-content">
            <div class="feature-content-item">
              <q-img :src="imgVCBacking" class="feature-item-img"></q-img>
              <div class="feature-item-title">
                {{ $t('homepage.Feature.VCBacking') }}
              </div>
              <p style="text-align: left">
                {{ $t('homepage.Feature.VCBackingContent') }}
              </p>
            </div>

            <div class="feature-content-item">
              <q-img :src="imgTopTeam" class="feature-item-img"></q-img>
              <div class="feature-item-title">
                {{ $t('homepage.Feature.TopTeam') }}
              </div>
              <p style="text-align: left">
                {{ $t('homepage.Feature.TopTeamContent') }}
              </p>
            </div>

            <div class="feature-content-item">
              <q-img :src="imgTechnology" class="feature-item-img"></q-img>
              <div class="feature-item-title">
                {{ $t('homepage.Feature.Technology') }}
              </div>
              <p style="text-align: left">
                {{ $t('homepage.Feature.TechnologyContent') }}
              </p>
            </div>
          </div>
        </div>

        <div class="hr"></div>
      </div>

      <div class="content">
        <div class="columns-1">
          <h2 class="section-part-title">
            {{ $t('homepage.What.Title') }}
          </h2>
          <p>
            {{ $t('homepage.What.Content1') }}
            <strong>{{ $t('homepage.What.Content2') }}</strong
            >{{ $t('homepage.What.Content2Comma')
            }}<strong>{{ $t('homepage.What.Content22H') }}</strong
            >{{ $t('homepage.What.Content22') }}
          </p>
          <p>{{ $t('homepage.What.Content3') }}</p>
          <ul>
            <li>1. {{ $t('homepage.What.Content4') }}</li>
            <li>2. {{ $t('homepage.What.Content5') }}</li>
          </ul>
          <p>
            {{ $t('homepage.What.Content6') }}
            <strong>{{ $t('homepage.What.Content7') }}</strong
            >{{ $t('homepage.What.Content7Comma')
            }}{{ $t('homepage.What.Content8')
            }}<strong>{{ $t('homepage.What.Content88') }}</strong
            >{{ $t('homepage.What.Content88Comma') }}
          </p>

          <p>
            {{ $t('homepage.What.Content14') }}
            <strong>{{ $t('homepage.What.Content15') }}</strong
            >{{ $t('homepage.What.Content15Comma')
            }}{{ $t('homepage.What.Content16') }}
          </p>

          <p>
            {{ $t('homepage.What.Content9') }}
            <strong>{{ $t('homepage.What.Content10') }}</strong
            >{{ $t('homepage.What.Content10Comma')
            }}{{ $t('homepage.What.Content11') }}
          </p>

          <p>{{ $t('homepage.What.Content12') }}</p>

          <p>
            <em>{{ $t('homepage.What.Content13') }}</em>
          </p>
        </div>
      </div>

      <div class="hr"></div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import imgVCBacking from 'src/assets/icon-vc-backing.svg'
import imgTopTeam from 'src/assets/icon-team.svg'
import imgTechnology from 'src/assets/icon-technology.svg'

import { computed, defineAsyncComponent } from 'vue'
import { useStore } from 'src/store'

const PromotionProduct = defineAsyncComponent(
  () => import('src/components/product/PromotionProduct.vue')
)
const store = useStore()
const logined = computed(() => store.getters.getUserLogined)
</script>

<style scoped>
.content-title {
  position: relative;
  padding-bottom: 30px;
}

.content-title::after {
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
  height: 4px;
  width: 100%;
}

.content-title h1 {
  font-size: 40px;
}

.content-title h2 {
  color: #e4f4f0;
  font-size: 28px;
  font-weight: 300;
  margin: 12px auto 12px auto;
}

.title-1 {
  background: linear-gradient(to left, #54e280 0, #1ec498 50%);
  background-clip: border-box;
  filter: contrast(2);
  font-size: 40px;
  font-weight: 500;
  margin: 24px auto 24px auto;
  text-transform: uppercase;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: flex;
  align-items: center;
}

.title-2 {
  color: #e4f4f0;
  font-size: 28px;
  font-weight: 300;
  margin: 12px auto 12px auto;
}

.register-btn {
  width: 175px !important;
  background: linear-gradient(to bottom right, #ff964a 0, #ce5417 100%);
  border: 0;
  color: #e4f4f0;
  font-size: 18px !important;
}

.content-item2-title {
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

.content-item2-title::after {
  background: linear-gradient(
    to right,
    transparent 0,
    #e1eeef 10%,
    transparent 30%
  );
  display: block;
  content: '';
  position: absolute;
  left: -16px;
  bottom: -4px;
  height: 1px;
  width: 100%;
}

.product {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 0 96px 0;
}

.columns-2 {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.column-2 {
  margin: 24px 2.5%;
  max-width: 45%;
}

/*Feature Part*/
.feature {
  background: linear-gradient(to bottom right, #1f293a 0, #23292b 100%);
  box-shadow: 0px 0px 60px 15px #051319;
  margin: 96px 0;
  padding: 24px 0;
  position: relative;
  width: 100%;
}

.feature::before,
.feature::after {
  background: linear-gradient(to right, #e85f1a 0, #ffe91d 50%, #1ec498 100%);
  display: block;
  content: '';
  position: absolute;
  opacity: 0.5;
  height: 1px;
  width: 100%;
}

.feature::before {
  left: 0;
  top: 0;
}

.feature::after {
  left: 0;
  bottom: 0;
}

.feature-content {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.feature-content-item {
  margin: 24px;
  max-width: 360px;
  min-width: 320px;
  text-align: center;
}

.feature-item-img {
  margin: 0 8px 0 0;
  width: 168px;
  height: 168px;
}

.feature-item-title {
  font-size: 28px;
  font-weight: 100;
  margin: 16px 0;
  padding: 0 0 20px 0;
  position: relative;
  text-transform: uppercase;
}

.feature-item-title::after {
  background: linear-gradient(
    to right,
    transparent 0,
    #ffcc4a 50%,
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

.feature-content-item p {
  font-size: 18px;
  font-weight: 300;
  line-height: 36px;
  margin: 12px 0;
}
</style>
