import { useNavigate } from "react-router-dom";
import { Menu, Button, Text, Group } from "@mantine/core";
import { useLogout } from "@/features/auth/services/authService.ts";
import { ROUTES } from "@/router.tsx";

type HeaderProps = {
    user?: { data: { email: string } }; // User prop (optional)
    isLoading: boolean;
};

export const Header = ({ user, isLoading }: HeaderProps) => {
    const navigate = useNavigate();
    const { mutate: logout, isLoading: isLoggingOut } = useLogout();

    const handleLogout = () => {
        logout(undefined, {
            onSuccess: () => navigate(ROUTES.LOGIN),
        });
    };

    return (
        <Group justify="space-between" px="md" py="sm" style={{ background: "#f8f9fa", borderBottom: "1px solid #ddd" }}>
            <Text size="lg" fw={700}>Product Selection App</Text>

            {!isLoading && user ? (
                <Menu>
                    <Menu.Target>
                        <Button variant="subtle">{user.data.email}</Button>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item color="red" onClick={handleLogout} disabled={isLoggingOut}>
                            Logout
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            ) : null}
        </Group>
    );
};
