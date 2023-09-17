import axios from "axios";
import EventModel from "../Models/EventModel";
import appConfig from "../Utils/Config";

class DataService {
  async sendAndReceiveInitialPrompt<U>(
    endpoint: string,
    data: string
  ): Promise<EventModel> {
    try {
      const apiUrl = `http://localhost:3001/api/${endpoint}`;

      const queryParams = {
        input: data,
      };

      const response = await axios.post(apiUrl, null, {
        params: queryParams,
      });

      if (response.status === 200) {
        console.log("POST request with query parameters was successful");
        console.log(response.data);
      } else {
        console.error(`HTTP error! Status: ${response.status}`);
      }
      return response.data;
    } catch (error) {
      console.error("Error:", error);
    }
  }
  // try {
  //   console.log(endpoint);
  //   console.log(data);

  //   const response = await fetch(`${appConfig.serverUrl}/${endpoint}`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   });

  //   if (!response.ok) {
  //     throw new Error(`HTTP error! Status: ${response.status}`);
  //   }

  //   return await response.json();
  // } catch (error) {
  //   console.error("Fetch error:", error);
  //   throw error;
  // }

  async askForMissingValues<T, U>(endpoint: string, data: T): Promise<U> {
    try {
      const response = await fetch(`${appConfig.serverUrl}/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }
  async sendAndReceiveMissingValues<T, U>(
    endpoint: string,
    data: T
  ): Promise<U> {
    try {
      const response = await fetch(`${appConfig.serverUrl}/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }
}

const dataService = new DataService();

export default dataService;
