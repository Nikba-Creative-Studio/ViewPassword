#!/bin/sh
set -eu

project_dir=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
output_dir="$project_dir/dist/safari"
project_dir_name="$output_dir/ViewPassword Safari"
project_file="$project_dir_name/ViewPassword Safari.xcodeproj"
staging_dir=$(mktemp -d)

cleanup() {
  rm -rf "$staging_dir"
}
trap cleanup EXIT INT TERM

mkdir -p "$staging_dir/src" "$staging_dir/popup" "$staging_dir/icons" "$output_dir"
cp "$project_dir/safari/manifest.json" "$staging_dir/manifest.json"
cp "$project_dir/src/content.js" "$project_dir/src/content.css" "$project_dir/src/background.js" "$staging_dir/src/"
cp "$project_dir/popup/popup.js" "$project_dir/popup/popup.html" "$project_dir/popup/popup.css" "$staging_dir/popup/"
cp "$project_dir/icons/icon16.png" "$project_dir/icons/icon48.png" "$project_dir/icons/icon128.png" "$staging_dir/icons/"

# Finder metadata and resource forks make App Store code signing fail.
xattr -cr "$staging_dir"

xcrun safari-web-extension-converter \
  --project-location "$output_dir" \
  --app-name "ViewPassword Safari" \
  --bundle-identifier "com.nikba.viewpassword" \
  --swift \
  --copy-resources \
  --no-open \
  --no-prompt \
  --force \
  "$staging_dir"

xattr -cr "$project_dir_name"
/usr/libexec/PlistBuddy -c "Add :LSApplicationCategoryType string public.app-category.utilities" \
  "$project_dir_name/macOS (App)/Info.plist" 2>/dev/null || \
  /usr/libexec/PlistBuddy -c "Set :LSApplicationCategoryType public.app-category.utilities" \
    "$project_dir_name/macOS (App)/Info.plist"

for app_info_plist in \
  "$project_dir_name/macOS (App)/Info.plist" \
  "$project_dir_name/iOS (App)/Info.plist"
do
  /usr/libexec/PlistBuddy -c "Add :ITSAppUsesNonExemptEncryption bool false" \
    "$app_info_plist" 2>/dev/null || \
    /usr/libexec/PlistBuddy -c "Set :ITSAppUsesNonExemptEncryption false" \
      "$app_info_plist"
done

printf '%s\n' "$project_file"
