import React from "react";
import { Link } from "react-router-dom";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-railway-blue/10 to-white flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl max-w-3xl w-full p-8 overflow-y-auto max-h-[85vh]">

        <h1 className="text-3xl font-bold text-railway-dark mb-6 text-center">
          Terms of Service
        </h1>

        <div className="space-y-5 text-gray-700 text-sm leading-relaxed">

          <section>
            <h2 className="font-semibold text-lg text-railway-dark mb-2">1. Purpose</h2>
            <p>
              RailSync provides a digital platform for students to apply for railway
              concession passes. The system forwards applications to authorized
              administrators for verification and approval.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg text-railway-dark mb-2">2. User Responsibility</h2>
            <ul className="list-disc ml-6 space-y-1">
              <li>All information provided must be accurate and belong to you</li>
              <li>You must not upload fake or edited documents</li>
              <li>You are responsible for keeping your login credentials secure</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-lg text-railway-dark mb-2">3. Application Approval</h2>
            <p>
              RailSync does not guarantee approval of concession applications.
              Final approval is decided by railway authorities.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg text-railway-dark mb-2">4. Misuse of Platform</h2>
            <p>Accounts may be suspended if you:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>Upload forged documents</li>
              <li>Apply on behalf of another person</li>
              <li>Attempt to manipulate approval process</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-lg text-railway-dark mb-2">5. Service Availability</h2>
            <p>
              The platform may be temporarily unavailable during maintenance or updates.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg text-railway-dark mb-2">6. Updates to Terms</h2>
            <p>
              These terms may be updated without prior notice. Continued use of the
              platform indicates acceptance of updated terms.
            </p>
          </section>

        </div>

        <div className="text-center mt-8">
          <Link
            to="/student/register"
            className="text-railway-blue hover:underline font-medium"
          >
            ← Back to Registration
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Terms;
