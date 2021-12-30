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
          </q-btn
          >
        </div>
      </div>
    </q-form>

  </div>
</template>

<script setup lang='ts'>
import { computed, ref } from 'vue'
import { useStore } from 'src/store'
import { MutationTypes } from 'src/store/users/mutation-types'
import { UpdateUserRequest } from 'src/store/users/types'
import { RequestInput } from 'src/store/types'
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

const username = computed({
  get: () => store.getters.getUserUsername,
  set: (val) => {
    store.commit(MutationTypes.SetUsername, val)
  }
})
const gender = computed({
  get: () => store.getters.getUserGender,
  set: (val) => {
    store.commit(MutationTypes.SetGender, val)
  }
})
const firstname = computed({
  get: () => store.getters.getUserFirstName,
  set: (val) => {
    store.commit(MutationTypes.SetFirstName, val)
  }
})
const lastname = computed({
  get: () => store.getters.getUserLastName,
  set: (val) => {
    store.commit(MutationTypes.SetLastName, val)
  }
})
const street1 = computed({
  get: () => store.getters.getUserStreetAddress1,
  set: (val) => {
    store.commit(MutationTypes.SetStreetAddress1, val)
  }
})
const street2 = computed({
  get: () => store.getters.getUserStreetAddress2,
  set: (val) => {
    store.commit(MutationTypes.SetStreetAddress2, val)
  }
})
const city = computed({
  get: () => store.getters.getUserCity,
  set: (val) => {
    store.commit(MutationTypes.SetCity, val)
  }
})
const province = computed({
  get: () => store.getters.getUserProvince,
  set: (val) => {
    store.commit(MutationTypes.SetProvince, val)
  }
})
const country = computed({
  get: () => store.getters.getUserCountry,
  set: (val) => {
    store.commit(MutationTypes.SetCountry, val)
  }
})
const postalCode = computed({
  get: () => store.getters.getUserPostalCode,
  set: (val) => {
    store.commit(MutationTypes.SetPostalCode, val)
  }
})

const usernameRules = ref([
  (val: string) => isValidUsername(val) || t('input.UsernameWarning')
])

const userBasicInfo = computed(() => store.getters.getUserBasicInfo)

const updateUser = () => {
  const request: UpdateUserRequest = {
    Info: {
      Username: username.value,
      Gender: gender.value,
      Country: country.value,
      Province: province.value,
      City: city.value,
      FirstName: firstname.value,
      LastName: lastname.value,
      StreetAddress1: street1.value,
      StreetAddress2: street2.value,
      PostalCode: postalCode.value,
      EmailAddress: '',
      PhoneNumber: '',
      Password: '',
      UserID: userBasicInfo.value.UserID
    }
  }
  const updateUserRequest: RequestInput<UpdateUserRequest> = {
    requestInput: request,
    messages: {
      successMessage: t('notify.Update.Success'),
      failMessage: t('notify.Update.Fail')
    },
    loadingContent: t('notify.Update.Load')
  }
  store.dispatch(ActionTypes.UpdateUser, updateUserRequest)
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
}
</style>
