export interface Quest {
  _id: string;
  itemName: string;
  itemCategory: string;
  itemQuantity: number;
  itemDirection: string;
  itemWeight: number;
  itemPrice: number;
  itemLink: string;
  createdBy: string; 
  acceptedBy?: string; 
  statusIndex: number;
  progressIndex: number;
}

export interface Profile {
  name: string;
  email: string;
  mobileNumber: string;
  bio: string;
  passportDetails: {
    passportNumber: string;
    nationality: string;
    expirationDate: string;
  };
  flightDetails: {
    departureDate: string;
    arrivalDate: string;
    depFlightNumber: string;
    arrFlightNumber: string;
  };
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