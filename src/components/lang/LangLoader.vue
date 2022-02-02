<script setup lang='ts'>
import { onMounted } from 'vue'
import { useStore } from 'src/store'
import { ActionTypes } from 'src/store/lang/action-types'
import { ModuleKey, Type as NotificationType } from 'src/store/notifications/const'
import { useI18n } from 'vue-i18n'

const store = useStore()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

onMounted(() => {
  store.dispatch(ActionTypes.GetAppLangInfos, {
    Message: {
      ModuleKey: ModuleKey.ModuleLangLoader,
      Error: {
        Title: t('MSG_GET_APP_LANG_INFOS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
})

</script>
