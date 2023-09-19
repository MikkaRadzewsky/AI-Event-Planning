class EventModel {
  //   public eventId: number;
  public EventName: string;
  public Location: string;
  public Budget: string;
  public Guests: string;

  public constructor(event: EventModel) {
    // this.eventId = event.eventId;
    this.EventName = event.EventName;
    this.Location = event.Location;
    this.Budget = event.Budget;
    this.Guests = event.Guests;
  }
}

export default EventModel;
