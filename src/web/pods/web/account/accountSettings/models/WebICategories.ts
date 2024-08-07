export interface WebICategory {
  id: number;
  name: string;
  priority: number;
  icon: string;
  color: string;
}

export const WebCategoriesInitialState: WebICategory = {
  id: 0,
  name: "",
  priority: 0,
  icon: "",
  color: "",
};
