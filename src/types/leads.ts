export interface Lead {
    id: number;
    name: string;
    location: string;
    isLocked: boolean;
    unlockCredits?: number;
    message?: string;
    timeStatus?: string;
    source?: string;
    score?: number;
    company?: string;
    companyTier?: number;
    jobDescription?: string;
    updatedTime?: string;
    groupName?: string;
    avatarColor: string;
  }