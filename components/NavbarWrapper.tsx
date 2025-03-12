// components/NavbarWrapper.tsx
import NavBar from "./navbar";
import { checkRole } from "@/utils/roles";

export default async function NavbarWrapper() {
  const isAdmin = await checkRole("admin");
  return <NavBar isAdmin={isAdmin} />;
}
