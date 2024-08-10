export interface ILoginParams {
  username: string
  password: string | number
}
export interface UserInfoParams {
  userId:string
}
export interface SetUserInfo {
  userId: string | number,
  username: string, 
  avatar: string, 
  phone: string, 
  emil: string, 
  addess: string, 
  signature: string, 
}
export interface UpImages {
  file: FormData
}
export interface ILoginApi {
  login: (params: ILoginParams)=> Promise<any>,
  userInfo: (params: UserInfoParams)=> Promise<any>,
  setUserInfo: (params: SetUserInfo)=> Promise<any>,
  upImages: (params: UpImages)=> Promise<any>,
}
