export const generateFormItemSelector = (formId: string, fieldName: string) =>
  `#${formId ? `${formId}_` : ""}${fieldName}`;
