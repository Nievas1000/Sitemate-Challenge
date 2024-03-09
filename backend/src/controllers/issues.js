const issues = require("../api/db.json");

exports.getAllIssues = (req, res) => {
  res.send({ issues });
};

exports.getIssueById = (req, res) => {
  const id = parseInt(req.params.id);

  if (id) {
    const issue = issues.find((x) => x.id === id);

    if (issue) {
      res.status(200).json({ message: `Issue with id ${id}: `, issue });
    } else {
      res.status(404).json({ messaje: "Issue not found" });
    }
  } else {
    res.status(400).json({ message: "Missing fields." });
  }
};

exports.addNewIssue = (req, res) => {
  const { title, description } = req.body;

  if (title && description) {
    issues.push({
      id: issues.length + 1,
      title,
      description,
    });

    res.status(200).json({
      message: "New issue added successfully",
      issue: {
        id: issues.length + 1,
        title,
        description,
      },
    });
  } else {
    res.status(400).json({ message: "Missing fields." });
  }
};

exports.updateDescription = (req, res) => {
  const id = parseInt(req.params.id);
  const { newDescription } = req.body;

  if (id && newDescription) {
    const issueToUpdate = issues.find((issue) => issue.id === id);
    if (issueToUpdate) {
      issueToUpdate.description = newDescription;
      res.status(200).json({
        message: `Description of issue with ID ${id} updated to: ${newDescription}`,
        issue: issueToUpdate,
      });
    } else {
      res.status(404).json({ error: "Issue not found." });
    }
  } else {
    res.status(400).json({ message: "Missing fields." });
  }
};

exports.deleteIssue = (req, res) => {
  const id = parseInt(req.params.id);

  if (id) {
    const index = issues.findIndex((issue) => issue.id === id);
    if (index !== -1) {
      issues.splice(index, 1);
      res.status(200).json({
        message: `Issue with ID ${id} successfully deleted`,
        issues,
      });
    } else {
      res.status(404).json({ error: "Issue not found." });
    }
  } else {
    res.status(400).json({ message: "Missing fields." });
  }
};
