export {};

interface FacebookLoginResponse {
  authResponse?: {
    accessToken: string;
    userID: string;
  };
  status: string;
}

interface FacebookSDK {
  init: (config: { appId: string; cookie: boolean; xfbml: boolean; version: string }) => void;
  login: (
    callback: (response: FacebookLoginResponse) => void,
    options?: { scope: string }
  ) => void;
}

interface AppleAuthSignInResponse {
  authorization?: {
    id_token: string;
  };
  user?: {
    name?: {
      firstName?: string;
      lastName?: string;
    };
  };
}

interface AppleIDSDK {
  auth: {
    init: (config: {
      clientId: string;
      scope: string;
      redirectURI: string;
      usePopup: boolean;
    }) => void;
    signIn: () => Promise<AppleAuthSignInResponse>;
  };
}

declare global {
  interface Window {
    FB?: FacebookSDK;
    fbAsyncInit?: () => void;
    __facebookSDKInitialized?: boolean;
    AppleID?: AppleIDSDK;
    __appleSDKInitialized?: boolean;
  }
}
