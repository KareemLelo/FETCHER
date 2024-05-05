export interface Quest {
  
_id:string
itemName:string
itemCategory:string
itemQuantity:number;
itemDirection:string
itemWeight:number
itemPrice:number
itemLink:string
createdBy:string
status:string
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


  