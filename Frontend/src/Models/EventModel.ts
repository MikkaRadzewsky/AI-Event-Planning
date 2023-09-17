class EventModel {
  //   public eventId: number;
  public eventName?: string | null;
  public location?: string | null;
  public budget?: string | null;
  public guests?: string | null;

  public constructor(event: any) {
    this.eventName = event.eventName;
    this.location = event.location;
    this.budget = event.budget;
    this.guests = event.guests;
  }

  // validations?
}

export default EventModel;
