export type PostFormValues = {
  admin_id: string;
  title: string;
  content: string;
  tag: string;
  images: string[];
  urgent: boolean;
};

export type EditorType = {
  value: string;
  setValue: (value: string) => void;
};

export type PostImgType = {
  selectedImg: string[];
  setSelectedImg: (value: string[]) => void;
};
