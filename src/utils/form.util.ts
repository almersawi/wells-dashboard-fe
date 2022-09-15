export default class FormUtil {
  public static getFormLabel = (isExisting: boolean) =>
    isExisting ? "Edit" : "Add";
}
