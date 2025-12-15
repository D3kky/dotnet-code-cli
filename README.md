# DOTNET-CODE

# Idea
Utilizing workspaces to open monorepos from reading a solution

# How to run
`deno task start { pathtoyoursolution }`

# How to install to use as a cli
`deno task install-cli`
after installation simply run
`dotnet-code {pathtoyoursolution}`

If you want to change the name of the cli tool simply go into `deno.json` and change the value of `--name` flag