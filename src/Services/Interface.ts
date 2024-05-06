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
  status: string; // Ensure the values here match those expected by the backend (e.g., 'pending', 'accepted')
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


  