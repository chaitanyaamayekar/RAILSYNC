// import React, { useState } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { FaTrain, FaUniversity, FaMapMarkerAlt } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import API from "../../services/api";

// /* ---------------- VALIDATION SCHEMAS ---------------- */

// const step1Schema = Yup.object({
//   fromStation: Yup.string().required("From station is required"),
//   toStation: Yup.string().required("To station is required"),
//   travelClass: Yup.string().required("Travel class is required"),
// });

// const step2Schema = Yup.object({
//   college: Yup.string().required("College is required"),
//   year: Yup.string().required("Year is required"),
//   course: Yup.string().required("Course is required"),
// });

// /* ---------------- COMPONENT ---------------- */

// const ApplyConcession = () => {
//   const [step, setStep] = useState(1);
//   const navigate = useNavigate();

//   const formik = useFormik({
//     initialValues: {
//       fromStation: "",
//       toStation: "",
//       travelClass: "second",
//       college: "",
//       year: "",
//       course: "",
//     },

//     validationSchema: step === 1 ? step1Schema : step2Schema,

//     onSubmit: async (values, { setSubmitting }) => {
//       try {
//         const payload = {
//           fromStation: values.fromStation,
//           toStation: values.toStation,
//           travelClass: values.travelClass,
//           college: values.college,
//           year: values.year,
//           course: values.course,
//           concessionType: "Monthly",
//           duration: "monthly",
//         };

//         // 🔍 DEBUG (remove later)
//         console.log("Submitting payload:", payload);

//         const res = await API.post("/applications", payload);

//         toast.success("Application created successfully");

//         navigate(`/student/upload-documents/${res.data._id}`);
//       } catch (error) {
//         console.error("APPLICATION ERROR:", error);
//         toast.error(
//           error.response?.data?.message || "Failed to submit application"
//         );
//       } finally {
//         setSubmitting(false);
//       }
//     },
//   });

//   const handleNextStep = async () => {
//     const errors = await formik.validateForm();

//     if (Object.keys(errors).length === 0) {
//       setStep(2);
//     } else {
//       toast.error("Please fill all required fields");
//     }
//   };

//   const stations = [
//     "Churchgate","Marine Lines","Charni Road","Grant Road","Mumbai Central",
//     "Mahalaxmi","Lower Parel","Dadar","Matunga","Bandra","Khar Road",
//     "Santacruz","Vile Parle","Andheri","Jogeshwari","Goregaon","Malad",
//     "Kandivali","Borivali","Dahisar","Mira Road","Bhayandar","Naigaon",
//     "Vasai Road","Nalla Sopara","Virar",
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="container mx-auto px-4 max-w-4xl">

//         {/* HEADER */}
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-railway-blue/10 rounded-full mb-4">
//             <FaTrain className="text-3xl text-railway-blue" />
//           </div>
//           <h1 className="text-3xl font-bold text-railway-dark">
//             Apply for Railway Concession
//           </h1>
//           <p className="text-gray-600">
//             Step 1: Travel details • Step 2: Academic details
//           </p>
//         </div>

//         <div className="railway-card">
//           <form onSubmit={formik.handleSubmit}>

//             {/* -------- STEP 1 -------- */}
//             {step === 1 && (
//               <div className="space-y-6">
//                 <h3 className="text-xl font-bold flex items-center">
//                   <FaMapMarkerAlt className="mr-3 text-railway-blue" />
//                   Travel Route
//                 </h3>

//                 <div className="grid md:grid-cols-2 gap-6">
//                   <select
//                     name="fromStation"
//                     value={formik.values.fromStation}
//                     onChange={formik.handleChange}
//                     className="railway-input"
//                   >
//                     <option value="">From Station</option>
//                     {stations.map((s) => (
//                       <option key={s} value={s}>{s}</option>
//                     ))}
//                   </select>

