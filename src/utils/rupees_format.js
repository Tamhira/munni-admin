let INR = Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" });

export function INRFormat(inr) {
  return INR.format(inr);
}
