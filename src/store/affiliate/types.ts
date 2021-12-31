export interface GetDirectInvitationsRequest {
  AppID: string
  InviterID: string
  Username: string
  EmailAddress: string
  Target?: string
}

export interface Invitee {
  UserID: string
  Username: string
  Avatar: string
  EmailAddress: string
}

export interface Invitees {
  Invitees: Array<Invitee>
}

export interface GetDirectInvitationsResponse {
  Infos: Map<string, Invitees>
}

export interface Invitation {
  Username: string
  UserID: string
  EmailAddress: string
  Label: string,
  children: Array<Invitation>
}

export enum AffiliateURLPath {
  GET_DIRECT_INVITATIONS = '/cloud-hashing-apis/v1/get/my/direct/invitations'
}
