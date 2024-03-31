import "vue3-toastify";
import { toast } from "vue3-toastify";

function getErrorMessage(error: any) {
  return error &&
    typeof error == "object" &&
    "response" in error &&
    error.response.data &&
    error.response.status < 500 &&
    error.response.status >= 400 &&
    "detail" in error.response.data
    ? error.response.data.detail
    : undefined;
}

export function handleError(error: any, defaultText: string) {
  const errorText = getErrorMessage(error);

  toast.error(errorText || defaultText);
}
