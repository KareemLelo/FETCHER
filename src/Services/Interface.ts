export interface Quest {
  _id: string;
  itemName: string;
  itemCategory: string;
  itemQuantity: number;
  itemDirection: string;
  itemWeight: number;
  itemPrice: number;
  itemLink: string;
  createdBy: string; // Assuming this will always be present as quests must have a creator
  acceptedBy?: string; // This should be optional as it may not be set initially
  statusIndex: number;
  progressIndex: number;
}

  export interface Profile {
    name: string;
    email: string;
    bio: string;
    mobileNumber: string;
  }
  
  export interface ApiResponse {
    name: string;
    email: string;
    mobile: string;
    bio?: string;
    _id:string
  }
  
 export interface ApiError {
    message: string;
  }


  export interface Passport {
    passportNumber: string;
    nationality: string;
    expirationDate: string;
  }


  export interface TicketDetails {
    DepFlightNumber: string;
    departureDate: string;
    arrFlightNumber: string;
    arrivalDate: string;
  }