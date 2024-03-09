import { useEffect } from "react"
import { useState } from "react"
import { Issue } from "./components/Issue"
import { Form } from "./components/Form"


function App() {
  const [issues, setIssues] = useState([])

  useEffect(() =>{
    fetch('http://localhost:3000/api/issues').then((response) =>{
      return response.json()
    }).then(data => setIssues(data.issues))
  }, [])
  console.log(issues);
  return (
    <div className="container mt-4">
      <h1>Cars</h1>
      <div className="row">
        {issues && issues.map(issue => (
          <Issue key={issue.id} issue={issue} setIssues={setIssues} issues={issues}/>
        ))}
      </div>
      <Form setIssues={setIssues} />
    </div>
  )
}

export default App
