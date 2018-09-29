async function x() {
  console.log("start");
  throw new Error("error occur");
  console.log("end");
}

x();
