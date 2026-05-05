/**
 * DIRECCIÓN DEL USUARIO
 */
export interface UserDirection {
  street?: string;
  city?: string;
  municipality?: string;
  zip_code?: string;
}

/**
 * INTERFAZ BASE DE USUARIO (Campos comunes)
 */
export interface UserBase {
  name: string;
  lastname: string;
  username: string;
  email: string;
  phone?: string;
  age?: number;
  role: 'admin' | 'user';
  active: boolean;
  direction?: UserDirection;
}

/**
 * RESPUESTA DEL USUARIO (Sin contraseñas)
 */
export interface UserResponse extends UserBase {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * RESPUESTA ESPECÍFICA DEL LOGIN
 */
export interface LoginResponse {
  token: string;
  user: UserResponse;
}

/**
 * PETICIÓN DE REGISTRO (POST /register)
 */
export interface RegisterRequest extends Omit<UserBase, 'active' | 'role'> {
  password: string;
  role?: 'admin' | 'user'; // Opcional al registrar
}

/**
 * PETICIÓN DE ACTUALIZACIÓN (PATCH /update)
 * Según tu middleware 'update', campos como username/email están prohibidos
 */
export interface UpdateUserRequest {
  name?: string;
  lastname?: string;
  phone?: string;
  age?: number;
  direction?: UserDirection;
  active?: boolean;
}

export interface PasswordReseteResponse {
  ok: boolean;
  type?: string;
  message: string;
}