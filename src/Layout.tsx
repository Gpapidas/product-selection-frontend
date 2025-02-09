import { ReactNode } from "react";
import { Container } from "@mantine/core";
import { Header } from "./components/Header.tsx";
import { useCurrentUser } from "@/features/auth/services/authService.ts";

type LayoutProps = {
    mainContent: ReactNode;
    hideUser?: boolean;
};

export const Layout = ({ mainContent, hideUser = false }: LayoutProps) => {
    // Fetch user **only if** hideUser is false
    const { data: user, isLoading } = useCurrentUser({ enabled: !hideUser });

    return (
        <div>
            <Header user={user} isLoading={isLoading} />
            <Container mt="md">{mainContent}</Container>
        </div>
    );
};
