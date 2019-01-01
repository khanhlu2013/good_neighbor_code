import * as Yup from "yup";

const OutPostItemSchemaValidation = Yup.object().shape({
  title: Yup.string()
    .min(3, "Too Short!")
    .required("Required"),
  description: Yup.string()
    .min(3, "Too Short!")
    .required("Required"),
  isActive: Yup.boolean().required("Required")
});

export default OutPostItemSchemaValidation;
