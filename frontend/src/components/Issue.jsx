import { useState } from "react"

export const Issue = ({issue, setIssues, issues}) =>{
    const [showDescripcion, setShowDescription] = useState(false)
    const [newDescription, setNewDescription] = useState('')

    const deleteIssue = () =>{
        fetch(`http://localhost:3000/api/issues/${issue.id}`,{
            method: 'DELETE',
        }).then((response) =>{
        return response.json()
        }).then(data => setIssues(data.issues))
    }

    const editDescription = () =>{
        fetch(`http://localhost:3000/api/issues/${issue.id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({newDescription })
        }).then((response) =>{
        return response.json()
        }).then(data => {
            const updatedIssues = issues.map(c => {
                if (c.id === issue.id) {
                  return { ...c, description: data.issue.description };
                }
                return c;
              });
              setIssues(updatedIssues);
        })
    }
    return(
        <div className="col-md-4 mb-4">
            <div className="card">
                <div className="card-body">
                <h5 className="card-title">{issue.title}</h5>
                <p className="card-text">{issue.description}</p>
                <button className="btn btn-primary mr-2" onClick={() => setShowDescription(!showDescripcion)}>
                    Editar description
                </button>
                <button className="btn btn-danger ms-3" onClick={deleteIssue}>
                    Delte issue
                </button>
                </div>
                {showDescripcion && 
                <div className="form-group d-flex">
                    <input
                    type="text"
                    className="form-control"
                    placeholder="Nueva descripción"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    />
                    <button className="btn btn-primary" onClick={editDescription}>Save</button>
                </div>}
            </div>
        </div>
    )
}