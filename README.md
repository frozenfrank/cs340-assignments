# cs340-assignments
Class assignments and exercises for CS 340 Software Engineering.

This repo collects all of the non-project assignments and exercies
created during CS 340, taken during Fall 2024 at Brigham Young University.

Each assignment was created independently, and is represented here as a separate branch.
The branches will not be merged together as they are mutually incompatible.

## Pushing Assignments

Use the following functions to easily add projects to this repo.
Paste the code block into your shell, and use the functions to initially upload.
After the initial setup, updates can be applied with a normal `git push` from within the folder.

```shell
# Use to push a folder into the repo on a branch with the same name.
# Intended to be used from the direct parent of the 'git' repo.
# Usage: push-assignment hello-world-exercise
# Result: A branch in the repo named 'hello-world-exercise' with the code
function push-assignment() {
  cd $1
  git branch -m $1
  git remote add origin https://github.com/frozenfrank/cs340-assignments.git
  git push
  cd ..
}

# Use to push a directory ending in "starter-code".
# Renames the directory, and then pushes the assignment.
# Usage: push-starter-code hello-world
# Result: folder & branch named "hello-world-exercise"
function push-starter-code() {
  mv "$1-starter-code" "$1-exercise"
  push-assignment "$1-exercise"
}
```
