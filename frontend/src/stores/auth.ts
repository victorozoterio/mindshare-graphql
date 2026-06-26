import { create } from "zustand";
import { persist } from "zustand/middleware";
import { apolloClient } from "@/lib/graphql/apollo";
import type { User, RegisterInput } from "@/types";
import { REGISTER } from "@/lib/graphql/mutations/Register";

type RegisterMutationData = {
  register: {
    token: string;
    refreshToken: string;
    user: User;
  };
};

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  signup: (data: RegisterInput) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      signup: async (registerData: RegisterInput) => {
        try {
          const { data } = await apolloClient.mutate<
            RegisterMutationData,
            { data: RegisterInput }
          >({
            mutation: REGISTER,
            variables: {
              data: {
                name: registerData.name,
                email: registerData.email,
                password: registerData.password,
              },
            },
          });
          if (data?.register) {
            const { token, user } = data.register;
            set({
              user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
              },
              token,
              isAuthenticated: true,
            });
            return true;
          }
          return false;
        } catch (error) {
          console.log("Erro ao fazer o cadastro");
          throw error;
        }
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);
