import { DropdownOption } from "../interfaces/DropdownOption";

export interface DataMapperDropdown {
  id: string;
  name: string;
}

export const mapDataToDropdownOption = (data: DataMapperDropdown[]): DropdownOption[] => {
  return data.map((element) => {
    return { key: element.id, value: element.name };
  });
};
