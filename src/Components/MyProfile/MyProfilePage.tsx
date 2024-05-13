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
import {
  FlightUpdateData,
  PassportUpdateData,
  ProfileUpdateData,
} from "../../Services/Interface";

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
      depFlightNumber: "",
      arrFlightNumber: "",
      alreadyThere: false,
    },
  });
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProfileData();
        console.log("Fetched data:", data);
        setProfile({
          id: data.id,
          name: data.name,
          email: data.email,
          mobileNumber: data.mobileNumber, // Adjust the key if necessary
          bio: data.bio,
          passportDetails: data.passportDetails || {
            passportNumber: "",
            nationality: "",
            passportExpDate: "",
          },
          flightDetails: data.flightDetails || {
            departureDate: "",
            arrivalDate: "",
            depFlightNumber: "",
            arrFlightNumber: "",
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

  const handleUpdateProfile = async (updatedData: ProfileUpdateData) => {
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

  const handleUpdatePassportDetails = async (
    passportData: PassportUpdateData
  ) => {
    try {
      const data = await updatePassportDetails({
        passportNumber: passportData.passportNumber,
        nationality: passportData.nationality,
        passportExpDate: passportData.expirationDate, // Make sure this matches your backend model
      });
      setProfile((prevProfile) => ({
        ...prevProfile,
        passportDetails: {
          ...prevProfile.passportDetails,
          ...data.passportDetails,
        },
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

  const handleUpdateFlightDetails = async (flightData: FlightUpdateData) => {
    try {
      const data = await updateFlightDetails(flightData);
      setProfile((prevProfile) => ({
        ...prevProfile,
        flightDetails: { ...prevProfile.flightDetails, ...data },
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
          onSave={handleUpdatePassportDetails}
        />
        <TicketDetails
          flightData={profile.flightDetails}
          onSave={handleUpdateFlightDetails}
        />
      </SimpleGrid>
    </VStack>
  );
};

export default MyProfilePage;
