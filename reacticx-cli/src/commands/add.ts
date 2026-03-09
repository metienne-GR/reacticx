import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import ora from "ora";
import prompts from "prompts";
import { getRegistry, getComponentCode } from "../utils/registry.js";
import { getConfig, validateOrCreateOutDir } from "../utils/config.js";
import type { AddOptions } from "../typings/index.js";

export async function add<T extends string>(
  componentName: T | undefined,
  options: AddOptions,
) {
  const config = await getConfig();

  if (!componentName) {
    const spinner = ora("Fetching components...").start();
    let registry;
    try {
      registry = await getRegistry();
      spinner.stop();
    } catch (error) {
      spinner.fail(chalk.red("Failed to fetch components"));
      console.error(error);
      process.exit(1);
    }

    const byCategory: Record<string, string[]> = {};
    for (const [name, info] of Object.entries(registry.components)) {
      if (!byCategory[info.category]) byCategory[info.category] = [];
      byCategory[info.category].push(name);
    }

    const choices = Object.entries(byCategory)
      .sort(([a], [b]) => a.localeCompare(b))
      .flatMap(([category, names]) => [
        {
          title: chalk.cyan.bold(`── ${category} ──`),
          value: null,
          disabled: true,
        },
        ...names.sort().map((name) => ({ title: name, value: name })),
      ]);

    const response = await prompts({
      type: "autocomplete",
      name: "component",
      message: "Select a component to add",
      choices,
      suggest: (input: string, choices: prompts.Choice[]) =>
        Promise.resolve(
          choices.filter(
            (c) =>
              c.value &&
              (c.value as string).toLowerCase().includes(input.toLowerCase()),
          ),
        ),
    });

    if (!response.component) {
      console.log(chalk.dim("Cancelled."));
      process.exit(0);
    }

    componentName = response.component as T;
  }

  if (!config && !options.dir) {
    console.log(chalk.red("\n❌ No component.config.json found"));
    console.log(chalk.dim("\nCreate one in your project root:"));
    console.log(
      chalk.cyan(JSON.stringify({ outDir: "src/shared/ui" }, null, 2)),
    );
    console.log(chalk.dim("\nOr use --dir flag:"));
    console.log(
      chalk.cyan(`  npx reacticx add ${componentName} --dir src/components`),
    );
    process.exit(1);
  }

  const outDir = options.dir || config!.outDir;

  const spinner = ora(`Fetching ${componentName}...`).start();

  try {
    const registry = await getRegistry();

    const component = registry.components[componentName];

    if (!component) {
      spinner.fail(chalk.red(`Component "${componentName}" not found`));
      console.log(chalk.yellow("\nAvailable components:"));

      const names = Object.keys(registry.components).sort();
      const suggestions = names.filter((n) =>
        n.toLowerCase().includes(componentName.toLowerCase()),
      );

      if (suggestions.length > 0) {
        console.log(chalk.dim("Did you mean:"));
        suggestions.slice(0, 5).forEach((s) => console.log(`  - ${s}`));
      } else {
        console.log(chalk.dim(`Run "npx reacticx list" to see all components`));
      }

      process.exit(1);
    }

    spinner.text = `Adding ${componentName}...`;

    await validateOrCreateOutDir(outDir);

    const componentDir = options.dir
      ? path.join(process.cwd(), outDir)
      : path.join(process.cwd(), outDir, component.category, componentName);

    if (!options.overwrite) {
      const existingFiles: string[] = [];
      for (const fileName of component.files) {
        const filePath = path.join(componentDir, fileName);
        if (await fs.pathExists(filePath)) {
          existingFiles.push(fileName);
        }
      }
      if (component.folders) {
        for (const folder of component.folders) {
          for (const fileName of folder.files) {
            const filePath = path.join(componentDir, folder.name, fileName);
            if (await fs.pathExists(filePath)) {
              existingFiles.push(`${folder.name}/${fileName}`);
            }
          }
        }
      }
      if (existingFiles.length > 0) {
        spinner.warn(
          chalk.yellow(
            `${componentName} already exists. Use --overwrite to replace.`,
          ),
        );
        process.exit(1);
      }
    }

    await fs.ensureDir(componentDir);

    const writtenFiles: string[] = [];

    for (const fileName of component.files) {
      const code = await getComponentCode(component.path, fileName);
      const filePath = path.join(componentDir, fileName);
      await fs.writeFile(filePath, code, "utf-8");
      writtenFiles.push(filePath);
    }

    if (component.folders && component.folders.length > 0) {
      for (const folder of component.folders) {
        const folderPath = path.join(componentDir, folder.name);
        await fs.ensureDir(folderPath);

        for (const fileName of folder.files) {
          const code = await getComponentCode(
            component.path,
            `${folder.name}/${fileName}`,
          );
          const filePath = path.join(componentDir, folder.name, fileName);

          await fs.ensureDir(path.dirname(filePath));

          await fs.writeFile(filePath, code, "utf-8");
          writtenFiles.push(filePath);
        }
      }
    }

    spinner.succeed(chalk.green(`Added ${componentName}!`));

    console.log(chalk.dim("\nFiles created:"));
    writtenFiles.forEach((file) => {
      const relative = path.relative(process.cwd(), file);
      console.log(chalk.dim(`  ${relative}`));
    });

    console.log();
  } catch (error) {
    spinner.fail(chalk.red(`Failed to add ${componentName}`));
    console.error(error);
    process.exit(1);
  }
}
