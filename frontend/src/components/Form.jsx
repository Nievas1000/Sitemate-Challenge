import { useState } from "react";

export const Form = ({setIssues}) =>{
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const createIssue = () =>{
        if(title !== '' && description !== ''){
            fetch(`http://localhost:3000/api/issues`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title, description })
            }).then((response) =>{
            return response.json()
            }).then(data => {
                  setIssues((prevIssues) => [...prevIssues, data.issue]);
            })
        }
    }
    return (
        <div>
        <h2>Create a new Issue</h2>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              className="form-control"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary" onClick={createIssue}>Add Issue</button>
        </div>
      );
}