class Config {
  public serverUrl = "http://localhost:3001/api";
  //   public firstPromptUrl = "http://localhost:8000/api/translate_prompt";
  //   public askForBlanksUrl = "http://localhost:8000/api/ask_For_Blanks";
  //   public fillInBlanksUrl = "http://localhost:8000/api/fill_In_Blanks";
}

const appConfig = new Config(); // Singleton

export default appConfig;
