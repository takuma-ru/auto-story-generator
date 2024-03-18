const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const semver = require("semver");

// Specify the path to the package.json file
const packageJsonPath = path.join(
  __dirname,
  "project-root",
  "packages",
  "auto-story-generator",
  "package.json"
);

try {
  // Read the package.json file
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

  // Get the current version of the package on npm
  const npmVersion = execSync(`npm show ${packageJson.name} version`, {
    encoding: "utf8",
  }).trim();

  // Increment the version number based on the release type
  const newVersion = semver.inc(
    npmVersion,
    process.argv[2],
    process.argv[3] === "beta" ? "beta" : undefined
  );

  // Update the version in the package.json file
  packageJson.version = newVersion;

  // Write the updated package.json back to file
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  // Create a new branch and push it to origin
  const branchName = `release/${new Date().toISOString().replace(/[-:.]/g, "")}`;
  execSync(`git checkout -b ${branchName}`);
  execSync(`git push --set-upstream origin ${branchName}`);

  // Build the package
  execSync("pnpm run build", { stdio: "inherit" });

  // Publish the package
  execSync("pnpm publish", { stdio: "inherit" });

  // Commit and push the changes
  execSync("git add .");
  execSync(`git commit -m "Release version ${newVersion}"`);
  execSync("git push origin HEAD");

  // Output the branch name
  console.log(branchName);
  /**
   * branch_name=$(node release.js major)
   * echo "The release was made on branch: $branch_name"
   */
} catch (error) {
  console.error("Error during release process:", error);
}
