export interface WebCardRequestVm {
  name: string;
  dial_code: string;
  phone: string;
  postal_code: string;
  hours: string;
  email?: string
}


export const webCardRequestInitialState: WebCardRequestVm = {
  name: "",
  dial_code: "+34",
  phone: "",
  postal_code: "",
  hours: "",
};



export interface Times {
  value: string;
  selected: boolean;
  label: string;
}

export const timesInitialState: Times[] = [
  {
    label: "09:00 - 12:00",
    value: "9 AM - 12 PM",
    selected: false,
  },
  {
    label: "12:00 - 16:00",
    value: "12 PM - 4 PM",
    selected: false,
  },
  {
    label: "16:00 - 21:00",
    value: "4 PM - 9 PM",
    selected: false,
  },
];
