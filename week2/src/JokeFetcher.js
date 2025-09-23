import { useEffect, useState } from "react";

function JokeFetch() {
    const [joke,setJoke]=useState({ setup:"", punchline:"" })
    const [loading, setLoading] = useState(true);
    // const [joke,setJoke]=useState("")
    const getJoke=(e)=>{
      setLoading(true); // set loading before fetching
      fetch("https://official-joke-api.appspot.com/random_joke")
        .then(res => res.json())
        .then(data => {
          setJoke(data);
          setLoading(false); // only stop loading once data is ready
        })
        .catch(err => {
          console.error("Error fetching joke:", err);
          setLoading(false); // also stop loading on error
        });
    };
            // fetch("https://official-joke-api.appspot.com/random_joke")
            // .then(res => {
            //   console.log("Raw response:", res); // Step 1: raw Response object
            //   return res.json();
            // })
            // .then(data => {
            //   console.log("Parsed JSON:", data); // Step 2: full parsed JSON object
            //   console.log("Type of parsed data:", typeof data); // should be "object"
            //   console.log("Keys in data:", Object.keys(data)); // show available keys
            //   console.log("Setup field:", data.setup); // Step 3: specific field
            //   setJoke(data.setup);
            // })
            // .catch(err => console.error("Error fetching joke:", err));}
  // Fetch joke once when component mounts
  useEffect(() => {
    alert("Components Mounts")
    getJoke();
  }, []); // empty array → runs only on mount
              return (
                <>
                  {loading ? (
                    <h2>Loading joke...</h2>
                  ) : (
                    <>
                      <h2>{joke.setup}</h2>
                      <p>{joke.punchline}</p>
                    </>
                  )}

                  <button onClick={getJoke}>Get New Joke</button>
                </>
              );
}
export default JokeFetch;