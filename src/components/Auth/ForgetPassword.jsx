import {
  Center,
  VStack,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  FormErrorMessage,
  useToast
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function ForgetPassword() {
    const [selectedValue, setSelectedValue] = useState("applicant");
    const [loading,setLoading]=useState(false)
    const [email, setEmail] = useState("");
    const toast=useToast();
    const [errors, setErrors] = useState({
        email: "",
      });
      const navigate=useNavigate();

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };
    const emailChangeHandler = (event) => {
        setEmail(event.target.value);
        setErrors({
          ...errors,
          email: "",
        });
      };
      const submitHandler = async () => {

        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

        const newErrors = {};
       
    
       
        if (emailRegex.test(email) === false) {
          newErrors.email = "Enter a valid email";
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
        } else{
            setLoading(true);
            const result=await fetch(`http://localhost:5000/api/v1/users/sendemail${selectedValue}`,{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({
                    email:email
                })
            })
            const data= await result.json();
            setLoading(false)
            // console.log(data);
            if(data.success===false){
                if(data.msg==='User not exists'){
                    toast({
                        title: "This Email doesn't exists",
                        description: "Resgister first",
                        position: "top",
                        status: "error",
                        duration: 1000,
                        isClosable: true,
                      });
                }
                else{
                    toast({
                        title: "Something went wrong",
                        description: "Try after some time",
                        position: "top",
                        status: "error",
                        duration: 1000,
                        isClosable: true,
                      });
                }
            }
            else{
                toast({
                    title: "OTP sent successfully",
                    position: "top",
                    status: "success",
                    duration: 1000,
                    isClosable: true,
                  });
                  setLoading(false);
                  localStorage.setItem('token',data.token)
                  setTimeout(()=>{
                        navigate('/emailotp')
                  },1500)
            }

        }



        // else {
        //   setLoading(true);
        //   const result = await fetch("http://localhost:5000/api/v1/users/signup", {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //       firstname: fname,
        //       lastname: lname,
        //       mobile: mobile,
        //       email: email,
        //     }),
        //   });
        //   const data = await result.json();
        //   if (data.success === true) {
        //     localStorage.setItem("token", data.token);
        //     if (
        //       data.message === "Email and Mobile is not varified" ||
        //       data.message === "Mobile not varified" ||
        //       data.message === "User created"
        //     ) {
        //       const response = await fetch(
        //         "http://localhost:5000/api/v1/users/sendmobile",
        //         {
        //           method: "POST",
        //           headers: {
        //             "Content-Type": "application/json",
        //             Authorization: `Bearer ${data.token}`,
        //           },
        //         }
        //       );
        //       const res = await response.json();
        //       if (res.success === true) {
        //         navigate("/mobile");
        //       } else {
        //         setLoading(false);
        //         toast({
        //           title: "Some Error Happened",
        //           description: "Try after some time",
        //           position: "top",
        //           status: "error",
        //           duration: 1000,
        //           isClosable: true,
        //         });
        //       }
        //     } else {
        //       if (data.message === "Email not varified") {
        //         const response = await fetch(
        //           "http://localhost:5000/api/v1/users/sendemail",
        //           {
        //             method: "POST",
        //             headers: {
        //               "Content-Type": "application/json",
        //               Authorization: `Bearer ${data.token}`,
        //             },
        //           }
        //         );
        //         const res = await response.json();
        //         if (res.success === true) {
        //           navigate("/email");
        //         } else {
        //           setLoading(false);
        //           toast({
        //             title: "Some Error Happened",
        //             description: "Try after some time",
        //             position: "top",
        //             status: "error",
        //             duration: 1000,
        //             isClosable: true,
        //           });
        //         }
        //       }
        //     }
        //   } else {
        //     if (data.message === "Mobile and Email is varified") {
        //       navigate("/welcome");
        //     } else {
        //       setLoading(false);
        //       toast({
        //         title: "Internal server error",
        //         description: "Try after some time",
        //         position: "top",
        //         status: "error",
        //         duration: 1000,
        //         isClosable: true,
        //       });
        //     }
        //   }
        // }
      };





  return (
    <Center w={"100vw"} h={"100vh"} bgColor={"#FFDEAD"}>
      <Center
        h={"80%"}
        w={["100%", "80%", "80%", "40%"]}
        borderRadius={"2%"}
        display={"flex"}
        flexDirection={"row"}
        bgColor={"#FFF5EE"}
        gap={"20%"}
        boxShadow="dark-lg"
      >
        <VStack w={"60%"} spacing={"10px"}>
          <Text fontSize={"4xl"} as={"b"} mb={4}>
            {" "}
            Varify Email
          </Text>
          <FormControl id="userType" isRequired>
            <FormLabel>User Type</FormLabel>
            <Select borderColor={"black"} value={selectedValue} onChange={handleChange}>
              <option value="applicant">Applicant</option>
              <option value="reviewer">Reviewer</option>
              <option value="approver">Approver</option>
            </Select>
          </FormControl>
          <FormControl
            id="Email"
            isRequired
            isInvalid={errors.email}
          >
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="Enter your Email"
              value={email}
              onChange={emailChangeHandler}
              borderColor={"black"}
            />
            {errors.email ? (
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              ) : (
                ""
              )}
          </FormControl>

          <Button
            colorScheme="blue"
            width="50%"
            style={{ marginTop: 15 }}
              onClick={submitHandler}
              isLoading={loading}
          >
            Submit
          </Button>
        </VStack>
      </Center>
    </Center>
  );
}
