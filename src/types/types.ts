export interface User {
  id: string;
  name: string;
  email: string;
  last_connection: string;
  active: boolean;
  type_account: TypeAccount
}

export interface TypeAccount {
  id_type: string,
  type_account: string
}

export enum Topics {
  CustomerSatisfaction = "Customer Satisfaction",
  EmployeeEngagementAndSatisfaction = "Employee Engagement and Satisfaction",
  ProductFeedback = "Product Feedback",
  MarketResearch = "Market Research",
  EventFeedback = "Event Feedback",
  BrandAwarenessAndPerception = "Brand Awareness and Perception",
  WebsiteUsability = "Website Usability",
  HealthAndWellness = "Health and Wellness",
  AcademicExperience = "Academic Experience",
  PoliticalOpinionAndPublicPolicy = "Political Opinion and Public Policy",
}

export interface Form {
  id_form: string;
  user_id: string;
  open: boolean;
  limit: number;
  name: string,
  email: string,
  description: string,
  title: string,
  created_at: string;
  updated_at: string;
  topic: Topics;
  questions: Question[]
}

export interface newForm {
  limit: number;
  topic: Topics;
}

export interface Question {
    id_question: string;
    form_id: string;
    question_text: string;
    type_question: Type_question;
    options: Option[];
}

export interface newQuestion {
  question: string;
  type_question: string;
  options?: newOption[];
}

export interface Type_question{
    id_type_question: string;
    type_question: string;
    type_name?: string;
}

export interface Option {
    id_option: string;
    question_id: number;
    option_text: string;
}


export interface newOption {
  option: string;
}

export interface Answer {
    id_answer: string;
    question_id: string;
    option_id?: string;
    user_id: string;
    answer?: string;
    user: User;
    question: Question;
}

export interface ContactSalesForce{
  Email: string,
  FirstName: string,
  id: string,
  LastName: string,
  attributes: {
    type: string,
    url: string
  }
}