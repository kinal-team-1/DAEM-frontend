import { SeeProfile } from "./SeeProfile";
import { useAuthService } from "../../../../services/auth";

export function EditProfile() {
  const { user } = useAuthService();

  return <SeeProfile user={user} />;
}
