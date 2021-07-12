import globby from 'globby';
import fs from 'fs-extra';
import { getFileData } from './get-file-data';
import { logMessages } from './log-messages';
import { getGitRoot } from './get-git-root';

export const isHookInstalled = async (pathName: string) => {
	try {
		const fileData = await getFileData(pathName);
		return typeof fileData === 'string';
	} catch (err) {
		return false;
	}
};

export const areAllHooksInstalled = async (gitRootDirectory: string) => {
	const husky7directory = await globby(`${gitRootDirectory}/**/.husky/_/husky.sh`);
	if (husky7directory.length > 0) {
		return await fs.pathExists(husky7directory[0]);
	}
	const areHusky4HooksInstalled = await Promise.all([
		isHookInstalled(`${gitRootDirectory}/.git/hooks/commit-msg`),
		isHookInstalled(`${gitRootDirectory}/.git/hooks/pre-commit`),
	]);
	return areHusky4HooksInstalled.every((hookInstalled) => hookInstalled);
};

export const getHooksInstalledChecker = async () => {
	const gitRootDirectory = await getGitRoot();
	if (gitRootDirectory.error) {
		return gitRootDirectory;
	}
	return await areAllHooksInstalled(gitRootDirectory.text)
		? { error: false, text: logMessages.success.gitHooksAreInstalled() }
		: { error: true, text: logMessages.error.gitHooksNotInstalledError() };
};
