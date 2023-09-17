class EventModel {
  //   public eventId: number;
  public eventName: string;
  public location: string;
  public budget: string;
  public guests: string;

  public constructor(event: EventModel) {
    // this.eventId = event.eventId;
    this.eventName = event.eventName;
    this.location = event.location;
    this.budget = event.budget;
    this.guests = event.guests;
  }
}

export default EventModel;
