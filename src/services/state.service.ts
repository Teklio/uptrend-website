import { api } from "@/lib/api";
import { StateOption } from "@/types/common.type";

export const listStates = () => api.get<StateOption[]>("/states");
