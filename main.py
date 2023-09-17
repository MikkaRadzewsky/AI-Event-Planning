from pydantic import BaseModel, Field
from marvin import ai_fn, ai_model
from fastapi import FastAPI
import os
from dotenv import load_dotenv
from marvin import ai_fn


load_dotenv()
openai_api_key = os.getenv('MARVIN_OPENAI_API_KEY')

app = FastAPI()


@ai_model
class Event(BaseModel):
    """a description of an event including the type of event and sometimes also the budget and number of guests"""

    EventName: str = Field(description="type of event")
    Location: str = Field(
        description="location (as general as country or as specific as city) of the event")
    Budget: str = Field(
        description="description of budget - budget option values are low budget /mid budget/ high budget")
    Guest: str = Field(description="amount of guest/people attending - translate words to numbers + the words around/up to. example: small gathering will be translated to around 5 people. the number will be translated according the the specific event - a big gathering of friends is around 20 people, but a big wedding is around 300 people. ")
    # EventType: str = Field(
    # description="what is the event? casual, professional, formal, etc ")
    # Date: str = Field(description="the specific date of the event")


@ai_fn
def translate_prompt(input: str) -> Event:
    """isolate the values of an event as stated in the base model and put them in a new `Event`.
    if no event type/nam is given, enter unknown. 
    If no budget is given is given or can be inferred, then budget is unknown. 
    If no guest amount is  given , enter unknown.
    if no location is given, enter unknown"""


@ai_fn
def ask_For_Blanks(event: Event) -> str:
    """ask the user for the missing (unknown) values in the event"""


@ai_fn
def fill_In_Blanks(event: Event, input: str) -> Event:
    """if one of the 'unknown' values is given in the input, put it into the corresponding value of the event."""


@ai_fn
def recommend_Venues(event: Event) -> Event:
    """recommend 5 places to have a 'event.Budget' 'event.EventName' with 'event.Guests' in 'event.Location' """


# print((translate_prompt(
#     Event("i really want an all out destination wedding"))))
# print(create_list(translate_prompt(Event("help me plan an intimate wedding"))))
# print(create_list(translate_prompt(Event(" help me plan a game night with friends"))))
# print(create_list(translate_prompt(Event("i forgot date night"))))
# print(translate_prompt(Event("help me plan a wrap party for the crew")))
# print(translate_prompt(
#     Event("my 8 y/o birthday  is tomorrow and i have nothing planned")))
# print(translate_prompt(Event(
#     "i want to plan a huge bachelorette party where everyone bring a dish instead of ordering")))
# print(generate_recipe(["lemon", "chicken", "olives", "couscous"]))


# # API Routes:
# app.add_api_route("/translate_prompt", translate_prompt)
# app.add_api_route("/ask_For_Blanks", ask_For_Blanks)
# app.add_api_route("/fill_In_Blanks", fill_In_Blanks)


@app.get("/marvin/translate_prompt")
def translate_prompt_handler(input: str) -> Event:
    result = translate_prompt(input)
    return result


@app.post("/marvin/ask_For_Blanks")
def ask_For_Blanks_handler(event: Event) -> str:
    result = ask_For_Blanks(event)
    return result


@app.post("/marvin/fill_In_Blanks")
def fill_In_Blanks_handler(event: Event, input: str) -> Event:
    result = fill_In_Blanks(event, input)
    return result
