import chalk from 'chalk';
import logSymbols from 'log-symbols';
import terminalLink from 'terminal-link';
import { MarkdownDocsNames, PackageDependencyKeys } from './const';

// eslint-disable-next-line
const packageData = require('../package.json');
const homepageURL = packageData.homepage;
const pathToDocsFolder = '/tree/master/docs/';

const createTerminalLink = (slug: MarkdownDocsNames) =>
	terminalLink('Why is this?', `${homepageURL}${pathToDocsFolder}${slug}.md`);

export const logMessages = {
	success: {
		nodeVersionWorksWithNPMVersion: (usedNodeVersion: string, usedNPMVersion: string) =>
			chalk.green(
				`${logSymbols.success} Your node version ${usedNodeVersion} works with your npm version ${usedNPMVersion}.`
			),
		nodeVersionLTS: (usedNodeVersion: string) =>
			chalk.green(`${logSymbols.success} Your node version ${usedNodeVersion} is a LTS version.`),
		nodeVersionSecurity: (usedNodeVersion: string) =>
			chalk.green(`${logSymbols.success} Your node version ${usedNodeVersion} is a secure version.`),
		programVersionSatisfies: (program: string, usedVersion: string, expectedVersion: string) =>
			chalk.green(
				`${logSymbols.success} Your ${program} version ${usedVersion} works with the required version (${expectedVersion}) of your project.`
			),
		saveExactIsOn: () => chalk.green(`${logSymbols.success} NPM save-exact config is set to true.`),
		gitHooksAreInstalled: () => chalk.green(`${logSymbols.success} Git hooks are installed.`),
		allDependenciesExact: (type: PackageDependencyKeys, pkgName: string) =>
			chalk.green(
				`${logSymbols.success} All ${type} in ${pkgName} have been installed by exact version definition.`
			),
	},
	error: {
		nodeVersionNotLTSError: (usedNodeVersion: string) =>
			chalk.red(
				`${
					logSymbols.error
				} Change node-version! You are using node ${usedNodeVersion} which is not an LTS version. ${createTerminalLink(
					'lts'
				)}`
			),
		nodeVersionNotSecureError: (usedNodeVersion: string) =>
			chalk.red(
				`${logSymbols.error} Change node-version! There is a security update for your used major version. You are using node ${usedNodeVersion} which is not considered secure. ${createTerminalLink('security')}`
			),
		wrongNPMVersionError: (usedNodeVersion: string, usedNPMVersion: string) =>
			chalk.red(
				`${
					logSymbols.error
				} Change npm version! You are using node ${usedNodeVersion} with npm ${usedNPMVersion}, keep node and npm in sync! ${createTerminalLink(
					'versions'
				)}`
			),
		wrongProgramVersionError: (program: string, usedVersion: string, expectedVersion: string) =>
			chalk.red(
				`${
					logSymbols.error
				} Change ${program} version! You are using ${usedVersion} but your project requires ${expectedVersion}. ${createTerminalLink(
					'versions'
				)}`
			),
		readProgramVersionError: (program: string) =>
			chalk.red(
				`${
					logSymbols.error
				} Error when executing '${program} --version'. Is ${program} installed? ${createTerminalLink(
					'versions'
				)}`
			),
		readGitRootError: () =>
			chalk.red(
				`${
					logSymbols.error
				} Error when executing 'git rev-parse --show-toplevel'. Are you in a git repository? ${createTerminalLink(
					'hooksInstalled'
				)}`
			),
		readNodeVersionFileError: (file: string) =>
			chalk.red(
				`${logSymbols.error} Couldn't find ${file} file in your project root directory. ${createTerminalLink(
					'versions'
				)}`
			),
		saveExactIsOffError: () =>
			chalk.red(
				`${logSymbols.error} NPM save-exact is turned off. ${createTerminalLink(
					'saveExact'
				)}`
			),
		gitHooksNotInstalledError: () =>
			chalk.red(
				`${logSymbols.error} Git hooks are not installed. ${createTerminalLink(
					'hooksInstalled'
				)}`
			),
		noPackagesFoundError: (cwd: string) =>
			chalk.red(
				`${logSymbols.error} No packages in "${cwd}" found. ${createTerminalLink('dependenciesExactVersion')}`
			),
		notAllDependenciesExactError: (type: PackageDependencyKeys, pkgName: string, errorStack: string) =>
			chalk.red(
				`${
					logSymbols.error
				} Not all ${type} in ${pkgName} have been declared by exact version(s). ${createTerminalLink(
					'dependenciesExactVersion'
				)} ${errorStack}.`
			),
		starWildcardVersionError: () => `Wildcard "*" is not allowed as version declaration.`,
		approximateVersionError: (declaration: string) =>
			`Approximate version identifier "${declaration}" is not allowed.`,
		tarballVersionError: (url: string) => `Tarball dependencies are not allowed (${url}).`,
	},
	warning: {
		specifyProgramVersion: (program: string, usedVersion: string) =>
			chalk.yellow(
				`${logSymbols.warning} Specify ${program} version! You are using ${usedVersion} but you didn't specify a required version for ${program} in this project.`
			),
		fetchNodeListErrorMatchingNPM: (nodeVersionListURL: string) =>
			chalk.yellow(
				`${logSymbols.warning} Could not fetch node-list from ${nodeVersionListURL}. Your NPM version might not match your node version.`
			),
		fetchNodeListErrorNodeLTS: (nodeVersionListURL: string) =>
			chalk.yellow(
				`${logSymbols.warning} Could not fetch node-list from ${nodeVersionListURL}. Your node version might not be a LTS version.`
			),
		fetchNodeListErrorNodeSecurity: (nodeVersionListURL: string) =>
			chalk.yellow(
				`${logSymbols.warning} Could not fetch node-list from ${nodeVersionListURL}. Your node version might not be a secure node version.`
			),
	},
};
