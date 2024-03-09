const express = require("express");
const router = express.Router();
const issuesController = require("../controllers/issues");

router.route("/").get(issuesController.getAllIssues);
router.route("/:id").get(issuesController.getIssueById);
router.route("/").post(issuesController.addNewIssue);
router.route("/:id").put(issuesController.updateDescription);
router.route("/:id").delete(issuesController.deleteIssue);

module.exports = router;
