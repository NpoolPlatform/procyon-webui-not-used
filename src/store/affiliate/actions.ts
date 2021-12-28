import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { ActionTypes } from './action-types'
import { MutationTypes, MutationTypes as goodsMutation } from './mutation-types'
import { AffiliateMutations } from './mutations'
import { AffiliateState } from './state'
import { post } from 'src/boot/axios'
import { GetDirectInvitationsRequest, GetDirectInvitationsResponse, AffiliateURLPath, Invitation } from './types'
import { RequestInput } from 'src/store/types'
import { MutationTypes as notifyMutation } from 'src/store/notify/mutation-types'
import { RequestMessageToNotifyMessage } from 'src/utils/utils'

// use public api
interface AffiliateActions {
  [ActionTypes.GetDirectInvitationList] ({
    commit
  }: AugmentedActionContext<AffiliateState,
    RootState,
    AffiliateMutations<AffiliateState>>, payload: RequestInput<GetDirectInvitationsRequest>): void
}

const actions: ActionTree<AffiliateState, RootState> = {
  [ActionTypes.GetDirectInvitationList] ({ commit }, payload: RequestInput<GetDirectInvitationsRequest>) {
    commit(notifyMutation.SetInnerLoading, true)
    post<GetDirectInvitationsRequest, GetDirectInvitationsResponse>(AffiliateURLPath.GET_DIRECT_INVITATIONS, payload.requestInput)
      .then((resp: GetDirectInvitationsResponse) => {
        const userid = payload.requestInput.InviterID
        const father: Invitation = {
          UserID: userid,
          Username: payload.requestInput.Username,
          EmailAddress: payload.requestInput.EmailAddress,
          Label: '',
          Children: []
        }
        father.UserID = userid
        const lists = resp.Infos.get(userid).Invitees
        father.Label = '01(' + lists.length.toString() + ')'
        let index = 1
        lists.forEach(list => {
          if (list.UserID === userid) {
            return
          }

          const childrenInvitation: Invitation = {
            EmailAddress: list.EmailAddress,
            Username: list.Username,
            UserID: list.UserID,
            Label: '02' + index.toString(),
            Children: []
          }
          father.Children.push(childrenInvitation)
          index++
        })
        const invitationList: Array<Invitation> = []
        invitationList.push(father)
        commit(MutationTypes.SetInvitationList, invitationList)
        commit(notifyMutation.SetInnerLoading, false)
      })
      .catch((err: Error) => {
        commit(goodsMutation.SetInvitationList, [])
        commit(notifyMutation.PushMessage, RequestMessageToNotifyMessage(payload.messages.failMessage, err.message, 'negative'))
        commit(notifyMutation.SetInnerLoading, false)
      })
  }
}

export { actions, AffiliateActions }
