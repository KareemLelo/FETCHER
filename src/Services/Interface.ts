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


  export interface TicketDetails {
    DepFlightNumber: string;
    departureDate: string;
    arrFlightNumber: string;
    arrivalDate: string;
  }
  

  export interface ProfileUpdateData {
    name?: string;
    email?: string;
    mobileNumber?: string;
    bio?: string;
  }

  export interface PassportUpdateData {
    passportNumber: string;
    nationality: string;
    expirationDate: string; // Use consistent field naming with your frontend if needed
  }

  export interface FlightUpdateData {
    depFlightNumber: string;
    departureDate: string;
    arrFlightNumber: string;
    arrivalDate: string;
    alreadyThere?: boolean;
}

export interface Order {
  id: string;
  name: string;
  price: number;
  quantity: number;
  weight: number;
  direction: string;
  category: string;
}

export interface Vault {
  questId:string
  totalAmount : number
  commitmentFee: number
  serviceFee: number
  feesDeducted: boolean
}