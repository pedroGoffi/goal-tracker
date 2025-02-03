import { User } from "@prisma/client";
import { PermissionDatabaseHandler } from "./prisma/PermissionsService";

async function checkPermission(user: User, action: string, resource: string): Promise<boolean> {
    try {
      // Query the permissions for the user
      const permission = await PermissionDatabaseHandler.findPermissions({
        where: {
          userId: user.id,
          action: action,
          resource: resource,
        },
      });
  
      // Return true if permission is found, otherwise return false
      return permission[0] ? true : false;
    } catch (error) {
      console.error("Error checking permission:", error);
      return false;
    }
  }