import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { SeeProfile } from "../../../client-module/pages/edit-profile/SeeProfile";
import { getUserById } from "../../../actions/GET/get-user-by-id";

export function ViewProfile() {
  const { userId } = useParams();

  const { data: [user] = [], isLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: getUserById,
  });

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="border-b-green-400 rounded-full size-[80px] border-vulcan-500 border-8 animate-spin" />
      </div>
    );
  }

  return <SeeProfile user={user} />;
}