//                   <select
//                     name="toStation"
//                     value={formik.values.toStation}
//                     onChange={formik.handleChange}
//                     className="railway-input"
//                   >
//                     <option value="">To Station</option>
//                     {stations.map((s) => (
//                       <option key={s} value={s}>{s}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   {["first", "second"].map((cls) => (
//                     <label key={cls} className="border p-4 rounded cursor-pointer">
//                       <input
//                         type="radio"
//                         name="travelClass"
//                         value={cls}
//                         checked={formik.values.travelClass === cls}
//                         onChange={formik.handleChange}
//                         className="mr-2"
//                       />
//                       {cls.toUpperCase()} CLASS
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* -------- STEP 2 -------- */}
//             {step === 2 && (
//               <div className="space-y-6">
//                 <h3 className="text-xl font-bold flex items-center">
//                   <FaUniversity className="mr-3 text-railway-blue" />
//                   Academic Details
//                 </h3>

//                 <select
//                   name="college"
//                   value={formik.values.college}
//                   onChange={formik.handleChange}
//                   className="railway-input"
//                 >
//                   <option value="">Select College</option>
//                   <option value="mumbai_university">University of Mumbai</option>
//                   <option value="sndt">SNDT</option>
//                   <option value="other">Other</option>
//                 </select>

//                 <div className="grid md:grid-cols-2 gap-6">
//                   <select
//                     name="year"
//                     value={formik.values.year}
//                     onChange={formik.handleChange}
//                     className="railway-input"
//                   >
//                     <option value="">Year</option>
//                     <option value="first">First</option>
//                     <option value="second">Second</option>
//                     <option value="third">Third</option>
//                     <option value="fourth">Fourth</option>
//                   </select>

//                   <input
//                     name="course"
//                     placeholder="Course"
//                     value={formik.values.course}
//                     onChange={formik.handleChange}
//                     className="railway-input"
//                   />
//                 </div>
//               </div>
//             )}

//             {/* -------- BUTTONS -------- */}
//             <div className="flex justify-between mt-8">
//               {step > 1 && (
//                 <button
//                   type="button"
//                   onClick={() => setStep(1)}
//                   className="railway-btn-secondary"
//                 >
//                   ← Back
//                 </button>
//               )}

//               {step === 1 ? (
//                 <button
//                   type="button"
//                   onClick={handleNextStep}
//                   className="railway-btn-primary ml-auto"
//                 >
//                   Next →
//                 </button>
//               ) : (
//                 <button
//                   type="submit"
//                   disabled={formik.isSubmitting}
//                   className="railway-btn-primary ml-auto"
//                 >
//                   Create Application →
//                 </button>
//               )}
//             </div>

//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ApplyConcession;

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaTrain, FaUniversity, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../../services/api";

/* ---------------- VALIDATION ---------------- */

const schema = Yup.object({
  fromStation: Yup.string().required("From station is required"),
  toStation: Yup.string().required("To station is required"),
  travelClass: Yup.string().required("Travel class is required"),
  college: Yup.string().required("College is required"),
  year: Yup.string().required("Year is required"),
  course: Yup.string().required("Course is required"),
});

/* ---------------- COMPONENT ---------------- */

