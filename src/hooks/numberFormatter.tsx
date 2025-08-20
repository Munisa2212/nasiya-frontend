
export function NumberFormatter(num: number | string) {
    if (num === null || num === undefined || num === "") return "";
    return num
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
