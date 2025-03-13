export interface IEvent {
  attendees: string[];
  status: string;
  _id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  createdBy: ICreateBy;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateBy {
  name: string;
  email: string;
  id: string;
}

export interface IUser {
  role: string;
  isEmailVerified: boolean;
  name: string;
  email: string;
  id: string;
}

export interface IUserSession {
  events: IEvent[];
  user: IUser;
  tokens: {
    access: {
      token: string;
      expires: string;
    };
    refresh: {
      token: string;
      expires: string;
    };
  };
}

export interface IRequestError {
  code: number;
  message: string;
  stack: string;
}
