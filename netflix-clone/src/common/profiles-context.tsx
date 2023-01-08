import { Action } from "@remix-run/router";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import profilesReducer from "../reducer/profilesReducer";
import { useAuth } from "./auth";
import { ActionType, ProfilesContextType, UserProfile } from "./types";

type StoredProfiles = Map<string, ProfilesContextType>;

const LOCAL_STORAGE_KEY = "profiles";

const ProfileContext = createContext<ProfilesContextType | null>(null);

const profileDispatchContext = createContext<React.Dispatch<ActionType> | null>(
  null
);

export default function ProfilesProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const { user } = useAuth();

  const userProfiles = findProfile(user?.email as string);

  const [state, dispatch] = useReducer(profilesReducer, userProfiles);

  useEffect(() => {
    if (user?.email) {
      if (state) {
        const storedProfiles = getProfiles();
        storedProfiles.set(user.email, state as ProfilesContextType);
        updatedProfiles(storedProfiles);
      } else {
        dispatch({ type: "load", payload: userProfiles });
      }
    }
  }, [user?.email, state]);

  return (
    <ProfileContext.Provider value={state}>
      <profileDispatchContext.Provider value={dispatch}>
        {children}
      </profileDispatchContext.Provider>
    </ProfileContext.Provider>
  );
}

function getProfiles(): StoredProfiles {
  return new Map(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? "[]"));
}

function findProfile(id: string) {
  const profiles = getProfiles();
  return id ? profiles.get(id) ?? null : null;
}

function updatedProfiles(profiles: StoredProfiles) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(Array.from(profiles)));
}

export const userProfilesContext = () => useContext(ProfileContext);
export const userProfilesDispatchContext = () =>
  useContext(profileDispatchContext) as React.Dispatch<ActionType>;
