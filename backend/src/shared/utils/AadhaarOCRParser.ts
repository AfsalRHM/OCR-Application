export function parseAadhaarOCRData(text: string): { [key: string]: string } {
  const data: { [key: string]: string } = {};

  const cleanText = text.replace(/[^A-Za-z\s]/g, "").trim();
  const nameMatch = cleanText.match(/Government of India\s*([\w\s]+)\s*DOB/);
  data.name = nameMatch ? nameMatch[1].trim() : "Unable to Fetch Name";

  const dobMatch = text.match(/DOB\s*[:|-]?\s*(\d{2}\/\d{2}\/\d{4})/);
  data.dob = dobMatch ? dobMatch[1] : "Unable to Fetch DOB";

  const genderMatch = text.toLowerCase().includes("male");
  data.gender = genderMatch
    ? "Male"
    : text.toLowerCase().includes("female")
    ? "Female"
    : "Unable to Fetch Gender";

  const aadhaarMatch = text.match(/\d{4}\s\d{4}\s\d{4}/);
  data.aadhaarNumber = aadhaarMatch
    ? aadhaarMatch[0].replace(/\s/g, "")
    : "Unable to Fetch Aadhaar Number";

  const addressMatch = text.match(/Address\s*[:|-]?\s*([\s\S]+?)\s*(\d{6})/);
  data.address = addressMatch
    ? addressMatch[1].trim()
    : "Unable to Fetch Address";

  const pincodeMatch = text.match(/\d{6}(?=\s*[\.,]?)/);
  data.pincode = pincodeMatch ? pincodeMatch[0] : "Unable to Fetch Pincode";

  return data;
}
