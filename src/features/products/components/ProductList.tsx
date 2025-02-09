import {useState, useEffect} from "react";
import {Table, Checkbox, TextInput, Loader, Center, ScrollArea, Button, Group} from "@mantine/core";
import {IconSearch, IconPlus, IconMinus, IconReload, IconArrowUp, IconArrowDown} from "@tabler/icons-react";
import {useProducts, useToggleProductSelection} from "@/features/products/services/productService.ts";
import {useMediaQuery} from "@mantine/hooks";

export const ProductList = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [delayedSearchQuery, setDelayedSearchQuery] = useState(""); // This will update after 300ms
    const [ordering, setOrdering] = useState<string | undefined>(undefined);
    const [resetSearch, setResetSearch] = useState(false);
    const [derivedSearchPlaceholder, setDerivedSearchPlaceholder] = useState<string | undefined>(undefined);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDelayedSearchQuery(searchQuery);
        }, 300);

        return () => clearTimeout(handler);
    }, [searchQuery]);

    const {data: products, isLoading, error} = useProducts(delayedSearchQuery, ordering, resetSearch);
    const {mutate: toggleSelection} = useToggleProductSelection();

    const isSmallScreen = useMediaQuery("(max-width: 768px)");

    const handleSort = (field: string) => {
        setOrdering(prevOrdering => (prevOrdering === field ? `-${field}` : field));
    };

    const handleSelectionToggle = (productId: number) => {
        toggleSelection(productId);
    };

    const handleResetSearch = () => {
        setSearchQuery("");
        setResetSearch(true);
    };

    useEffect(() => {
        if (products.length > 0 && products[0].derivedFromSavedSearch) {
            setDerivedSearchPlaceholder(products[0].derivedFromSavedSearch);
        } else {
            setDerivedSearchPlaceholder(undefined);
        }
    }, [products]);

    if (isLoading) return <Center><Loader/></Center>;
    if (error) return <Center>Error loading products</Center>;

    const renderSortIndicator = (field: string) => {
        if (ordering === field) return <IconArrowUp size={14}/>;
        if (ordering === `-${field}`) return <IconArrowDown size={14}/>;
        return null;
    };

    return (
        <>
            {/* Search and Reset */}
            <Group mb="md" justify="space-between">
                <TextInput
                    data-testid="search-input"
                    leftSection={<IconSearch size={16}/>}
                    placeholder={derivedSearchPlaceholder || "Search products..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{width: "90%"}}
                />
                <Button
                    onClick={handleResetSearch}
                    variant="outline"
                    data-testid="reset-search-button"
                    style={{width: "7%"}}
                >
                    <IconReload/>
                </Button>
            </Group>

            <ScrollArea>
                <Table striped highlightOnHover withColumnBorders>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th className="productsTableHead">ID</Table.Th>
                            <Table.Th className="productsTableHead" onClick={() => handleSort("name")}>
                                Name {renderSortIndicator("name")}
                            </Table.Th>

                            {!isSmallScreen || expanded ? (
                                <>
                                    <Table.Th className="productsTableHead" onClick={() => handleSort("description")}>
                                        Description {renderSortIndicator("description")}
                                    </Table.Th>
                                    <Table.Th className="productsTableHead" onClick={() => handleSort("price")}>
                                        Price {renderSortIndicator("price")}
                                    </Table.Th>
                                    <Table.Th className="productsTableHead" onClick={() => handleSort("stock")}>
                                        Stock {renderSortIndicator("stock")}
                                    </Table.Th>
                                </>
                            ) : null}

                            <Table.Th className="productsTableHead">Select</Table.Th>
                        </Table.Tr>
                    </Table.Thead>

                    <Table.Tbody>
                        {products.length === 0 ? (
                            <Table.Tr>
                                <Table.Td colSpan={6} align="center">No products found.</Table.Td>
                            </Table.Tr>
                        ) : (
                            products.map((product) => (
                                <Table.Tr key={product.id} data-testid={`product-row-${product.id}`}>
                                    <Table.Td>{product.id}</Table.Td>
                                    <Table.Td>{product.name}</Table.Td>

                                    {!isSmallScreen || expanded ? (
                                        <>
                                            <Table.Td>{product.description}</Table.Td>
                                            <Table.Td>${product.price}</Table.Td>
                                            <Table.Td>{product.stock}</Table.Td>
                                        </>
                                    ) : null}

                                    <Table.Td>
                                        <Checkbox
                                            checked={product.selected}
                                            onChange={() => handleSelectionToggle(product.id)}
                                            data-testid={`select-product-${product.id}`}
                                        />
                                    </Table.Td>
                                </Table.Tr>
                            ))
                        )}
                    </Table.Tbody>
                </Table>
            </ScrollArea>

            {isSmallScreen && (
                <Center mt="md">
                    <Button
                        variant="subtle"
                        onClick={() => setExpanded(!expanded)}
                        leftSection={expanded ? <IconMinus size={16}/> : <IconPlus size={16}/>}
                    >
                        {expanded ? "Hide Detailed Columns" : "Show All Columns"}
                    </Button>
                </Center>
            )}
        </>
    );
};
