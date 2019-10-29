#!/bin/bash

mkdir -v components/atom
mkdir -v components/molecules
mkdir -v components/organisms

touch components/atom/.gitkeep
touch components/molecules/.gitkeep
touch components/organisms/.gitkeep

mkdir -v src
mkdir -v src/enums
mkdir -v src/dataset
mkdir -v src/usecase
mkdir -v src/repository
mkdir -v src/validator

touch src/enums/index.ts
touch src/dataset/.gitkeep
touch src/usecase/.gitkeep
touch src/repository/.gitkeep
touch src/validator/.gitkeep


# mkdir -v assets/css
mkdir -v assets/msg
touch assets/css/.gitkeep
touch assets/msg/.gitkeep
