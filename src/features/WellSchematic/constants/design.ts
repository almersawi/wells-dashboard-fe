export const Colors = {
  primary: "#A27B5C",
  primaryLight: "#d9d9d9",
  casingLine: "#324553",
  tubingLine: "#333",
  holeLine: "#A27B5C",
  cement: "#efefef",
  tubingFill: "#e7f3f2",
};

export const FontFamily = {
  primary: "Roboto,'Helvetica Neue',sans-serif",
};

export const Strokes = {
  casingLine: 2.5,
  tubingLine: 1.5,
  holeLine: 1.5,
  casingShoeTringle: 10,
};

export const Margins = {
  yLabels: 15,
  xLabel: 12,
};

export const FontSize = {
  labels: 11,
};

export const Width = {
  labels: 100,
};

export const HOLE_SIZE = ({ OD }: { OD: number }) => OD * 1.25;
