import chalk from 'chalk';
import { isCI } from 'ci-info';
import { getCwd } from './get-cwd';
import { getExactDependencyVersionsChecker } from './exact-dependency-versions';
import { getHooksInstalledChecker } from './hooks-installed';
import { getNodeLTSChecker } from './lts';
import { getNodeSecurityChecker } from './security';
import { getSaveExactChecker } from './save-exact';
import { getVersionCheckers } from './version-checker';
import { ILogMessage, IOptions } from './const';
import { splitVersions } from './fetch-options';

export interface IApiOptions {
	cwd?: string;
	versions?: string[];
	lts?: boolean;
	security?: boolean;
	hooksInstalled?: boolean;
	saveExact?: boolean;
	dependenciesExactVersion?: boolean;
}

export async function api(apiOptions: IApiOptions) {
	const cwd = await getCwd();
	const options: IOptions = {
		cwd,
		versions: splitVersions(apiOptions.versions),
		lts: apiOptions.lts,
		security: apiOptions.security,
		hooksInstalled: apiOptions.hooksInstalled,
		saveExact: apiOptions.saveExact,
		dependenciesExactVersion: apiOptions.dependenciesExactVersion,
	};

	try {
		const skipChecks = process.env.ENV_LINTER_SKIP === 'true';
		if (skipChecks || isCI) {
			return;
		}

		const checkers: Promise<ILogMessage>[] = [];

		if (options.versions) {
			checkers.push(...(await getVersionCheckers(options.versions)));
		}

		if (options.lts) {
			checkers.push(getNodeLTSChecker());
		}

		if (options.security) {
			checkers.push(getNodeSecurityChecker());
		}

		if (options.hooksInstalled) {
			checkers.push(getHooksInstalledChecker());
		}

		if (options.saveExact) {
			checkers.push(getSaveExactChecker());
		}

		if (options.dependenciesExactVersion) {
			checkers.push(getExactDependencyVersionsChecker());
		}

		const results = await Promise.all(checkers);
		const hasErrors = results.reduce((acc, result) => {
			console.info(result.text);
			return acc || result.error;
		}, false);

		if (hasErrors) {
			console.error(chalk.red('Stopping any further processes!'));
			process.exit(1);
		}
	} catch (err) {
		console.error(chalk.red(err));
		process.exit(2);
	}
}
