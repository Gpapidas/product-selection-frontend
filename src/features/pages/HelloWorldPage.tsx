import {Container, Text, Loader} from "@mantine/core";
import {useHelloWorld} from "../helloWorld/services/helloWorldService.ts";
import {Layout} from "@/Layout.tsx";

export default function HelloWorldPage() {
    const {data, isLoading, error} = useHelloWorld();


    return <Layout mainContent={(
        <Container>
            <h1>Hello World Page</h1>
            {isLoading && <Loader/>}
            {error && <Text color="red">Error fetching data</Text>}
            {data && <Text>{data.message}</Text>}
        </Container>
    )}/>;
}
