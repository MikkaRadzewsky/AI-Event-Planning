import { eventNames } from "process";
import { useEffect, useState } from "react";
import EventModel from "../../../Models/EventModel";
import NestedEventModel from "../../../Models/NestedEventModel copy";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";
import MarvinOutput from "../MarvinOutput/MarvinOutput";
import "./SearchBar.css";

function SearchBar(): JSX.Element {
  const [currentEvent, setCurrentEvent] = useState<EventModel>();
  const [outputText, setOutputText] = useState("");
  const inputElement = document.getElementById("InputText") as HTMLInputElement;
  //   const outputElement = document.getElementById("AIOutput") as HTMLDivElement;
  let updatedEvent: EventModel;

  function hasNullProperty(obj: EventModel): boolean {
    for (const value of Object.values(obj)) {
      if (value === null || value === "unknown") {
        return true;
      }
    }
    return false;
  }

  async function isValidPrompt() {
    const valid = await dataService.sendAndReceiveData(
      "is_Event_Prompt",
      inputElement.value.toString()
    );
    return valid;
  }

  async function sendPrompt() {
    const event = await dataService.sendAndReceiveData(
      "translate_Prompt",
      inputElement.value.toString()
    );
    return event;
  }

  async function askForBlanks() {
    const missingValuesStr = await dataService.sendAndReceiveString(
      "ask_For_Blanks",
      updatedEvent
    );
    return missingValuesStr.toString();
  }

  async function fillInBlanks() {
    const nestedEvent = new NestedEventModel(
      updatedEvent + inputElement.value.toString()
    );
    const blanks = await dataService.sendAndReceiveNestedEvent(
      "fill_In_Blanks",
      nestedEvent
    );
    return blanks;
  }

  async function recommendVenues() {}

  async function sendToBackend() {
    try {
      console.log("click");
      setOutputText("I'm thinking...");
      if (!isValidPrompt) {
        setOutputText(
          "you are getting off topic, I currently only deal in events."
        );
        return;
      }
      if (!currentEvent || currentEvent === undefined) {
        console.log("no event yet");

        updatedEvent = await sendPrompt();
        console.log(updatedEvent);

        setCurrentEvent(updatedEvent);

        // If the event is missing values
        if (hasNullProperty(updatedEvent)) {
          // Update AI chat text...
          console.log("missing values...");
          const text = await askForBlanks();
          setOutputText(text);
        }
      }

      if (updatedEvent && hasNullProperty(updatedEvent)) {
        updatedEvent = await fillInBlanks();
        setCurrentEvent(updatedEvent);

        if (!hasNullProperty(updatedEvent)) {
          recommendVenues();
          return;
        }
      }

      if (updatedEvent && !hasNullProperty(updatedEvent)) {
        recommendVenues();
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
