export interface sign_Up_In_Response {
  idToken: string;
  email: string;
  displayName?: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

export interface updateProfileResponse {
  localId: string;
  email: string;
  displayName: string;
  photoUrl: string;
  passwordHash: string;
  providerUserInfo: [];
  idToken: string;
  refreshToken: string;
  expiresIn: string;
}

export interface getUserDataResponse {
  users: [
    {
      localId: string;
      email: string;
      emailVerified: boolean;
      displayName: string;
      providerUserInfo: [
        {
          providerId: string;
          displayName: string;
          photoUrl: string;
          federatedId: string;
          email: string;
          rawId: string;
          screenName: string;
        }
      ];
      photoUrl: string;
      passwordHash: string;
      passwordUpdatedAt: number;
      validSince: string;
      disabled: boolean;
      lastLoginAt: string;
      createdAt: string;
      customAuth: boolean;
    }
  ];
}
