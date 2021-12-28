<template>
  <DetailBox :title="$t('account.Account.PersonDetail.Title')">
    <div class='detail-column'>
      <div class='input-style'>
        <q-item-label>{{
            $t('account.Account.PersonDetail.Username')
          }}
        </q-item-label>
        <q-input
          class='common-input'
          outlined
          v-model='username'
          bg-color='blue-grey-1'
          ref='usernameRef'
          lazy-rules
          :rules='usernameRules'
        ></q-input>
      </div>

      <div class='input-style' style='align-items: flex-start'>
        <q-item-label>{{
            $t('account.Account.PersonDetail.Gender')
          }}
        </q-item-label>
        <q-select
          popup-content-style='background: #e1eeef; color: black;'
          style='width: 90%; margin: 10px 20px 0 0'
          bg-color='blue-grey-1'
          outlined
          v-model='gender'
          :options='genderOptions'
        />
      </div>
    </div>

    <div class='detail-column'>
      <div class='input-style'>
        <q-item-label>{{
            $t('account.Account.PersonDetail.FirstName')
          }}
        </q-item-label>
        <q-input
          class='common-input'
          outlined
          v-model='firstname'
          bg-color='blue-grey-1'
        ></q-input>
      </div>

      <div class='input-style'>
        <q-item-label>{{
            $t('account.Account.PersonDetail.LastName')
          }}
        </q-item-label>
        <q-input
          class='common-input'
          outlined
          v-model='lastname'
          bg-color='blue-grey-1'
        ></q-input>
      </div>
    </div>

    <div class='sub-title' style='margin: 50px 0 0 0'>
      {{ $t('account.Account.Address.Title2') }}
    </div>

    <div class='detail-column'>
      <div class='input-style'>
        <q-item-label>{{
            $t('Account.PersonalDetails.PostalCode')
          }}
        </q-item-label>
        <q-input
          class='common-input'
          outlined
          v-model='postalCode'
          bg-color='blue-grey-1'
        ></q-input>
      </div>

      <div class='input-style'>
        <q-item-label>{{
            $t('Account.PersonalDetails.Province')
          }}
        </q-item-label>
        <q-input
          class='common-input'
          outlined
          v-model='province'
          bg-color='blue-grey-1'
        ></q-input>
      </div>
    </div>

    <div class='detail-column'>
      <div class='input-style'>
        <q-item-label>{{
            $t('Account.PersonalDetails.StreetAddress1')
          }}
        </q-item-label>
        <q-input
          class='common-input'
          outlined
          v-model='street1'
          bg-color='blue-grey-1'
        ></q-input>
      </div>

      <div class='input-style'>
        <q-item-label>{{
            $t('Account.PersonalDetails.StreetAddress2')
          }}
        </q-item-label>
        <q-input
          class='common-input'
          outlined
          v-model='street2'
          bg-color='blue-grey-1'
        ></q-input>
      </div>
    </div>

    <div class='detail-column'>
      <div class='input-style'>
        <q-item-label>{{
            $t('Account.PersonalDetails.City')
          }}
        </q-item-label>
        <q-input
          class='common-input'
          outlined
          v-model='city'
          bg-color='blue-grey-1'
        ></q-input>
      </div>

      <div class='input-style'>
        <q-item-label>{{
            $t('Account.PersonalDetails.Country')
          }}
        </q-item-label>
        <q-input
          class='common-input'
          outlined
          v-model='country'
          bg-color='blue-grey-1'
        ></q-input>
      </div>
    </div>

    <div class='detail-column' style='margin-top: 50px'>
      <div class='input-style'>
        <q-btn
          style='width: 90%; margin: 10px 20px 0 0'
          class='account-btn'
          @click='onSaveChange'
        >{{ $t('Account.PersonalDetails.Save') }}
        </q-btn
        >
      </div>
    </div>
  </DetailBox>
</template>

<script setup lang='ts'>
import { defineAsyncComponent } from 'vue'

const DetailBox = defineAsyncComponent(() => import('src/components/box/Box.vue'))
</script>

<style scoped>
</style>
