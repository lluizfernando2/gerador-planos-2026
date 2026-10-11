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
  deleteDoc
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

export const googleProvider = new GoogleAuthProvider();

export const initAuth = (
  onAuthSuccess?: (user: User, token?: string | null) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      const token = await user.getIdToken().catch(() => null);
      if (onAuthSuccess) onAuthSuccess(user, token);
    } else {
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const getAccessToken = async (): Promise<string | null> => {
  const user = auth.currentUser;
  if (!user) return null;
  try {
    return await user.getIdToken();
  } catch (err) {
    console.error('Failed to get token:', err);
    return null;
  }
};

export const getGoogleAccessToken = (): string | null => {
  return null;
};

export const mapAuthError = (err: any): { message: string; code?: string } => {
  const code = String(err?.code || err?.message || '');
  if (code.includes('popup-blocked')) {
    return { code, message: 'A janela popup de login foi bloqueada pelo navegador. Permita popups para entrar.' };
  }
  if (code.includes('unauthorized-domain')) {
    return { code, message: 'O domínio do applet não está autorizado no console do Firebase.' };
  }
  if (code.includes('popup-closed-by-user')) {
    return { code, message: 'A janela de login foi fechada antes de concluir a autenticação.' };
  }
  return { code, message: 'Falha ao autenticar com o Google.' };
};

export const googleSignIn = async (): Promise<{ user: User; accessToken?: string | null } | null> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken || (await result.user.getIdToken().catch(() => null));
    if (result.user) {
      // Sync user profile doc
      await setDoc(doc(db, 'users', result.user.uid), {
        userId: result.user.uid,
        email: result.user.email || '',
        displayName: result.user.displayName || '',
        updatedAt: new Date().toISOString()
      }, { merge: true });
    }
    return { user: result.user, accessToken: token };
  } catch (error) {
    console.error('Sign-in error:', error);
    throw error;
  }
};

export const logoutUser = async () => {
  await signOut(auth);
};
export const logout = logoutUser;

/* =========================================================================
   FIRESTORE SECURE DATA HELPERS (user_plans, user_settings)
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
 * Saves or updates a lesson plan for the authenticated teacher.
 */
export async function saveUserLessonPlan(plan: Omit<SavedPlanRecord, 'userId' | 'createdAt' | 'updatedAt'> & { id?: string }): Promise<string> {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error('Usuário não autenticado. Faça login para salvar seus planos de aula.');
  }

  const planId = plan.id || `${currentUser.uid}_${Date.now()}`;
  const planRef = doc(db, 'user_plans', planId);
  const existingDoc = await getDoc(planRef);

  const now = new Date().toISOString();
  const createdAt = existingDoc.exists() ? (existingDoc.data()?.createdAt || now) : now;

  const payload: SavedPlanRecord = {
    userId: currentUser.uid,
    title: (plan.title || 'Plano de Ensino').slice(0, 200),
    subject: (plan.subject || 'Componente').slice(0, 100),
    grade: (plan.grade || 'Série/Ano').slice(0, 100),
    bimester: (plan.bimester || '1º Bimestre').slice(0, 100),
    data: plan.data || {},
    createdAt,
    updatedAt: now
  };

  await setDoc(planRef, payload);
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
    escola: settings.escola || '',
    docente: settings.docente || '',
    componente: settings.componente || '',
    serie: settings.serie || '',
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
