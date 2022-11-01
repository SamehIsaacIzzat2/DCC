import { WidgetMode } from "./enums";

export interface IWidget {
  title: string;
  text: string;
  icon: string;
  url: string;
  tag: number;
  background: string;
  color: string;
  mode: WidgetMode;
  isVisible : boolean;
  isClickable : boolean;
  isSelectable : boolean;
}
