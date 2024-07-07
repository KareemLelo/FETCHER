import { useState, useEffect } from "react";
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
  ProfileUpdateData,
  PassportUpdateData,
  FlightUpdateData,
} from "../../Services/Interface";
import { useContent } from "../../Hooks/ContentContext";

const MyProfilePage = () => {
  const { accountType } = useContent();
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

  const fetchData = async () => {
    try {
      const data = await fetchProfileData();
      setProfile({
        id: data.id,
        name: data.name,
        email: data.email,
        mobileNumber: data.mobileNumber,
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
        description: "Failed to fetch profile data.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [toast]);

  const handleUpdateProfile = async (updatedData: ProfileUpdateData) => {
    try {
      const data = await updateUserProfile({
        name: updatedData.name,
        email: updatedData.email,
        mobile: updatedData.mobileNumber,
        bio: updatedData.bio,
      });
      await fetchData();
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
        description: "Failed to update profile.",
        status: "error",
        duration: 5000,
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
        passportExpDate: passportData.expirationDate,
      });
      await fetchData();
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
        description: "Failed to update passport details.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleUpdateFlightDetails = async (flightData: FlightUpdateData) => {
    try {
      const data = await updateFlightDetails(flightData);
      await fetchData();
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
        description: "Failed to update flight details.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack mb={4} width={"100%"}>
      <ProfileInfo
        name={profile.name}
        email={profile.email}
        mobileNumber={profile.mobileNumber}
        bio={profile.bio}
        onSave={handleUpdateProfile}
      />
      {accountType === "Fetcher" && (
        <SimpleGrid columns={{ base: 1, md: 1, lg: 2 }} gap={4} width="full">
          <MyPassport
            passportNumber={profile.passportDetails.passportNumber}
            nationality={profile.passportDetails.nationality}
            expirationDate={profile.passportDetails.passportExpDate}
            onSave={handleUpdatePassportDetails}
          />
          <TicketDetails
            flightData={profile.flightDetails}
            onSave={handleUpdateFlightDetails}
          />
        </SimpleGrid>
      )}
    </VStack>
  );
};

export default MyProfilePage;
