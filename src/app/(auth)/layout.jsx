import { AuthProvider } from "@/context/AuthContext";

export default function AuthLayout({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}
