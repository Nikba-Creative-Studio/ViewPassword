#!/bin/sh
set -eu

project_dir=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
version=$(node -p "require('$project_dir/firefox/manifest.json').version")
output_dir="$project_dir/dist"
output_file="$output_dir/viewpassword-firefox-$version.zip"
staging_dir=$(mktemp -d)

cleanup() {
  rm -rf "$staging_dir"
}
trap cleanup EXIT INT TERM

mkdir -p "$staging_dir/src" "$staging_dir/popup" "$staging_dir/icons" "$output_dir"
cp "$project_dir/firefox/manifest.json" "$staging_dir/manifest.json"
cp "$project_dir/src/content.js" "$project_dir/src/content.css" "$project_dir/src/background.js" "$staging_dir/src/"
cp "$project_dir/popup/popup.js" "$project_dir/popup/popup.html" "$project_dir/popup/popup.css" "$staging_dir/popup/"
cp "$project_dir/icons/icon16.png" "$project_dir/icons/icon48.png" "$project_dir/icons/icon128.png" "$staging_dir/icons/"

rm -f "$output_file"
(cd "$staging_dir" && zip -X -q -r "$output_file" manifest.json src popup icons)
unzip -tq "$output_file"
printf '%s\n' "$output_file"
