// import React, { useState } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { FaTrain, FaUniversity, FaMapMarkerAlt } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import API from "../../services/api"; // ✅ your existing axios instance

// const ApplyConcession = () => {
//   const [step, setStep] = useState(1);
//   const navigate = useNavigate();

//   const validationSchema = Yup.object({
//     fromStation: Yup.string().required("Required"),
//     toStation: Yup.string().required("Required"),
//     travelClass: Yup.string().required("Required"),
//     college: Yup.string().required("Required"),
//     year: Yup.string().required("Required"),
//     course: Yup.string().required("Required"),
//   });

//   const formik = useFormik({
//     initialValues: {
//       fromStation: "",
//       toStation: "",
//       travelClass: "second",
//       college: "",
//       year: "",
//       course: "",
//     },
//     validationSchema,
//   //   onSubmit: async (values, { setSubmitting }) => {
//   //     try {
//   //       const res = await API.post("/application", values);

//   //       toast.success("Application created successfully");

//   //       // 👉 Redirect to document upload page
//   //       navigate(`/student/upload-documents/${res.data._id}`);
//   //     } catch (error) {
//   //       toast.error(
//   //         error.response?.data?.message || "Failed to submit application"
//   //       );
//   //     } finally {
//   //       setSubmitting(false);
//   //     }
//   //   },
//   // });
//   onSubmit: async (values, { setSubmitting }) => {
//   try {
//     const payload = {
//       college: values.college,
//       fromStation: values.fromStation,
//       toStation: values.toStation,
//       travelClass: values.travelClass,
//       year: values.year,
//       course: values.course,
//       concessionType: "Monthly", // default
//       duration: "monthly"        // default
//     };

//     const res = await API.post("/application", payload);
// console.log("APPLICATION RESPONSE:", res.data);
//     toast.success("Application created successfully");
//     navigate(`/student/upload-documents/${res.data._id}`);
//   } catch (error) {
//     toast.error(error.response?.data?.message || "Failed to submit application");
//   } finally {
//     setSubmitting(false);
//   }
//   }
//   })

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

//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-railway-blue/10 rounded-full mb-4">
//             <FaTrain className="text-3xl text-railway-blue" />
//           </div>
//           <h1 className="text-3xl font-bold text-railway-dark">
//             Apply for Railway Concession
//           </h1>
//           <p className="text-gray-600">
//             Step 1: Application details • Step 2: Upload documents
//           </p>
//         </div>

//         {/* Stepper */}
//         <div className="railway-stepper mb-8">
//           {[1, 2].map((s) => (
//             <React.Fragment key={s}>
//               <div
//                 className={`railway-stepper-step ${
//                   step === s
//                     ? "step-active"
//                     : step > s
//                     ? "step-completed"
//                     : "step-inactive"
//                 }`}
//               >
//                 <div className="stepper-number">{s}</div>
//                 <div className="ml-3 hidden sm:block font-medium">
//                   {s === 1 ? "Travel Details" : "Academic Details"}
//                 </div>
//               </div>
//               {s === 1 && <div className="stepper-line"></div>}
//             </React.Fragment>
//           ))}
//         </div>

//         {/* Form */}
//         <div className="railway-card">
//           <form onSubmit={formik.handleSubmit}>

//             {/* STEP 1 */}
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
//                       <option key={s}>{s}</option>
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
//                       <option key={s}>{s}</option>
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

//             {/* STEP 2 */}
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

//             {/* Buttons */}
//             <div className="flex justify-between mt-8">
//               {step > 1 && (
//                 <button
//                   type="button"
//                   onClick={() => setStep(step - 1)}
//                   className="railway-btn-secondary"
//                 >
//                   ← Back
//                 </button>
//               )}

//               {step < 2 ? (
//                 <button
//                   type="button"
//                   onClick={() => setStep(step + 1)}
//                   className="railway-btn-primary ml-auto"
//                 >
//                   Next →
//                 </button>
//               ) : (
//                 <button
//                   type="submit"
//                   className="railway-btn-primary ml-auto"
//                   disabled={formik.isSubmitting}
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
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaTrain, FaUniversity, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../../services/api";

/* ---------------- VALIDATION SCHEMAS ---------------- */

