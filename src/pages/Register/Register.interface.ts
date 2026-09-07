export interface RegisterResponse {
  success: boolean
  message: "account created"|"user already exists."
  data: Data
 errors: "user already exists."

}

export interface Data {
  token: string
  tokenType: string
  expiresIn: string
  user: User
}

export interface User {
  _id: string
  name: string
  username: string
  email: string
  photo: string
  cover: string
}
