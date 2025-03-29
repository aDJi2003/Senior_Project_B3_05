import React, { useState, useEffect } from "react";

const funFacts = [
  "Did you know that it can take up to 1,000 years for a plastic bag to break down in the environment?",
  "Approximately 8 million tons of plastic end up in the ocean every year.",
  "Recycling one ton of paper can save around 17 trees.",
  "Glass can be recycled indefinitely without loss in quality or purity.",
  "Over 75% of waste in landfills is recyclable material."
];

const FunFactCard = () => {
  const [fact, setFact] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * funFacts.length);
    setFact(funFacts[randomIndex]);
  }, []);

  return (
    <div className="bg-[#F4FFC3] p-4 rounded-lg shadow flex flex-col justify-center items-center h-full">
      <h2 className="text-xl font-semibold text-black mb-2">Fun Fact</h2>
      <p className="text-black text-center">{fact}</p>
    </div>
  );
};

export default FunFactCard;
