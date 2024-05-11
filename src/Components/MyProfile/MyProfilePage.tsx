import React, { useState, useEffect } from "react";
import { VStack, SimpleGrid, useToast } from "@chakra-ui/react";
import MyPassport from "./MyPassport";
import ProfileInfo from "./ProfileInfo";
import TicketDetails from "./TicketDetails";
import {
  fetchProfileData,
  updateUserProfile,
  updatePassportDetails,
  updateFlightDetails,
} from "../../Services/Api";

const MyProfilePage: React.FC = () => {
  const [profile, setProfile] = useState({
    id: "",
    name: "",
    email: "",
    mobileNumber: "",
    bio: "",
    passportDetails: {
      passportNumber: "",
      nationality: "",
      passportExpDate: "",
    },
    flightDetails: {
      departureDate: "",
      arrivalDate: "",
      departureFlightNumber: "",
      arrivalFlightNumber: "",
      alreadyThere: false,
    },
  });
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProfileData();
        console.log("Fetched data:", data); // Log the full structure
        setProfile({
          id: data.id,
          name: data.name,
          email: data.email,
          mobileNumber: data.mobile,
          bio: data.bio,
          passportDetails: data.passportDetails || {
            passportNumber: "",
            nationality: "",
            passportExpDate: "",
          },
          flightDetails: data.flightDetails || {
            departureDate: "",
            arrivalDate: "",
            departureFlightNumber: "",
            arrivalFlightNumber: "",
            alreadyThere: false,
          },
        });
      } catch (error) {
        toast({
          title: "Error",
          description: (error as any).message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    };

    fetchData();
  }, [toast]);

  const handleUpdateProfile = async (updatedData: {
    name?: string;
    email?: string;
    mobileNumber?: string;
    bio?: string;
  }) => {
    try {
      const data = await updateUserProfile(profile.id, updatedData);
      setProfile((prevProfile) => ({ ...prevProfile, ...data }));
      toast({
        title: "Profile Updated",
        description: "Your profile was successfully updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: (error as any).message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleUpdatePassportDetails = async (passportData: {
    passportNumber: string;
    nationality: string;
    expirationDate: string;
  }) => {
    try {
      const data = await updatePassportDetails({
        ...passportData,
        passportExpDate: passportData.expirationDate, // Adjust according to your API if needed
      });
      setProfile((prevProfile) => ({
        ...prevProfile,
        passportDetails: { ...prevProfile.passportDetails, ...data },
      }));
      toast({
        title: "Passport Updated",
        description: "Your passport details were successfully updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: (error as any).message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleUpdateFlightDetails = async (flightData: {
    departureFlightNumber: string;
    departureDate: string;
    arrivalFlightNumber: string;
    arrivalDate: string;
    alreadyThere?: boolean;
  }) => {
    try {
      const data = await updateFlightDetails(flightData);
      setProfile((prevProfile) => ({
        ...prevProfile,
        flightDetails: data.flightDetails,
      }));
      toast({
        title: "Flight Details Updated",
        description: "Your flight details were successfully updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: (error as any).message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  console.log("Passing to MyPassport:", profile.passportDetails);

  return (
    <VStack mb={4} width={"100%"}>
      <ProfileInfo
        name={profile.name}
        email={profile.email}
        mobileNumber={profile.mobileNumber} // Make sure this matches the state structure
        bio={profile.bio}
      />
      <SimpleGrid columns={{ base: 1, md: 1, lg: 2 }} gap={4} width="60%">
        <MyPassport
          passportNumber={profile.passportDetails.passportNumber}
          nationality={profile.passportDetails.nationality}
          expirationDate={profile.passportDetails.passportExpDate} // Ensure this matches the expected prop in MyPassportProps
          /* onSave={handleUpdatePassportDetails} */
        />
        <TicketDetails
          departureFlightNumber={profile.flightDetails.departureFlightNumber}
          departureDate={profile.flightDetails.departureDate}
          arrivalFlightNumber={profile.flightDetails.arrivalFlightNumber}
          arrivalDate={profile.flightDetails.arrivalDate}
          /* onSave={handleUpdateFlightDetails} */ // Ensure handleUpdateFlightDetails expects the adjusted structure
        />
      </SimpleGrid>
    </VStack>
  );
};

export default MyProfilePage;
