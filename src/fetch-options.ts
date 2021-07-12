import { Command } from 'commander';
import { getCwd } from './get-cwd';
import { IOptions } from './const';

export const splitVersions = (versions: string | string[] | undefined) => {
	if (typeof versions === 'object') {
		return versions;
	}
	const versionsFallback = versions !== undefined ? [] : undefined;
	return typeof versions === 'string' ? versions.split(',') : versionsFallback;
};

async function transformAnswersToOptions({
	versions,
	hooksInstalled,
	saveExact,
	security,
	dependenciesExactVersion,
	lts,
}: IOptions): Promise<IOptions> {
	try {
		const cwd = await getCwd();
		const versionsSplit = splitVersions(versions);
		return {
			cwd,
			versions: versionsSplit,
			hooksInstalled,
			saveExact,
			security,
			dependenciesExactVersion,
			lts,
		};
	} catch (err) {
		console.error(err);
		return {
			cwd: '',
			versions: undefined,
			hooksInstalled: false,
			saveExact: false,
			security: false,
			dependenciesExactVersion: false,
			lts: false,
		};
	}
}

export async function fetchOptions(): Promise<IOptions> {
	// eslint-disable-next-line
	const packageData = require('../package.json');
	const program = new Command();
	program
		.version(packageData.version)
		.option('-vs, --versions [string]', 'check versions of global packages eg. node, npm, ...')
		.option('-h, --hooksInstalled', 'check if hooks are installed, failes if not')
		.option('-s, --saveExact', 'check if npm save-exact is enabled, failes if not')
		.option('-se, --security', 'check if node version is secure, failes if not')
		.option('-d, --dependenciesExactVersion', 'check if dependencies are installed as an exact version')
		.option('-l, --lts', 'check if the used node version is LTS');

	program.parse();

	return await transformAnswersToOptions(program.opts());
}
