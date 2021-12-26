export interface RequestMessages {
  successMessage: string
  failMessage: string
}

export interface RequestInput<T> {
  requestInput: T,
  messages: RequestMessages,
  loadingContent: string
}
