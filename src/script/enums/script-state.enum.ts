export enum EScriptState {
  AWAITING_ANALYSIS = 'awaiting_analysis',
  IN_ANALYSIS = 'in_analysis',
  AWAITING_REVIEW = 'awaiting_review',
  IN_REVIEW = 'in_review',
  AWAITING_APPROVAL = 'awaiting_approval',
  IN_APPROVAL = 'in_approval',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  ERROR = 'error',
}
