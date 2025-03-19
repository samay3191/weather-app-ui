import { useAuth0 } from "@auth0/auth0-react";
import {
  Box,
  Button,
  Dialog,
  HStack,
  Portal,
  Spinner,
  Text,
} from "@chakra-ui/react";
import bgSvg from "@/assets/solar_vector.svg";

const Login = () => {
  const { loginWithRedirect, isLoading } = useAuth0();

  return (
    <Box
      bgAttachment={"fixed"}
      bgPos={"top"}
      bgRepeat={"no-repeat"}
      bgSize={"cover"}
      bgImage={`url(${bgSvg})`}
      h={"100vh"}
    >
      <Dialog.Root
        placement={"center"}
        motionPreset="slide-in-bottom"
        open={true}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>
                  {isLoading ? "Almost there!" : "Sample Weather App"}
                </Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                {isLoading ? (
                  <HStack>
                    <Spinner size="xl" borderWidth="4px" />
                    <Text
                      pl={"4"}
                      fontSize="lg"
                      fontWeight="medium"
                      color="gray.600"
                    >
                      We’re logging you in...
                    </Text>
                  </HStack>
                ) : (
                  <>
                    <Text pb={"8"}>
                      Welcome to WeatherNow! Sign in to get real-time weather
                      updates and forecasts tailored for you.
                    </Text>
                    <Button
                      _hover={{ colorPalette: "teal" }}
                      onClick={() => loginWithRedirect()}
                    >
                      Sign in to Continue
                    </Button>
                  </>
                )}
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Box>
  );
};

export default Login;
