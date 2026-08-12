import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User, signOut } from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  deleteDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

export const googleProvider = new GoogleAuthProvider();
// Request required Google Workspace scopes for sheets and drive
googleProvider.addScope('https://www.googleapis.com/auth/spreadsheets');
googleProvider.addScope('https://www.googleapis.com/auth/drive.file');

// Cache the access token in-memory for security
let cachedAccessToken: string | null = null;
let isSigningIn = false;

export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        // If logged into Firebase but don't have token cached yet, we might need a re-auth or user interaction
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, googleProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to get Google Access Token from Auth Popup.');
    }
    cachedAccessToken = credential.accessToken;
    
    // Save/Sync user profile doc
    if (result.user) {
      await setDoc(doc(db, 'users', result.user.uid), {
        userId: result.user.uid,
        email: result.user.email || '',
        displayName: result.user.displayName || '',
        updatedAt: new Date().toISOString()
      }, { merge: true });
    }

    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error) {
    console.error('Sign-in error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = (): string | null => {
  return cachedAccessToken;
};

export const logoutUser = async () => {
  await signOut(auth);
  cachedAccessToken = null;
};

/* =========================================================================
   FIRESTORE SECURE DATA HELPERS (ENFORCING USER OWNERSHIP & RLS)
   ========================================================================= */

export interface SavedPlanRecord {
  id?: string;
  userId: string;
  title: string;
  subject: string;
  grade: string;
  bimester?: string;
  data: any;
  createdAt: string;
  updatedAt: string;
}

export interface TeacherSettingsRecord {
  userId: string;
  escola?: string;
  docente?: string;
  componente?: string;
  serie?: string;
  updatedAt: string;
}

/**
 * Saves or updates a lesson plan for the current authenticated teacher.
 */
export async function saveUserLessonPlan(plan: Omit<SavedPlanRecord, 'userId' | 'createdAt' | 'updatedAt'> & { id?: string }): Promise<string> {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error('Usuário não autenticado. Faça login para salvar seus planos de aula.');
  }

  const planId = plan.id || `${currentUser.uid}_${Date.now()}`;
  const planRef = doc(db, 'user_plans', planId);

  const payload: SavedPlanRecord = {
    userId: currentUser.uid,
    title: plan.title,
    subject: plan.subject,
    grade: plan.grade,
    bimester: plan.bimester || '',
    data: plan.data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  await setDoc(planRef, payload, { merge: true });
  return planId;
}

/**
 * Fetches all saved lesson plans belonging exclusively to the authenticated teacher.
 */
export async function getUserLessonPlans(): Promise<SavedPlanRecord[]> {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    return [];
  }

  const plansQuery = query(
    collection(db, 'user_plans'),
    where('userId', '==', currentUser.uid)
  );

  const snapshot = await getDocs(plansQuery);
  const plans: SavedPlanRecord[] = [];
  snapshot.forEach((docSnap) => {
    plans.push({ id: docSnap.id, ...docSnap.data() } as SavedPlanRecord);
  });

  return plans;
}

/**
 * Deletes a lesson plan ensuring it belongs to the authenticated teacher.
 */
export async function deleteUserLessonPlan(planId: string): Promise<void> {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error('Usuário não autenticado.');
  }

  const planRef = doc(db, 'user_plans', planId);
  const planSnap = await getDoc(planRef);

  if (!planSnap.exists()) {
    return;
  }

  if (planSnap.data()?.userId !== currentUser.uid) {
    throw new Error('Acesso negado: Você não tem permissão para excluir este plano.');
  }

  await deleteDoc(planRef);
}

/**
 * Saves teacher settings in Firestore under /user_settings/{uid}
 */
export async function saveTeacherSettings(settings: Omit<TeacherSettingsRecord, 'userId' | 'updatedAt'>): Promise<void> {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error('Usuário não autenticado.');
  }

  const settingsRef = doc(db, 'user_settings', currentUser.uid);
  await setDoc(settingsRef, {
    userId: currentUser.uid,
    ...settings,
    updatedAt: new Date().toISOString()
  }, { merge: true });
}

/**
 * Retrieves teacher settings from Firestore
 */
export async function getTeacherSettings(): Promise<TeacherSettingsRecord | null> {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    return null;
  }

  const settingsRef = doc(db, 'user_settings', currentUser.uid);
  const snap = await getDoc(settingsRef);

  if (snap.exists()) {
    return snap.data() as TeacherSettingsRecord;
  }
  return null;
}

