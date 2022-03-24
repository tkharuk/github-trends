import { Loader, Center } from "@mantine/core";

const AppLoader = () => {
  return (
    <Center style={{ height: "100vh" }}>
      <Loader size="xl" />
    </Center>
  );
};

export default AppLoader;
