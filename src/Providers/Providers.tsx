import { createContext, useContext, useState, ReactNode } from "react";

interface SliderContextType {
    isOpen: boolean;
    openSidebar: () => void;
}

const SliderContext = createContext<SliderContextType | undefined>(undefined);

interface SliderProviderProps {
    children: ReactNode;
}

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

export const useSlider = () => {
    const context = useContext(SliderContext);
    if (!context) {
        throw new Error("useSlider must be used within a SliderProvider");
    }
    return context;
};
