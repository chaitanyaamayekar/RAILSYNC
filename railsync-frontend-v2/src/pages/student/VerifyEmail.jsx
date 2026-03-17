import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/auth/verify-email/${token}`
        );

        const data = await res.json();

        if (!res.ok) throw new Error(data.message);

        alert("Email verified successfully!");
        navigate("/student/login");

      } catch (err) {
        alert(err.message);
      }
    };

    verify();
  }, [token]);

  return <h2>Verifying your email...</h2>;
};

export default VerifyEmail;