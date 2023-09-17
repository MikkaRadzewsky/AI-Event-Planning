import { eventNames } from "process";
import { useEffect, useState } from "react";
import EventModel from "../../../Models/EventModel";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";
import MarvinOutput from "../MarvinOutput/MarvinOutput";
import "./SearchBar.css";

function SearchBar(): JSX.Element {
  const [currentEvent, setCurrentEvent] = useState<EventModel>();
  const [outputText, setOutputText] = useState("");
  const inputElement = document.getElementById("InputText") as HTMLInputElement;
  //   const outputElement = document.getElementById("AIOutput") as HTMLDivElement;

  function hasNullProperty(obj: EventModel): boolean {
    for (const value of Object.values(obj)) {
      if (value === null || value === "unknown") {
        console.log("true");
        return true;
      }
    }
    console.log("false");
    return false;
  }

  async function sendToBackend() {
    try {
      let updatedEvent: EventModel;

      if (!currentEvent) {
        const event: EventModel = await dataService.sendAndReceiveInitialPrompt(
          "translate_prompt",
          inputElement.value.toString()
        );

        // let event1: EventModel = event;
        // console.log(event1);

        updatedEvent = event;
        console.log(updatedEvent);

        // If the event is missing values of the event model
        if (hasNullProperty(updatedEvent)) {
          // Update AI chat text...
          setOutputText(
            await dataService.askForMissingValues(
              "ask_For_Blanks",
              updatedEvent
            )
          );
        }

        // Use updatedEvent instead of currentEvent
        setCurrentEvent(updatedEvent);
      }

      if (updatedEvent && hasNullProperty(updatedEvent)) {
        console.log("missing values...");

        // Use updatedEvent instead of currentEvent
        updatedEvent = await dataService.sendAndReceiveMissingValues(
          "fill_In_Blanks",
          inputElement.value
        );

        setCurrentEvent(updatedEvent);
      }

      if (updatedEvent && !hasNullProperty(updatedEvent)) {
        // Recommend places that fit the event values...
        console.log("recommending...");
      }
    } catch (err: any) {
      notifyService.error(err);
    }
  }

  return (
    <div className="SearchBar">
      {/* search bar and enter: */}
      <input id="InputText" className="InputBox" type="text"></input>
      <br />
      <button className="SearchButton" onClick={() => sendToBackend()}>
        Help Me
      </button>
      <MarvinOutput text={outputText} />
    </div>
  );
}

export default SearchBar;
