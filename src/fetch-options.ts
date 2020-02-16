import { Command } from 'commander';
import { getCwd } from './get-cwd';
import { IProgram, IOptions } from './const';

export const splitVersions = (versions: string | string[] | undefined) => {
	if (typeof versions === 'object') {
		return versions;
	}
	const versionsFallback = versions !== undefined ? [] : undefined;
	return typeof versions === 'string' ? versions.split(',') : versionsFallback;
};

async function transformAnswersToOptions({ versions, hooksInstalled, saveExact }: IProgram): Promise<IOptions> {
	try {
		const cwd = await getCwd();
		const versionsSplit = splitVersions(versions);
		return {
			cwd,
			versions: versionsSplit,
			hooksInstalled,
			saveExact,
		};
	} catch (err) {
		console.error(err);
		return {
			cwd: '',
			versions: undefined,
			hooksInstalled: false,
			saveExact: false,
		};
	}
}

export async function fetchOptions(): Promise<IOptions> {
	// eslint-disable-next-line
	const packageData = require('../package.json');

	const pg = (new Command()
		.version(packageData.version)
		.option('-vs, --versions [string]', 'check versions of global packages eg. node, npm, ...')
		.option('-h, --hooksInstalled', 'check if hooks are installed, failes if not')
		.option('-s, --saveExact', 'check if npm save-exact enabled, failes if not')
		.option('-d, --dependenciesExactVersion', 'check if all dependencies are installed in an exact version')
		.parse(process.argv) as any) as IProgram;

	return await transformAnswersToOptions(pg);
}
