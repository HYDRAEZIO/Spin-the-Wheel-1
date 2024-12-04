import dbConnect from "../utils/dbConnect";
import Code from "../models/Code";

async function insertSampleData() {
  await dbConnect();

  const sample = new Code({
    code: "TEST123",
    prize: "10% Discount",
  });

  await sample.save();
  console.log("Sample data inserted:", sample);
}

insertSampleData().catch(console.error);