class NestedEventModel {
  //   public eventId: number;
  public eventName?: string | null;
  public location?: string | null;
  public budget?: string | null;
  public guest?: string | null;
  public missingValues: string;

  public constructor(event: any) {
    this.eventName = event.eventName;
    this.location = event.location;
    this.budget = event.budget;
    this.guest = event.guest;
    this.missingValues = event.missingValues;
  }

  // validations?
}

export default NestedEventModel;
