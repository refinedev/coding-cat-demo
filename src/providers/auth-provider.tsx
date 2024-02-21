import { AuthProvider } from "@refinedev/core";

/**
 * Check out the Auth Provider documentation for detailed information
 * https://refine.dev/docs/api-reference/core/providers/auth-provider/
 **/
export const authProvider: AuthProvider = {
  login: async (params) => {
    console.log("login", params);

    localStorage.setItem("auth", params);

    return {
      success: true, // or false if the login is not successful
      redirectTo: "/",
    };
  },
  check: async (params) => {
    console.log("check", params);

    const auth = localStorage.getItem("auth");

    if (!auth) {
      return {
        authenticated: false,
        redirectTo: "/login",
      };
    }

    return {
      authenticated: true, // or false if the user is not authenticated
    };
  },
  logout: async (params) => {
    console.log("logout", params);

    localStorage.removeItem("auth");

    return {
      success: true, // or false if the logout is not successful
      redirectTo: "/login",
    };
  },
  getIdentity: async (params) => {
    console.log("getIdentity", params);

    // TODO: send request to the API to get identity

    return {
      name: "Alex",
      avatar:
        "https://lh3.googleusercontent.com/a-/ALV-UjVGDXqWHbQ43mNFvVEeFmCDew70GoW17vYp37RR3alal1g=s40-p",
    };
  },

  onError: async (params) => {
    console.log("onError", params);

    // TODO: do something with the error

    return {
      logout: true, // or false if you want to continue
      redirectTo: "/login", // or undefined if you want to continue
    };
  },
};
