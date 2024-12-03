# 🦜 CS 340 Assignments

Class assignments and exercises for CS 340 Software Engineering.

This repo collects all of the non-project assignments and exercises
created during CS 340, taken during Fall 2024 at Brigham Young University.

Each assignment was created independently, and is represented here as a separate branch.
The branches will not be merged together as they are mutually incompatible.

## Creating TS Projects

Leverage the [`create-ts-project.sh`](https://github.com/frozenfrank/byte-bin/blob/main/shell/create-ts-project.sh) script.

Follow the [Installation Instructions](https://github.com/frozenfrank/byte-bin/tree/main?tab=readme-ov-file#installation)
to have the script added to your `$PATH` variable.

Additionally, on my local machine, I have a symlink to the script in my root directory
which provides redundant, easy access on demand.

## Pushing Assignments

Bash aliases have been created to easily add projects to this repo.
`source` the alias file, and use the functions to initially upload.
After the initial setup, updates can be applied with a normal `git push` from within the folder.

```shell
source push-assignments.aliases

# Use to push a folder into the repo on a branch with the same name.
# Intended to be used from the direct parent of the 'git' repo.
# Usage: push-assignment hello-world-exercise
# Result: A branch in the repo named 'hello-world-exercise' with the code
push-assignment hello-world-exercise

# Use to push a directory ending in "starter-code".
# Renames the directory, and then pushes the assignment.
# Usage: push-starter-code hello-world
# Result: folder & branch named "hello-world-exercise"
push-starter-code hello-world
```
