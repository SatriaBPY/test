import { APIRequestContext } from "@playwright/test";
import { API_USER_CONFIG } from "../config/api-endpoints";
import { saveJsonFile } from "../helper/utils";
import { ApiResponse, BaseUser, UserRole, AppUser } from "../helper/types";

export default class UserApi {
  constructor(private requestContext: APIRequestContext) {}

  private transformData(apiData: ApiResponse): BaseUser {
    return {
      id: apiData.id,
      username: apiData.username,
      email: apiData.email,
    };
  }

  async getUser(userID: number) {
    const res = await this.requestContext.get(
      `${API_USER_CONFIG.BASE_URL}${API_USER_CONFIG.ENDPOINTS.GET_BY_ID(userID)}`,
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch user with ID ${userID}`);
    }

    const apiData: ApiResponse = await res.json();
    return this.transformData(apiData);
  }

  async getUsersWithRole(
    userRole: Record<UserRole, number>,
  ): Promise<Record<UserRole, AppUser>> {
    const users: Partial<Record<UserRole, AppUser>> = {};

    for (const [role, userID] of Object.entries(userRole)) {
      const baseUser = await this.getUser(userID);
      const appUser: AppUser = {
        ...baseUser,
        role: role as UserRole,
      };
      users[role as UserRole] = appUser;
    }

    return users as Record<UserRole, AppUser>;
  }

  async saveUsersToFile(userRoles: Record<UserRole, number>) {
    const users = await this.getUsersWithRole(userRoles);

    await saveJsonFile(users, "./src/data/users.json");

    return users;
  }

  async injectToEnv(userRole: Record<UserRole, AppUser>) {
    const admin = userRole.admin;

    process.env.ADMIN_EMAIL = admin.email;
    process.env.ADMIN_PASSWORD = admin.username;

    const user = userRole.user;

    process.env.USER_EMAIL = user.email;
    process.env.USER_PASSWORD = user.username;
  }
}
