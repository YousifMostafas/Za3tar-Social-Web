export interface LoginResponse {
  success: boolean;
  message: "Login successful" | "incorrect email or password";
  data: Data;
  errors: "incorrect email or password";
}

export interface ProfileResponse {
  message?: string;
  data: {
    user: User;
  };
}

export interface Data {
  token: string;
  tokenType: string;
  expiresIn: string;
  user: User;
}

export interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  dateOfBirth?: string;
  gender?: string;
  photo: string;
  cover: string;
  bookmarks?: any[];
  followers?: any[];
  following?: any[];
  createdAt?: string;
  followersCount?: number;
  followingCount?: number;
  bookmarksCount?: number;
  id?: string;
}