export type Message = {
  id: string;
  title: string;
  body: string;
  date: string;
  priority: "High" | "Medium" | "Low";
};

export type Directory = {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  messages: Message[];
};