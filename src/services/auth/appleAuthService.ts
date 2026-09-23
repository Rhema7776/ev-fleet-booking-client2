let appleSDKPromise: Promise<Window["AppleID"]> | null = null;

export const loadAppleSDK = (): Promise<Window["AppleID"]> => {
  if (appleSDKPromise) {
    return appleSDKPromise;
  }

  appleSDKPromise = new Promise((resolve, reject) => {
    const initializeApple = () => {
      if (!window.AppleID) {
        reject(new Error("Apple SDK object is unavailable."));
        return;
      }

      if (window.__appleSDKInitialized) {
        resolve(window.AppleID);
        return;
      }

      window.AppleID.auth.init({
        clientId: import.meta.env.VITE_APPLE_CLIENT_ID,
        scope: "name email",
        redirectURI: import.meta.env.VITE_APPLE_REDIRECT_URI,
        usePopup: true,
      });

      window.__appleSDKInitialized = true;

      resolve(window.AppleID);
    };

    if (window.AppleID) {
      initializeApple();
      return;
    }

    const existingScript = document.getElementById("apple-jssdk");

    if (existingScript) {
      existingScript.addEventListener("load", initializeApple);
      return;
    }

    const script = document.createElement("script");
    script.id = "apple-jssdk";
    script.src =
      "https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      if (window.AppleID) {
        initializeApple();
      } else {
        reject(new Error("Apple SDK loaded but AppleID object is unavailable."));
      }
    };

    script.onerror = () => {
      appleSDKPromise = null;
      reject(new Error("Failed to load Apple SDK."));
    };

    document.body.appendChild(script);
  });

  return appleSDKPromise;
};
