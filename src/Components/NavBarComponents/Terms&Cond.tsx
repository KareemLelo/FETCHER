import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Text,
  Heading,
  VStack,
  Icon,
} from "@chakra-ui/react";
import { useContent } from "../../Hooks/ContentContext";
import { InfoIcon, CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";

const TermsAndConditions: React.FC = () => {
  const [accepted, setAccepted] = useState(false);
  const { accountType } = useContent();

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccepted(event.target.checked);
  };

  const handleSubmit = () => {
    if (accepted) {
      // Save the acceptance state or proceed with the next step
      alert("Terms and conditions accepted");
    } else {
      alert("You must accept the terms and conditions to proceed");
    }
  };

  return (
    <Box
      maxW="800px"
      mx="auto"
      p="20px"
      border="1px"
      borderColor="gray.200"
      borderRadius="md"
      boxShadow="md"
    >
      <VStack spacing="6" align="start">
        {accountType === "Fetcher" ? (
          <>
            <Heading as="h1" size="lg" display="flex" alignItems="center">
              <InfoIcon boxSize={6} mr={2} /> Terms and Conditions for Fetchers
            </Heading>
            <Text>
              <strong>Introduction</strong>
              <br />
              Welcome to Fetcher. By accepting a quest through our platform, you
              agree to comply with and be bound by the following terms and
              conditions. Please review them carefully.
            </Text>
            <Text>
              <strong>1. Definitions</strong>
              <br />
              Fetcher: A user who accepts quests to purchase and deliver items
              for Quest-Makers.
              <br />
              Quest-Maker: A user who posts quests requesting items to be
              purchased and delivered by Fetchers.
              <br />
              Quest: A task posted by a Quest-Maker for a Fetcher to complete.
            </Text>
            <Text>
              <strong>2. Registration and Eligibility</strong>
              <br />
              Fetchers must register and provide accurate personal information,
              including flight details and passport information.
              <br />
              Fetchers must be at least 18 years old and legally permitted to
              travel and purchase items.
            </Text>
            <Text>
              <strong>3. Acceptance of Quests</strong>
              <br />
              Fetchers can view and accept available quests after logging in.
              <br />
              Fetchers must have their flight details posted before accepting
              any quest.
              <br />
              Upon accepting a quest, the Fetcher commits to purchasing and
              delivering the item as specified.
            </Text>
            <Text>
              <strong>4. Payment and Fees</strong>
              <br />
              Fetchers must pay a commitment fee, which will be held temporarily
              in the digital vault.
              <br />
              The commitment fee will be refunded if the Quest-Maker cancels the
              quest before the Fetcher's departure date.
              <br />
              If the quest is cancelled after the Fetcher's departure date, the
              Fetcher will receive a portion of the service fee.
            </Text>
            <Text>
              <strong>5. Cancellation and Refunds</strong>
              <br />
              If the Fetcher cancels the quest before their departure date, no
              fees are charged.
              <br />
              If the Fetcher cancels after the departure date, the commitment
              fee is forfeited.
              <br />
              In case of failure to deliver the item, the Fetcher forfeits the
              commitment fee and does not receive the service fee.
            </Text>
            <Text>
              <strong>6. Communication and Tracking</strong>
              <br />
              Fetchers must keep the Quest-Maker informed about the progress of
              the quest.
              <br />
              Updates must be provided at key stages, including item purchase
              and delivery.
              <br />
              Fetchers can communicate with Quest-Makers through the provided
              communication tools.
            </Text>
            <Text>
              <strong>7. Liability and Indemnity</strong>
              <br />
              Fetchers are responsible for the safe and timely delivery of the
              purchased items.
              <br />
              Fetchers agree to indemnify and hold harmless the platform from
              any claims arising from their actions.
            </Text>
            <Text>
              <strong>8. Termination</strong>
              <br />
              The platform reserves the right to terminate a Fetcher's account
              for violations of these terms.
              <br />
              Fetchers can terminate their account at any time, subject to
              completing any accepted quests.
            </Text>
            <Text>
              <strong>9. Modifications</strong>
              <br />
              The platform may modify these terms at any time, and such
              modifications will be effective upon posting on the website.
              <br />
              Fetchers are encouraged to review the terms regularly to stay
              informed of any changes.
            </Text>
            <Text>
              <strong>10. Governing Law</strong>
              <br />
              These terms are governed by the laws of the jurisdiction where the
              platform operates.
            </Text>
          </>
        ) : (
          <>
            <Heading as="h1" size="lg" display="flex" alignItems="center">
              <InfoIcon boxSize={6} mr={2} /> Terms and Conditions for
              Quest-Makers
            </Heading>
            <Text>
              <strong>Introduction</strong>
              <br />
              Welcome to Fetcher. By posting a quest through our platform, you
              agree to comply with and be bound by the following terms and
              conditions. Please review them carefully.
            </Text>
            <Text>
              <strong>1. Definitions</strong>
              <br />
              Fetcher: A user who accepts quests to purchase and deliver items
              for Quest-Makers.
              <br />
              Quest-Maker: A user who posts quests requesting items to be
              purchased and delivered by Fetchers.
              <br />
              Quest: A task posted by a Quest-Maker for a Fetcher to complete.
            </Text>
            <Text>
              <strong>2. Registration and Eligibility</strong>
              <br />
              Quest-Makers must register and provide accurate personal
              information.
              <br />
              Quest-Makers must be at least 18 years old and legally permitted
              to request the purchase of items.
            </Text>
            <Text>
              <strong>3. Posting Quests</strong>
              <br />
              Quest-Makers can create and post quests with detailed information
              about the items requested, including item description,
              destination, and price.
              <br />
              Multiple quests can be posted simultaneously.
            </Text>
            <Text>
              <strong>4. Payment and Fees</strong>
              <br />
              Quest-Makers must provide valid credit card information for
              payment processing.
              <br />
              A service fee is deducted temporarily when a quest is accepted by
              a Fetcher.
              <br />
              The service fee will be refunded if the Quest-Maker cancels the
              quest before the Fetcher's departure date.
              <br />
              If the quest is cancelled after the Fetcher's departure date, a
              portion of the service fee is forfeited.
            </Text>
            <Text>
              <strong>5. Cancellation and Refunds</strong>
              <br />
              Quest-Makers can cancel their quest at any time, subject to the
              cancellation policies.
              <br />
              If the quest is cancelled before the Fetcher's departure date, no
              charges are applied.
              <br />
              If the quest is cancelled after the Fetcher's departure date, the
              Quest-Maker forfeits a portion of the service fee.
            </Text>
            <Text>
              <strong>6. Communication and Tracking</strong>
              <br />
              Quest-Makers must communicate with Fetchers to provide any
              additional details required for the quest.
              <br />
              Quest-Makers can track the progress of their quests through the
              platform’s tracking system.
              <br />
              Notifications will be sent at key stages of the quest process.
            </Text>
            <Text>
              <strong>7. Liability and Indemnity</strong>
              <br />
              Quest-Makers are responsible for ensuring the accuracy of the
              quest details and item descriptions.
              <br />
              Quest-Makers agree to indemnify and hold harmless the platform
              from any claims arising from their actions.
            </Text>
            <Text>
              <strong>8. Termination</strong>
              <br />
              The platform reserves the right to terminate a Quest-Maker's
              account for violations of these terms.
              <br />
              Quest-Makers can terminate their account at any time, subject to
              completing payment for any accepted quests.
            </Text>
            <Text>
              <strong>9. Modifications</strong>
              <br />
              The platform may modify these terms at any time, and such
              modifications will be effective upon posting on the website.
              <br />
              Quest-Makers are encouraged to review the terms regularly to stay
              informed of any changes.
            </Text>
            <Text>
              <strong>10. Governing Law</strong>
              <br />
              These terms are governed by the laws of the jurisdiction where the
              platform operates.
            </Text>
          </>
        )}
        <Checkbox isChecked={accepted} onChange={handleCheckboxChange}>
          I have read and accept the Terms and Conditions
        </Checkbox>
        <Button
          onClick={handleSubmit}
          color={"white"}
          bg={"brand.primary"}
          _hover={{ bg: "brand.hover" }}
          leftIcon={<CheckCircleIcon />}
        >
          Submit
        </Button>
      </VStack>
    </Box>
  );
};

export default TermsAndConditions;
