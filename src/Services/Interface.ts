export interface Quest {
    name: string;
    itemType: string;
    quantity: number;
    direction: string;
    weight: number;
    price: number;
    link:string;
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


  