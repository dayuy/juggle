import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [SentenceInput, setSentenceInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/grammar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sentence: SentenceInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setSentenceInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>Grammar Correct</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <h3>Grammar correct</h3>
        <h4>Improve your spelling and grammar by correcting errors in your writing.</h4>
        <form onSubmit={onSubmit}>
          <textarea
            // type="text"
            rows={3}
            name="sentence"
            placeholder="Enter a sentence"
            value={SentenceInput}
            onChange={(e) => setSentenceInput(e.target.value)}
          />
          <input type="submit" value="submit" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
