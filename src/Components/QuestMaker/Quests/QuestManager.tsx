import React, { useEffect, useState } from "react";
import QuestForm from "./QuestForm";
import QuestCard from "./QuestCard";
import { Quest } from "../../../Services/Interface";
import { fetchQuestByCreator } from "../../../Services/Api";

const QuestManager: React.FC = () => {
  const [quest, setQuest] = useState<Quest | null>(null);

  useEffect(() => {
    fetchQuestByCreator()
      .then((quest) => {
        setQuest(quest); // Set the quest if found
        console.log("Quest by Creator:", quest);
      })
      .catch((error) => {
        console.error("Error fetching quest by creator:", error);
        setQuest(null); // Ensure form is shown if no quest is found or an error occurs
      });
  }, []);

  return quest ? (
    <QuestCard quest={quest} />
  ) : (
    <QuestForm onCreate={setQuest} />
  );
};

export default QuestManager;
