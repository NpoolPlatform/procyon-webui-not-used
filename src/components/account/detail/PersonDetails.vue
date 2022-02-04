<template>
  <div class='details-box'>
    <div class='common-card-title'>{{ $t('account.Account.PersonDetail.Title') }}</div>
    <q-form @submit='updateUser'>
      <div class='detail-column'>
        <div class='input-style'>
          <q-item-label>{{
              $t('account.Account.PersonDetail.Username')
            }}
          </q-item-label>
          <q-input
            style='width: 90%; margin: 10px 20px 0 0'
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
            lazy-rules
            emit-value
            map-options
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
            style='width: 90%; margin: 10px 20px 0 0'
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
            style='width: 90%; margin: 10px 20px 0 0'
            outlined
            v-model='lastname'
            bg-color='blue-grey-1'
          ></q-input>
        </div>
      </div>

      <div class='common-card-title' style='margin: 50px 0 0 0'>
        {{ $t('account.Account.Address.Title') }}
      </div>

      <div class='detail-column'>
        <div class='input-style'>
          <q-item-label>{{
              $t('account.Account.Address.PostalCode')
            }}
          </q-item-label>
          <q-input
            style='width: 90%; margin: 10px 20px 0 0'
            outlined
            v-model='postalCode'
            bg-color='blue-grey-1'
          ></q-input>
        </div>

        <div class='input-style'>
          <q-item-label>{{
              $t('account.Account.Address.Province')
            }}
          </q-item-label>
          <q-input
            style='width: 90%; margin: 10px 20px 0 0'
            outlined
            v-model='province'
            bg-color='blue-grey-1'
          ></q-input>
        </div>
      </div>

      <div class='detail-column'>
        <div class='input-style'>
          <q-item-label>{{
              $t('account.Account.Address.StreetAddress1')
            }}
          </q-item-label>
          <q-input
            style='width: 90%; margin: 10px 20px 0 0'
            outlined
            v-model='street1'
            bg-color='blue-grey-1'
          ></q-input>
        </div>

        <div class='input-style'>
          <q-item-label>{{
              $t('account.Account.Address.StreetAddress2')
            }}
          </q-item-label>
          <q-input
            style='width: 90%; margin: 10px 20px 0 0'
            outlined
            v-model='street2'
            bg-color='blue-grey-1'
          ></q-input>
        </div>
      </div>

      <div class='detail-column'>
        <div class='input-style'>
          <q-item-label>{{
              $t('account.Account.Address.City')
            }}
          </q-item-label>
          <q-input
            style='width: 90%; margin: 10px 20px 0 0'
            outlined
            v-model='city'
            bg-color='blue-grey-1'
          ></q-input>
        </div>

        <div class='input-style'>
          <q-item-label>{{
              $t('account.Account.Address.Country')
            }}
          </q-item-label>
          <q-input
            style='width: 90%; margin: 10px 20px 0 0'
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
            class='common-button save-button'
            type='submit'
          >{{ $t('button.Save') }}
          </q-btn>
        </div>
      </div>
    </q-form>

  </div>
</template>

<script setup lang='ts'>
import { computed, ref } from 'vue'
import { useStore } from 'src/store'
import { MutationTypes } from 'src/store/users/mutation-types'
import { AppUserControl, UpdateUserExtraRequest } from 'src/store/users/types'
import { ActionTypes } from 'src/store/users/action-types'
import { useI18n } from 'vue-i18n'
import { isValidUsername } from 'src/utils/utils'

interface option {
  label: string
  value: string
}

// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })
const genderOptions: Array<option> = [
  {
    label: t('select.Gender.Male'),
    value: 'male'
  },
  {
    label: t('select.Gender.Female'),
    value: 'female'
  },
  {
    label: t('select.Gender.Other'),
    value: 'other'
  }
]

const store = useStore()

const userInfo = computed(() => store.getters.getUserInfo)

const username = computed({
  get: () => userInfo.value.Extra ? userInfo.value.Extra.Username : '',
  set: (val) => {
    store.commit(MutationTypes.SetUsername, val)
  }
})
const gender = computed({
  get: () => userInfo.value.Extra ? userInfo.value.Extra.Gender : '',
  set: (val) => {
    store.commit(MutationTypes.SetGender, val)
  }
})
const firstname = computed({
  get: () => userInfo.value.Extra ? userInfo.value.Extra.FirstName : '',
  set: (val) => {
    store.commit(MutationTypes.SetFirstName, val)
  }
})
const lastname = computed({
  get: () => userInfo.value.Extra ? userInfo.value.Extra.LastName : '',
  set: (val) => {
    store.commit(MutationTypes.SetLastName, val)
  }
})
const addressFields = computed({
  get: () => userInfo.value.Extra && userInfo.value.Extra.AddressFields ? userInfo.value.Extra.AddressFields : [],
  set: (val) => {
    store.commit(MutationTypes.SetAddressFields, val)
  }
})

const country = computed({
  get: () => addressFields.value.length > 0 ? addressFields.value[0] : '',
  set: (val) => {
    addressFields.value = [val, province.value, city.value, street1.value, street2.value]
  }
})
const province = computed({
  get: () => addressFields.value.length > 1 ? addressFields.value[1] : '',
  set: (val) => {
    addressFields.value = [country.value, val, city.value, street1.value, street2.value]
  }
})
const city = computed({
  get: () => addressFields.value.length > 2 ? addressFields.value[2] : '',
  set: (val) => {
    addressFields.value = [country.value, province.value, val, street1.value, street2.value]
  }
})
const street1 = computed({
  get: () => addressFields.value.length > 3 ? addressFields.value[3] : '',
  set: (val) => {
    addressFields.value = [country.value, province.value, city.value, val, street2.value]
  }
})
const street2 = computed({
  get: () => addressFields.value.length > 4 ? addressFields.value[4] : '',
  set: (val) => {
    addressFields.value = [country.value, province.value, city.value, street1.value, val]
  }
})

const postalCode = computed({
  get: () => userInfo.value.Extra ? userInfo.value.Extra.PostalCode : '',
  set: (val) => {
    store.commit(MutationTypes.SetPostalCode, val)
  }
})

const usernameRules = ref([
  (val: string) => isValidUsername(val) || t('input.UsernameWarning')
])

const updateUser = () => {
  const request: UpdateUserExtraRequest = {
    Info: userInfo.value.Extra as AppUserControl
  }
  store.dispatch(ActionTypes.UpdateUserExtra, request)
}
</script>

<style scoped>
.details-box {
  background: linear-gradient(
    to bottom right,
    rgba(225, 238, 239, 0.2) 0,
    rgba(161, 208, 208, 0.2) 100%
  );
  /* background-color: black; */
  box-shadow: 16px 16px 20px 0 #23292b;
  border-radius: 12px;
  color: #e1eeef;
  padding: 24px;
  margin: 24px;
  position: relative;
}

.detail-column {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 20px;
}

.input-style {
  width: 50%;
}

.save-button {
  background: linear-gradient(to bottom right, #ff964a 0, #ce5417 100%);
  border: 0;
  color: #e4f4f0;
  line-height: 22px;
  width: 100%;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
}
</style>
