export interface FirebaseUser {
  apiKey?: string;
  appName?: string;
  createdAt?: string;
  displayName: string | null;
  email: string | null;
  emailVerified: boolean;
  isAnonymous: boolean;
  lastLoginAt?: string;
  phoneNumber: string | null;
  photoURL: string | null;
  uid: string;
}

export interface User {
  id: string;

  uid: string;

  email?: string;

  userName?: string;

  avatar: string;

  gender?: string;

  weight?: number;

  height?: number;

  age?: number;

  activityLevel?: string;

  created: Date;

  modified: Date;

  // language?: Language;

  // recipes: UserRecipe[];
}
