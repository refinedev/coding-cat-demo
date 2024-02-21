import { AccessControlProvider } from "@refinedev/core";

/**
 * Check out the Access Control Provider documentation for detailed information
 * https://refine.dev/docs/api-reference/core/providers/accessControl-provider
 **/
export const accessControlProvider: AccessControlProvider = {
  can: async ({ resource, action, params }) => {
    console.log("can", {
      resource,
      action,
      params,
    });

    // if (action === "edit") {
    //   return { can: false };
    // }

    return { can: true };
  },
  options: {
    buttons: {
      enableAccessControl: true,
      hideIfUnauthorized: false,
    },
  },
};
