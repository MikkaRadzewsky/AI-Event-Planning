import { eventNames } from "process";
import { useEffect, useState } from "react";
import EventModel from "../../../Models/EventModel";
import NestedEventModel from "../../../Models/NestedEventModel";
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
    console.log(`check for null - ${JSON.stringify(obj)}`);

    for (const value of Object.values(obj)) {
      if (value === null || value === "unknown") {
        console.log(true);

        return true;
      }
    }
    console.log(false);

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

  async function fillInBlanks(updatedEvent: EventModel) {
    console.log(`in fill the blanks: ${JSON.stringify(updatedEvent)}`);

    const nestedEvent = new NestedEventModel({
      ...updatedEvent,
      MissingValues: inputElement.value.toString(),
    });
    console.log(`nestedevent: ${JSON.stringify(nestedEvent)}`);

    const blanks = await dataService.sendAndReceiveNestedEvent(
      "fill_In_Blanks",
      nestedEvent
    );
    return blanks;
  }

  async function recommendVenues(updatedEvent: EventModel) {
    const recommendations = await dataService.sendAndReceiveString(
      "recommend_Venues",
      updatedEvent
    );
    return recommendations;
  }

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
        // console.log(updatedEvent);

        setCurrentEvent(updatedEvent);

        // If the event is missing values
        console.log(`line 84 - ${updatedEvent}`);

        if (hasNullProperty(updatedEvent)) {
          // Update AI chat text...
          console.log("missing values...");
          console.log(updatedEvent);

          const text = await askForBlanks();
          setOutputText(text);
          return;
        }
      }
      updatedEvent = currentEvent;
      console.log(`line 102 - ${JSON.stringify(updatedEvent)}`);
      if (hasNullProperty(updatedEvent)) {
        console.log("is missing values-> fill them in");

        updatedEvent = await fillInBlanks(updatedEvent);
        setCurrentEvent(updatedEvent);
        // updatedEvent = currentEvent;
        console.log(`line 109 - ${updatedEvent}`);
        if (!hasNullProperty(updatedEvent)) {
          const text = recommendVenues(updatedEvent);
          setOutputText(await text);
        } else {
          const text = await askForBlanks();
          setOutputText(text);
        }
        return;
      }
      if (!hasNullProperty(updatedEvent)) {
        const text = recommendVenues(updatedEvent);
        setOutputText(await text);
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