const ApplyConcession = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fromStation: "",
      toStation: "",
      travelClass: "second",
      college: "",
      year: "",
      course: "",
    },

    validationSchema: schema,

    onSubmit: async (values, { setSubmitting }) => {
      try {
        const payload = {
          fromStation: values.fromStation,
          toStation: values.toStation,
          travelClass: values.travelClass,
          college: values.college,
          year: values.year,
          course: values.course,
          concessionType: "Monthly",
          duration: "monthly",
        };

        const res = await API.post("/applications", payload);

        toast.success("Application created successfully");

        navigate(`/student/upload-documents/${res.data._id}`);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to submit application"
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  const stations = [
    "Churchgate","Marine Lines","Charni Road","Grant Road","Mumbai Central",
    "Mahalaxmi","Lower Parel","Dadar","Matunga","Bandra","Khar Road",
    "Santacruz","Vile Parle","Andheri","Jogeshwari","Goregaon","Malad",
    "Kandivali","Borivali","Dahisar","Mira Road","Bhayandar","Naigaon",
    "Vasai Road","Nalla Sopara","Virar",
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <FaTrain className="text-3xl text-blue-600" />
          </div>

          <h1 className="text-3xl font-bold text-gray-800">
            Apply for Railway Concession
          </h1>

          <p className="text-gray-500">
            Fill your travel and academic details
          </p>
        </div>

        {/* FORM CARD */}
        <div className="bg-white shadow-xl rounded-2xl p-8">

          <form onSubmit={formik.handleSubmit} className="space-y-10">

            {/* TRAVEL DETAILS */}
            <div>

              <h2 className="text-lg font-semibold flex items-center mb-6">
                <FaMapMarkerAlt className="mr-2 text-blue-600" />
                Travel Details
              </h2>

              <div className="grid md:grid-cols-2 gap-6">

                {/* FROM STATION */}
                <div>
                  <select
                    name="fromStation"
                    value={formik.values.fromStation}
                    onChange={formik.handleChange}
                    className="w-full border rounded-lg px-4 py-3"
                  >
                    <option value="">From Station</option>
                    {stations.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>

                  {formik.errors.fromStation && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.fromStation}
                    </p>
                  )}
                </div>

                {/* TO STATION */}
                <div>
                  <select
                    name="toStation"
                    value={formik.values.toStation}
                    onChange={formik.handleChange}
                    className="w-full border rounded-lg px-4 py-3"
                  >
                    <option value="">To Station</option>
                    {stations.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>

                  {formik.errors.toStation && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.toStation}
                    </p>
                  )}
                </div>

              </div>

              {/* TRAVEL CLASS */}
              <div className="grid grid-cols-2 gap-4 mt-6">

                {["first", "second"].map((cls) => (
                  <label
                    key={cls}
                    className={`border p-4 rounded-lg cursor-pointer transition
                    ${
                      formik.values.travelClass === cls
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200"
                    }`}
                  >

                    <input
                      type="radio"
                      name="travelClass"
                      value={cls}
                      checked={formik.values.travelClass === cls}
                      onChange={formik.handleChange}
                      className="mr-2"
                    />

                    {cls.toUpperCase()} CLASS

                  </label>
                ))}

              </div>

            </div>

            {/* ACADEMIC DETAILS */}
            <div>

              <h2 className="text-lg font-semibold flex items-center mb-6">
                <FaUniversity className="mr-2 text-blue-600" />
                Academic Details
              </h2>

              {/* COLLEGE */}
              <div className="mb-6">
                <select
                  name="college"
                  value={formik.values.college}
                  onChange={formik.handleChange}
                  className="w-full border rounded-lg px-4 py-3"
                >
                  <option value="">Select College</option>
                  <option value="mumbai_university">University of Mumbai</option>
                  <option value="sndt">SNDT</option>
                  <option value="other">Other</option>
                </select>

                {formik.errors.college && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.college}
                  </p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">

                {/* YEAR */}
                <div>
                  <select
                    name="year"
                    value={formik.values.year}
                    onChange={formik.handleChange}
                    className="w-full border rounded-lg px-4 py-3"
                  >
                    <option value="">Year</option>
                    <option value="first">First</option>
                    <option value="second">Second</option>
                    <option value="third">Third</option>
                    <option value="fourth">Fourth</option>
                  </select>

                  {formik.errors.year && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.year}
                    </p>
                  )}
                </div>

                {/* COURSE */}
                <div>
                  <input
                    name="course"
                    placeholder="Course"
                    value={formik.values.course}
                    onChange={formik.handleChange}
                    className="w-full border rounded-lg px-4 py-3"
                  />

                  {formik.errors.course && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.course}
                    </p>
                  )}
                </div>

              </div>

            </div>

            {/* SUBMIT */}
            <div className="flex justify-end">

              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium"
              >
                {formik.isSubmitting
                  ? "Creating..."
                  : "Create Application →"}
              </button>

            </div>

          </form>

        </div>
      </div>
    </div>
  );
};

export default ApplyConcession;