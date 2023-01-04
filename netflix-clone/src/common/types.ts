export type Position = {
    top: number;
    left: number;
  }

export type UserProfile = {
  id: string;
  imageUrl: string;
  name: string;
}

export type ProfilesContextType = {
  profiles: UserProfile[];
  selectedProfileId: string;
}

export type ActionType ={
  type: "edit"|"delete"|"add"|"current";
  payload: Partial<UserProfile>
} | {type: "load", payload: any}