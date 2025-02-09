import {useNavigate} from "react-router-dom";
import {TextInput, PasswordInput, Button, Paper, Title, Text, Container, Stack} from "@mantine/core";
import {useForm} from "@mantine/form";
import { ROUTES } from "@/router";
import {useLogin} from "@/features/auth/services/authService.ts";

export const Login = () => {
    const navigate = useNavigate();
    const {mutate: login, isLoading, error} = useLogin();

    const form = useForm({
        initialValues: {
            email: "",
            password: "",
        },
        validate: {
            email: (value) => (value ? null : "Email is required"),
            password: (value) => (value ? null : "Password is required"),
        },
    });

    const onSubmit = (values: typeof form.values) => {
        login(values, {
            onSuccess: () => navigate(ROUTES.HELLO_WORLD),
        });
    };

    return (
        <Container size={420} my={40}>
            <Title ta="center">Welcome!</Title>
            <Text color="dimmed" size="sm" ta="center">
                Please enter your credentials to continue
            </Text>
            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <form onSubmit={form.onSubmit(onSubmit)}>
                    <Stack gap="sm">
                        <TextInput
                            label="Email"
                            placeholder="Enter your email"
                            data-testid="email-input"
                            {...form.getInputProps("email")}
                        />
                        <PasswordInput
                            label="Password"
                            placeholder="Enter your password"
                            data-testid="password-input"
                            {...form.getInputProps("password")}
                        />
                        {error && <Text color="red" data-testid="error-message">{error.message}</Text>}
                        <Button type="submit" fullWidth loading={isLoading} data-testid="login-button">
                            Login
                        </Button>
                    </Stack>
                </form>
            </Paper>
        </Container>
    );
};
