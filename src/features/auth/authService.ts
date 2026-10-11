import { User } from 'firebase/auth';
import { 
  googleSignIn, 
  logoutUser, 
  initAuth
} from '../../lib/firebase';

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
}

export class AuthService {
  private currentState: AuthState = {
    user: null,
    accessToken: null,
    isAuthenticated: false,
  };

  private listeners: Array<(state: AuthState) => void> = [];

  constructor() {
    initAuth(
      (user: User) => {
        this.currentState = {
          user,
          accessToken: null,
          isAuthenticated: true,
        };
        this.notifyListeners();
      },
      () => {
        this.currentState = {
          user: null,
          accessToken: null,
          isAuthenticated: false,
        };
        this.notifyListeners();
      }
    );
  }

  public getAuthState(): AuthState {
    return this.currentState;
  }

  public getCurrentUser(): User | null {
    return this.currentState.user;
  }

  public getAccessToken(): string | null {
    return this.currentState.accessToken;
  }

  public async loginWithGoogle(): Promise<{ user: User } | null> {
    const result = await googleSignIn();
    if (result && result.user) {
      this.currentState = {
        user: result.user,
        accessToken: null,
        isAuthenticated: true,
      };
      this.notifyListeners();
    }
    return result;
  }

  public async logout(): Promise<void> {
    await logoutUser();
    this.currentState = {
      user: null,
      accessToken: null,
      isAuthenticated: false,
    };
    this.notifyListeners();
  }

  public onAuthStateChanged(callback: (state: AuthState) => void): () => void {
    this.listeners.push(callback);
    callback(this.currentState);
    return () => {
      this.listeners = this.listeners.filter((cb) => cb !== callback);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach((callback) => callback(this.currentState));
  }
}

export const authService = new AuthService();
