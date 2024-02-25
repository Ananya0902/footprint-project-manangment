import {
  Center,
  Text,
  HStack,
  PinInput,
  PinInputField,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  useToast,
  Select,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authAxios from "../../AuthAxios";

export default function EmailOtp() {
  const [password, setPassword] = useState("");
  const [selectedValue, setSelectedValue] = useState("applicant");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    password: "",
  });
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const authtoken = localStorage.getItem("token");
    if (!authtoken) {
      navigate("/");
    }
  }, []);

  const handlePinChange = (value) => {
    setPin(value);
  };
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
    setErrors({
      ...errors,
      password: "",
    });
  };
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const submitHandler = async () => {
    const Passwordregx = /^[a-zA-Z][a-zA-Z\d@]{5,}$/;

    const newErrors = {};
    if (pin === "") {
      toast({
        title: "please Enter OTP",
        description: "some fields are not valid",
        position: "top",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
      return;
    }

    if (Passwordregx.test(password) === false) {
      newErrors.password = "Shuld be 6 character long starting with Alphabet";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      toast({
        title: "please Enter valid credentials",
        description: "some fiels are not valid",
        position: "top",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    } else {
      setLoading(true);
      const authtoken = localStorage.getItem("token");
      if (!authtoken) {
        navigate("/");
      }

      const result = await authAxios.post(`users/varifyemail${selectedValue}`, {
        otp: pin,
        password: password,
      });
      const data = await result.json();
      setLoading(false);
      if (data.success === true) {
        toast({
          title: "password changed successfully",
          position: "top",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
        localStorage.removeItem("token");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        if (
          data.msg === "Token is not there" ||
          data.msg === "Token is not correct"
        ) {
          localStorage.removeItem("token");
          navigate("/");
        } else {
          toast({
            title: data.message,
            description: "some thing went wrong",
            position: "top",
            status: "error",
            duration: 1000,
            isClosable: true,
          });
        }
      }
    }
  };

  return (
    <Center
      display={"flex"}
      w={"100vw"}
      h={"100vh"}
      flexDirection={"column"}
      bgColor={"#FFDEAD"}
    >
      <Center
        h={"70%"}
        w={["100%", "80%", "60%", "40%"]}
        borderRadius={"2%"}
        display={"flex"}
        flexDirection={"column"}
        bgColor={"#FFF5EE"}
        boxShadow="dark-lg"
      >
        <Text fontSize={"4xl"} as={"b"} mb={8}>
          Varify your Email
        </Text>
        <Center w={"60%"} mb={8}>
          <FormControl id="userType" isRequired>
            <FormLabel>User Type</FormLabel>
            <Select
              borderColor={"black"}
              value={selectedValue}
              onChange={handleChange}
            >
              <option value="applicant">Applicant</option>
              <option value="reviewer">Reviewer</option>
              <option value="approver">Approver</option>
            </Select>
          </FormControl>
        </Center>
        <Text mb={2} fontWeight={"bold"}>
          An OTP has been sent to your Email
        </Text>

        <HStack mb={8}>
          <PinInput
            placeholder=""
            size="lg"
            onChange={handlePinChange}
            value={pin}
          >
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <PinInputField
                key={index}
                boxShadow={"base"}
                borderColor={"black"}
              />
            ))}
          </PinInput>
        </HStack>
        <Center w={"60%"}>
          <FormControl id="password" isRequired isInvalid={errors.password}>
            <FormLabel>New Password</FormLabel>
            <Input
              placeholder="Enter your new password"
              value={password}
              onChange={passwordChangeHandler}
              borderColor={"black"}
            />
            {errors.password ? (
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            ) : (
              ""
            )}
          </FormControl>
        </Center>
        <Center w={"80%"} textAlign={"center"} gap={"4%"}>
          <Button
            colorScheme="blue"
            width={["38%", "32%", "32%", "30%"]}
            // p={'2%'}
            style={{ marginTop: 15 }}
            fontSize={"12px"}
            isLoading={loading}
            loadingText="Varifing"
            onClick={submitHandler}
          >
            Change password
          </Button>
          <Button
            colorScheme="blue"
            width={["30%", "25%", "25%", "20%"]}
            loadingText="Sending"
            fontSize={"12px"}
            style={{ marginTop: 15 }}
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/forgetpassword");
            }}
          >
            Resend
          </Button>
        </Center>
      </Center>
    </Center>
  );
}
