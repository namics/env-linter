/// <reference types="@types/jest" />

jest.mock('fs-extra');
import { readFile, pathExists } from 'fs-extra';

jest.mock('execa');
import execa from 'execa';

jest.mock('globby');
import globby from 'globby';

import { getHooksInstalledChecker, isHookInstalled } from '../src/hooks-installed';
import { logMessages } from '../src/log-messages';

describe('isHookInstalled', () => {
	it('should return true if hook is installed', async () => {
		(readFile as any).mockReturnValue(Promise.resolve('githook file content'));
		expect(await isHookInstalled('file')).toBeTruthy();
	});
	it('should return false if hook is not installed', async () => {
		(readFile as any).mockReturnValue(Promise.reject());
		expect(await isHookInstalled('file')).toBeFalsy();
	});
});

describe('getHooksInstalledChecker', () => {
	it('should return success-log if hooks are installed (husky 4)', async () => {
		(execa as any).mockReturnValue(Promise.resolve({ stdout: '/users/test/project-1' }));
		(globby as any).mockReturnValue(Promise.resolve([]));
		(readFile as any).mockReturnValue(Promise.resolve('githook file content'));
		expect(await getHooksInstalledChecker()).toMatchObject({
			error: false,
			text: logMessages.success.gitHooksAreInstalled(),
		});
	});
	it('should return success-log if hooks are installed (husky 7)', async () => {
		(execa as any).mockReturnValue(Promise.resolve({ stdout: '/users/test/project-1' }));
		(globby as any).mockReturnValue(Promise.resolve(['/users/test/project-1/.husky/_/husky.sh']));
		(readFile as any).mockReturnValue(Promise.reject());
		(pathExists as any).mockReturnValue(Promise.resolve(true));
		expect(await getHooksInstalledChecker()).toMatchObject({
			error: false,
			text: logMessages.success.gitHooksAreInstalled(),
		});
	});
	it('should return error-log if hooks are not installed (husky 7)', async () => {
		(execa as any).mockReturnValue(Promise.resolve({ stdout: '/users/test/project-1' }));
		(globby as any).mockReturnValue(Promise.resolve([]));
		(pathExists as any).mockReturnValue(Promise.resolve(false));
		expect(await getHooksInstalledChecker()).toMatchObject({
			error: true,
			text: logMessages.error.gitHooksNotInstalledError(),
		});
	});
	it('should return error-log if env-linter is started outside of a git repository', async () => {
		(execa as any).mockReturnValue(Promise.reject());
		(readFile as any).mockReturnValue(Promise.resolve('githook file content'));
		expect(await getHooksInstalledChecker()).toMatchObject({
			error: true,
			text: logMessages.error.readGitRootError(),
		});
	});
	it('should return error-log if env-linter is started outside of a git repository', async () => {
		(execa as any).mockReturnValue(Promise.resolve({ stdout: '' }));
		(readFile as any).mockReturnValue(Promise.resolve('githook file content'));
		expect(await getHooksInstalledChecker()).toMatchObject({
			error: true,
			text: logMessages.error.readGitRootError(),
		});
	});
});
