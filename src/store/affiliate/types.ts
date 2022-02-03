import { ReqMessage } from '../notifications/types'

export interface GetDirectInvitationsRequest {
  Message: ReqMessage
}

export interface InvitationSummary {
  Units: number
  Amount: number
}

export interface Invitee {
  UserID: string
  Username: string
  Avatar: string
  EmailAddress: string
  Kol: boolean
  Summarys: Map<string, InvitationSummary>
  InvitedCount: number
  MySummarys: Map<string, InvitationSummary>
  JoinDate: number
}

export interface Invitees {
  Invitees: Array<Invitee>
}

export interface GetDirectInvitationsResponse {
  Infos: Map<string, Invitees>
  MySelf: Invitee
}

export interface Invitation {
  Username: string
  UserID: string
  EmailAddress: string
  Label: string,
  children: Array<Invitation>
  Kol: boolean
  Summarys: Map<string, InvitationSummary>
  InvitedCount: number,
  MySummarys: Map<string, InvitationSummary>
  JoinDate: number
}

export enum AffiliateURLPath {
  GET_DIRECT_INVITATIONS = '/cloud-hashing-apis-v2/v1/get/my/direct/invitations'
}
