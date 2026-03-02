import React from "react";
import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-railway-blue/10 to-white flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl max-w-3xl w-full p-8 overflow-y-auto max-h-[85vh]">

        <h1 className="text-3xl font-bold text-railway-dark mb-6 text-center">
          Privacy Policy
        </h1>

        <div className="space-y-5 text-gray-700 text-sm leading-relaxed">

          <section>
            <h2 className="font-semibold text-lg text-railway-dark mb-2">Data We Collect</h2>
            <ul className="list-disc ml-6 space-y-1">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>College information</li>
              <li>Address</li>
              <li>Uploaded identification documents</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-lg text-railway-dark mb-2">Purpose of Collection</h2>
            <p>
              The collected data is used solely for student concession verification,
              application processing, and administrative communication.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg text-railway-dark mb-2">Data Sharing</h2>
            <p>
              We do not sell, trade, or share your personal data with third parties.
              Data is accessible only to authorized administrators for verification purposes.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg text-railway-dark mb-2">Data Storage</h2>
            <p>
              Documents and user information are securely stored in database servers
              and protected cloud storage systems.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg text-railway-dark mb-2">User Rights</h2>
            <p>
              Users may request account deletion by contacting the administrator.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg text-railway-dark mb-2">Security</h2>
            <p>
              We use encrypted passwords and authentication tokens to ensure account security.
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

export default Privacy;
