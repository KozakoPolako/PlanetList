import dayjs from "dayjs";
import "dayjs/locale/en";
import "dayjs/locale/pl";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localizedFormat);
