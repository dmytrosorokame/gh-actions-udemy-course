const core = require("@actions/core");
const github = require("@actions/github");
const exec = require("@actions/exec");

function run() {
  // 1) Get inputs
  const bucket = core.getInput("bucket", { required: true });
  const bucketRegion = core.getInput("bucket-region", { required: true });
  const sourceDir = core.getInput("source-dir", { required: true });

  // 2) Upload files to S3
  const s3uri = `s3://${bucket}`;
  exec.exec(`aws s3 sync ${sourceDir} ${s3uri} --region ${bucketRegion}`);

  const websiteUrl = `http://${bucket}.s3-website.${bucketRegion}.amazonaws.com`;

  core.setOutput("website-url", websiteUrl);
}

run();
