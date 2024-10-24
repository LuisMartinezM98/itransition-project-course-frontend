import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import Cookies from "js-cookie";
import type {
  User,
  Form,
  Question,
  newQuestion,
  newOption,
  Type_question,
  Answer,
  newForm,
} from "../types/types";

interface SliderContextType {
  isOpen: boolean;
  openSidebar: () => void;
}

interface AuthContextType {
  token: string;
  user: User | null;
  setToken: (token: string) => void;
  setUser: (user: User | null) => void;
  logOut: () => void;
}

interface QuestionContextType {
  question: Question | null;
  questions: Question[];
  newQuestion: newQuestion | null;
  newQuestions: newQuestion[];
  typesQuestion: Type_question[];
  newOptions: newOption[];
  setNewOptions: (arr: newOption[])=> void;
  setQuestions: (arr: Question[]) => void;
  setQuestion: (obj: Question) => void;
  setNewQuestions: (arr: newQuestion[]) => void;
  setNewQuestion: (obj: newQuestion) => void;
  setTypesQuestion: (arr: Type_question[]) => void;
}

interface SurveyContextType {
  survey: Form | null;
  surveys: Form[];
  newSurvey: newForm | null;
  setSurvey: (obj: Form) => void;
  setSurveys: (arr: Form[]) => void;
  setNewSurvey: (obj: newForm) => void;
}

interface AnswerContexType {
  setAnswers: (arr: Answer[]) => void;
  answers: Answer[];
}

const SliderContext = createContext<SliderContextType | undefined>(undefined);
const AuthContext = createContext<AuthContextType | undefined>(undefined);
const QuestionContext = createContext<QuestionContextType | undefined>(
  undefined
);
const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

const AnswerContext = createContext<AnswerContexType | undefined>(undefined);



interface SliderProviderProps {
  children: ReactNode;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface SurveysProviderProps {
  children: ReactNode;
}

interface QuestionProviderProps {
  children: ReactNode;
}

interface AnswerProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setTokenState] = useState<string>("");
  const [user, setUserState] = useState<User | null>(null);

  const setToken = (newToken: string) => {
    setTokenState(newToken);
    if (newToken) {
      Cookies.set("authToken", newToken, { expires: 7 });
    } else {
      Cookies.remove("authToken");
    }
  };

  const setUser = (newUser: User | null) => {
    setUserState(newUser);
    if (newUser) {
      Cookies.set("authUser", JSON.stringify(newUser), { expires: 7 });
    } else {
      Cookies.remove("authUser");
    }
  };

  const logOut = () => {
    setToken("");
    setUserState(null);
    Cookies.remove("authToken");
    Cookies.remove("authUser");
  };

  useEffect(() => {
    const storedToken = Cookies.get("authToken");
    if (storedToken) {
      setTokenState(storedToken);
    }
  }, []);

  useEffect(() => {
    const storedUser = Cookies.get("authUser");
    if (storedUser) {
      try {
        const userJSON = JSON.parse(storedUser);
        setUserState(userJSON);
      } catch (error) {
        console.error("Error parsing stored user:", error);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, setToken, setUser, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const SliderProvider = ({ children }: SliderProviderProps) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const openSidebar = () => {
    setOpen(!isOpen);
  };

  return (
    <SliderContext.Provider value={{ isOpen, openSidebar }}>
      {children}
    </SliderContext.Provider>
  );
};

export const SurveysProvider = ({ children }: SurveysProviderProps) => {
  const [surveys, setSurveysState] = useState<Form[]>([]);
  const [survey, setSurveyState] = useState<Form | null>(null);
  const [newSurvey, setNewSurveyState] = useState<newForm | null>(null);


  const setNewSurvey = (survey: newForm) => {
    setNewSurveyState(survey);
  };

  const setSurvey = (obj: Form) => {
    setSurveyState(obj);
  };

  const setSurveys = (arr: Form[]) => {
    setSurveysState(arr);
  };


  return (
    <SurveyContext.Provider
      value={{
        setNewSurvey,
        survey,
        surveys,
        setSurvey,
        setSurveys,
        newSurvey,
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
};

export const QuestionProvider = ({ children }: QuestionProviderProps) => {
  const [questions, setQuestionsState] = useState<Question[]>([]);
  const [question, setQuestionState] = useState<Question | null>(null);
  const [newQuestions, setNewQuestionsState] = useState<newQuestion[]>([]);
  const [newQuestion, setNewQuestionState] = useState<newQuestion | null>(null);

  const [typesQuestion, setTypeQuestionsState] = useState<Type_question[]>([]);
  const [newOptions, setNewOptionsState] = useState<newOption[]>([]);

  const setQuestions = (arr: Question[]) => {
    setQuestionsState(arr);
  };

  const setQuestion = (obj: Question) => {
    setQuestionState(obj);
  };

  const setNewQuestions = (arr: newQuestion[]) => {
    setNewQuestionsState(arr);
  };

  const setNewQuestion = (obj: newQuestion) => {
    setNewQuestionState(obj);
  };

  const setTypesQuestion = (arr: Type_question[]) => {
    setTypeQuestionsState(arr)
  }

  const setNewOptions = (arr: newOption[]) => {
    setNewOptionsState(arr);
  }

  return (
    <QuestionContext.Provider
      value={{
        setQuestion,
        setQuestions,
        question,
        questions,
        typesQuestion,
        setNewQuestion,
        setNewQuestions,
        newQuestion,
        newQuestions,
        setTypesQuestion,
        newOptions,
        setNewOptions
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

export const AnswerProvider = ({children}: AnswerProviderProps) => {
  const [answers, setAnswersState] = useState<Answer[]>([]);

  const setAnswers = (arr: Answer[]) => {
    setAnswersState(arr);
  }

  return (
    <AnswerContext.Provider value={{answers, setAnswers}}>
      {children}
    </AnswerContext.Provider>
  )
}

export const useSlider = () => {
  const context = useContext(SliderContext);
  if (!context) {
    throw new Error("useSlider must be used within a SliderProvider");
  }
  return context;
};

export const useSurvey = () => {
  const context = useContext(SurveyContext);
  if (!context) {
    throw new Error("useSurvey must be used within SurveyProvider");
  }
  return context;
};

export const useQuestion = () => {
  const context = useContext(QuestionContext);
  if(!context){
    throw new Error("useSurvey must be used within SurveyProvider");
  }
  return context;
}

export const useAnswers = () => {
  const context = useContext(AnswerContext);
  if(!context){
    throw new Error('useAnswer must be used within AnswerProvider');
  }
  return context;
}