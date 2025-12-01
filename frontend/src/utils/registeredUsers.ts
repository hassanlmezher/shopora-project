export interface RegisteredUser {
  email: string;
  password: string;
}

const USERS_STORAGE_KEY = "shopora-registered-users";

const canAccessLocalStorage = (): boolean =>
  typeof window !== "undefined" && typeof window.localStorage !== "undefined";

const parseUsers = (data: string | null): RegisteredUser[] => {
  if (!data) {
    return [];
  }

  try {
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch {
    // Ignore JSON parse errors and return an empty array.
  }

  return [];
};

export const loadRegisteredUsers = (): RegisteredUser[] => {
  if (!canAccessLocalStorage()) {
    return [];
  }

  return parseUsers(window.localStorage.getItem(USERS_STORAGE_KEY));
};

export const persistRegisteredUsers = (users: RegisteredUser[]): void => {
  if (!canAccessLocalStorage()) {
    return;
  }

  window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

export const findRegisteredUserByEmail = (email: string): RegisteredUser | undefined => {
  const normalizedEmail = email.trim().toLowerCase();
  if (!normalizedEmail) {
    return undefined;
  }

  return loadRegisteredUsers().find((user) => user.email.toLowerCase() === normalizedEmail);
};