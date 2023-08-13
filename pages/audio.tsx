import Head from "next/head";
import styles from "./index.module.css";

export default function Audio() {

  async function onSubmit(event) {
    event.preventDefault();
    const uploadFile: any = document.querySelector('#file');
    let formData = new FormData();
    formData.append('file', uploadFile.files[0])
    console.log('--------submit--')
    try {
      const response = await fetch("/api/translate", {
        method: 'POST',
        body: formData
      })
      const data = await response.json();
      console.log('----data: ', data.result);
    } catch (error) {
      
    }
  }
  
  return (
    <div>
      <Head>
        <title>Audio</title>
        <link rel="icon" href="/dog.png" />
      </Head>
  
      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Transcribe Audio</h3>
        <h4>Transcribe audio into whatever language the audio is in.</h4>
        <form onSubmit={onSubmit}>
          <input type="file" name="file" id="file" />
          <input type="submit" value="Submit" />
        </form>
      </main>
    </div>
  )
}
