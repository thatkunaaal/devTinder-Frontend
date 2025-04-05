import React from "react";

const PremiumPlan = () => {
  return (
    
    <div className="flex flex-wrap justify-center stats shadow sm:m-10 mg:m-15 lg:m-20">
        <div>
      <div className="stat ">
        <div className="stat-figure text-primary flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-8 w-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            ></path>
          </svg>
          <button className="btn btn-outline btn-primary mt-5 btn-lg">Buy Silver</button>
        </div>
        <div className="stat-title text-xl font-bold text-white">
          Silver Plan
        </div>
        <div className="stat-value text-primary">700₹</div>
        {/* <div className="stat-desc text-white">40% user chosse this plan</div> */}
        <div >
          <ul>
            <li className="m-5"> 🔗 50 Connections per Day</li>

            <li className="m-5"> ✅ Blue Tick Verification </li>

            <li className="m-5"> 📅 3 Months Access</li>
          </ul>
        </div>
      </div>
      </div>
      <div>
      <div className="stat ">
        <div className="stat-figure text-secondary flex flex-col items-center ">
        <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="inline-block h-8 w-8 stroke-current">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 10V3L4 14h7v7l9-11h-7z"></path>
      </svg>
          <button className="btn btn-outline btn-secondary mt-5 btn-lg">Buy Gold</button>
        </div>
        <div className="stat-title text-xl font-bold text-white">
          Gold Plan
        </div>
        <div className="stat-value text-secondary">1200₹</div>
        {/* <div className="stat-desc text-white">40% user chosse this plan</div> */}
        <div >
          <ul>
            <li className="m-5"> 🔗 Unlimited Connections per Day</li>

            <li className="m-5"> ✅ Blue Tick Verification </li>

            <li className="m-5"> 📅 6 Months Access</li>
          </ul>
        </div>
      </div>
      </div>
    </div>
  );
};

export default PremiumPlan;
