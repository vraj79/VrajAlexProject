import axios from "axios";
import {
  Box,
  Text,
  Heading,
  SimpleGrid,
  Image,
  Container,
  Button,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
const Loading = () => {
  return (
    <Container>
      <Image
        w="200px"
        h="200px"
        ml="180px"
        src="https://reiwa.com.au/ux/reiwa/ux/images/pd/spinner.gif"
      />
    </Container>
  );
};
const Deals = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const getData = () => {
    setIsLoading(true);
    axios
      .get(
        `https://api-pathak-database.vercel.app/WarehouseList?_page=${page}&_limit=20`
      )
      .then((res) => {
        setData(res);
        setIsLoading(false);
        console.log(res.data);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };
  useEffect(() => {
    getData(page);
  }, [page]);

  return isLoading ? (
    <Loading />
  ) : (
    <Box>
      <Box
        boxShadow="md"
        display="flex"
        justifyContent="center"
        alignItems="center"
        w="100%"
        h="100px"
        color="red"
      >
        <Heading>FLASH DEALS</Heading>
      </Box>
      <Box align="right" bg=" #f1f6fd">
        <SimpleGrid columns={{ base: 2, sm: 2, md: 3, lg: 5 }} spacing={6} w="90%" mr="40px">
          {data?.data?.map((el) => (
            <Box
              className="eachBox"
              mt="20px"
              align="left"
              key={el.ProductId}
              style={{
                background: "white",
                fontFamily: "Open Sans",
                display: "flex",
                padding: "10px",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Image src={el.PicturePath}></Image>
              <Box mt="1" as="h4" lineHeight="tight" noOfLines={2}>
                {el.Name}
              </Box>

              <Text ml="-150px" fontWeight="600" fontSize="large">
                {el.SalePrice}
              </Text>
              <Text ml="-150px" fontSize="large">
                {el.CsSalesPrice}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};
export default Deals;
