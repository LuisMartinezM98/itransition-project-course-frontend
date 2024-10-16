type FieldType = 'text' | 'email' | 'number' | 'textarea' | 'select';

export interface FormField {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: number[]; // Solo para el tipo "select"
}

export interface FormTemplate {
  title: string;
  description: string;
  fields: FormField[];
}

export const formTemplate: FormTemplate = {
  title: "Encuesta de satisfacción",
  description: "Cuéntanos sobre tu experiencia",
  fields: [
    { name: "name", label: "Nombre", type: "text", placeholder: "Escribe tu nombre" },
    { name: "email", label: "Correo electrónico", type: "email", placeholder: "Escribe tu correo" },
    { name: "age", label: "Edad", type: "number", placeholder: "Ingresa tu edad" },
    { name: "feedback", label: "Comentarios", type: "textarea", placeholder: "Tus comentarios" },
    { name: "rating", label: "Calificación", type: "select", options: [1, 2, 3, 4, 5] }
  ]
};

