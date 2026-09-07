export interface ChangePasswordPayload {
  password: string;   
  newPassword: string; 
}

export interface changePasswordResponse {
  success: boolean
  message: string
  data: Data
}

export interface Data {
  token: string
  tokenType: string
  expiresIn: string
}
