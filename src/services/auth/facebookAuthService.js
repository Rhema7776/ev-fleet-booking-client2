let facebookSDKPromise = null;

export const loadFacebookSDK = () => {

    if (facebookSDKPromise) {
        return facebookSDKPromise;
    }

    facebookSDKPromise = new Promise((resolve, reject) => {

        const initializeFacebook = () => {

            if (!window.FB) {

                reject(
                    new Error(
                        "Facebook SDK object is unavailable."
                    )
                );

                return;
            }

            // Prevent FB.init() from running more than once
            if (window.__facebookSDKInitialized) {

                console.log(
                    "FACEBOOK SDK ALREADY INITIALIZED"
                );
                resolve(window.FB);
                return;
            }

            console.log(
                "INITIALIZING FACEBOOK SDK..."
            );

            window.FB.init({

                appId:
                    import.meta.env
                        .VITE_FACEBOOK_APP_ID,

                cookie: true,
                xfbml: false,

                version: "v26.0",

            });

            window.__facebookSDKInitialized =
                true;

            console.log(
                "FACEBOOK SDK INITIALIZED"
            );

            resolve(window.FB);
        };


        // ---------------------------------------------------------
        // Facebook SDK object already exists
        // ---------------------------------------------------------

        if (window.FB) {

            initializeFacebook();

            return;
        }


        // ---------------------------------------------------------
        // Start loading Facebook SDK
        // ---------------------------------------------------------

        console.log(
            "LOADING FACEBOOK SDK..."
        );

        window.fbAsyncInit =
            initializeFacebook;


        const existingScript =
            document.getElementById(
                "facebook-jssdk"
            );


        if (existingScript) {

            console.log(
                "FACEBOOK SCRIPT ALREADY EXISTS"
            );

            return;
        }


        const script =
            document.createElement("script");

        script.id =
            "facebook-jssdk";

        script.src =
            "https://connect.facebook.net/en_US/sdk.js";

        script.async = true;

        script.defer = true;

        script.crossOrigin =
            "anonymous";


        script.onload = () => {

            console.log(
                "FACEBOOK SDK SCRIPT ONLOAD"
            );

            if (window.FB) {

                initializeFacebook();

            } else {

                reject(
                    new Error(
                        "Facebook SDK loaded but FB object is unavailable."
                    )
                );

            }

        };


        script.onerror = () => {

            facebookSDKPromise = null;

            reject(
                new Error(
                    "Failed to load Facebook SDK."
                )
            );

        };


        document.body.appendChild(script);

    });


    return facebookSDKPromise;
};