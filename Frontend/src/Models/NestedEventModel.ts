class NestedEventModel {
  //   public eventId: number;
  public EventName?: string | null;
  public Location?: string | null;
  public Budget?: string | null;
  public Guests?: string | null;
  public MissingValues: string;

  public constructor(event: any) {
    this.EventName = event.EventName;
    this.Location = event.Location;
    this.Budget = event.Budget;
    this.Guests = event.Guests;
    this.MissingValues = event.MissingValues;
  }

  // validations?
}

export default NestedEventModel;