const step1Schema = Yup.object({
  fromStation: Yup.string().required("From station is required"),
  toStation: Yup.string().required("To station is required"),
  travelClass: Yup.string().required("Travel class is required"),
});

const step2Schema = Yup.object({
  college: Yup.string().required("College is required"),
  year: Yup.string().required("Year is required"),
  course: Yup.string().required("Course is required"),
});

/* ---------------- COMPONENT ---------------- */

const ApplyConcession = () => {
  const [step, setStep] = useState(1);
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

    validationSchema: step === 1 ? step1Schema : step2Schema,

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

        // 🔍 DEBUG (remove later)
        console.log("Submitting payload:", payload);

        const res = await API.post("/application", payload);

        toast.success("Application created successfully");

        navigate(`/student/upload-documents/${res.data._id}`);
      } catch (error) {
        console.error("APPLICATION ERROR:", error);
        toast.error(
          error.response?.data?.message || "Failed to submit application"
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleNextStep = async () => {
    const errors = await formik.validateForm();

    if (Object.keys(errors).length === 0) {
      setStep(2);
    } else {
      toast.error("Please fill all required fields");
    }
  };

  const stations = [
    "Churchgate","Marine Lines","Charni Road","Grant Road","Mumbai Central",
    "Mahalaxmi","Lower Parel","Dadar","Matunga","Bandra","Khar Road",
    "Santacruz","Vile Parle","Andheri","Jogeshwari","Goregaon","Malad",
    "Kandivali","Borivali","Dahisar","Mira Road","Bhayandar","Naigaon",
    "Vasai Road","Nalla Sopara","Virar",
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">

        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-railway-blue/10 rounded-full mb-4">
            <FaTrain className="text-3xl text-railway-blue" />
          </div>
          <h1 className="text-3xl font-bold text-railway-dark">
            Apply for Railway Concession
          </h1>
          <p className="text-gray-600">
            Step 1: Travel details • Step 2: Academic details
          </p>
        </div>

        <div className="railway-card">
          <form onSubmit={formik.handleSubmit}>

            {/* -------- STEP 1 -------- */}
            {step === 1 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold flex items-center">
                  <FaMapMarkerAlt className="mr-3 text-railway-blue" />
                  Travel Route
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <select
                    name="fromStation"
                    value={formik.values.fromStation}
                    onChange={formik.handleChange}
                    className="railway-input"
                  >
                    <option value="">From Station</option>
                    {stations.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>

                  <select
                    name="toStation"
                    value={formik.values.toStation}
                    onChange={formik.handleChange}
                    className="railway-input"
                  >
                    <option value="">To Station</option>
                    {stations.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {["first", "second"].map((cls) => (
                    <label key={cls} className="border p-4 rounded cursor-pointer">
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
            )}

            {/* -------- STEP 2 -------- */}
            {step === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold flex items-center">
                  <FaUniversity className="mr-3 text-railway-blue" />
                  Academic Details
                </h3>

                <select
                  name="college"
                  value={formik.values.college}
                  onChange={formik.handleChange}
                  className="railway-input"
                >
                  <option value="">Select College</option>
                  <option value="mumbai_university">University of Mumbai</option>
                  <option value="sndt">SNDT</option>
                  <option value="other">Other</option>
                </select>

                <div className="grid md:grid-cols-2 gap-6">
                  <select
                    name="year"
                    value={formik.values.year}
                    onChange={formik.handleChange}
                    className="railway-input"
                  >
                    <option value="">Year</option>
                    <option value="first">First</option>
                    <option value="second">Second</option>
                    <option value="third">Third</option>
                    <option value="fourth">Fourth</option>
                  </select>

                  <input
                    name="course"
                    placeholder="Course"
                    value={formik.values.course}
                    onChange={formik.handleChange}
                    className="railway-input"
                  />
                </div>
              </div>
            )}

            {/* -------- BUTTONS -------- */}
            <div className="flex justify-between mt-8">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="railway-btn-secondary"
                >
                  ← Back
                </button>
              )}

              {step === 1 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="railway-btn-primary ml-auto"
                >
                  Next →
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="railway-btn-primary ml-auto"
                >
                  Create Application →
                </button>
              )}
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyConcession;
