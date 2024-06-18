import { UserGetSession } from "@/http";
import { useQuery } from "@tanstack/react-query";

interface IUser {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
    is_onboarding_complete?: boolean;
    created_at: string;
    updated_at: string;
    __v: number;
}
function useUser() {
    const { data, ...rest } = useQuery({
        queryKey: ["auth-session"],
        queryFn: UserGetSession,
    });
    return { user: (data?.data || null) as IUser | null, ...rest };
}

export default useUser;
