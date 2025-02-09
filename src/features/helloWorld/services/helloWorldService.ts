import HelloWorld from "../types/helloWorldType.ts";
import {useQuery} from "@tanstack/react-query";
import authAxios from "../../../utils/authUtils.ts";

class HelloWorldService {
    private backendUrl: string;

    constructor() {
        this.backendUrl = import.meta.env.VITE_API_BASE_URL;
    }

    async getMessage(): Promise<HelloWorld> {
        const res = await authAxios.get<HelloWorld>(`${this.backendUrl}/api/v1/general/hello-world/`, {
            headers: {skipAuth: "true"}
        });
        return res.data;
    }
}

export const helloWorldService = new HelloWorldService();


const useHelloWorld = () => {
    return useQuery<HelloWorld>({
        queryKey: ["hello-world"],
        queryFn: () => helloWorldService.getMessage(),
    });
};

export {useHelloWorld};
