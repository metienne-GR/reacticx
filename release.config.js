module.exports = {
  branches: ["main", "master"],

  plugins: [
    "@semantic-release/commit-analyzer",

    [
      "@semantic-release/release-notes-generator",
      {
        preset: "conventionalcommits",
        presetConfig: {
          types: [
            { type: "feat", section: "✨ Features" },
            { type: "fix", section: "🐛 Bug Fixes" },
            { type: "docs", section: "📝 Documentation" },
            { type: "chore", section: "⚙️ Chores" },
          ],
        },
      },
    ],

    [
      "@semantic-release/changelog",
      {
        changelogTitle:
          "# Changelog\n\nAll notable changes to this project will be documented in this file.\n",
      },
    ],

    "@semantic-release/npm",
    "@semantic-release/github",

    [
      "@semantic-release/git",
      {
        assets: ["CHANGELOG.md", "package.json"],
        message:
          "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
      },
    ],
  ],
};
