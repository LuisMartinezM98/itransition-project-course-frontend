export interface User {
  id: number;
  name: string;
  email: string;
  last_connection: string;
  active: boolean;
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
  id_form: number;
  user_id: number;
  open: boolean;
  limit: number;
  created_at: string;
  updated_at: string;
  topic: Topics;
}

export interface newForm {
  limit: number;
  topic: Topics;
}

export interface Question {
    id_question: number;
    form_id: number;
    question: string;
    type_question: number;
}

export interface newQuestion {
  question: string;
  type_question: string;
  options?: newOption[];
}

export interface Type_question{
    id_type_question: string;
    type_question: string;
}

export interface Option {
    id_option: number;
    question_id: number;
    option: string;
}


export interface newOption {
  option: string;
}

export interface Answer {
    id_answer: number;
    question_id: number;
    option_id?: number;
    user_id: number;
    answer?: string;
}
