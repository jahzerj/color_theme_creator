import { useEffect, useState } from "react";

export default function ContrastChecker({ hex, contrastText }) {
  const [contrastResult, setContrastResult] = useState();

  useEffect(() => {
    async function startFetching() {
        const response = await fetch(
            `https://www.aremycolorsaccessible.com/api/are-they`
        {method: "POST",
        body:JSON.stringify({hex,contrastText}),
        headers: {
            'Content-Type': 'application/json'
        },
    }
);
    }

      
console.log('for a commit')