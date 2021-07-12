/// <reference types="@types/jest" />
jest.mock('fs-extra');
import { realpath } from 'fs-extra';
import { fetchOptions, splitVersions } from '../src/fetch-options';

describe('fetch-options', () => {
	it('default', async () => {
		global.process.argv = [
			'/usr/local/bin/node',
			'/usr/local/bin/env-linter',
			'--versions=node=12.14.0,npm=6.4.1',
			'--hooksInstalled',
			'--saveExact',
			'--security',
			'--dependenciesExactVersion',
			'--lts',
		];
		const options = await fetchOptions();
		delete options.cwd;
		expect(options).toEqual({
			versions: ['node=12.14.0', 'npm=6.4.1'],
			hooksInstalled: true,
			saveExact: true,
			security: true,
			dependenciesExactVersion: true,
			lts: true,
		});
	});
	it('with empty versions', async () => {
		global.process.argv = [
			'/usr/local/bin/node',
			'/usr/local/bin/env-linter',
			'--versions',
			'--hooksInstalled',
			'--saveExact',
			'--dependenciesExactVersion',
			'--lts',
		];
		const options = await fetchOptions();
		delete options.cwd;
		expect(options).toEqual({
			lts: true,
			dependenciesExactVersion: true,
			hooksInstalled: true,
			saveExact: true,
			versions: [],
		});
	});
	it('without versions and hooksInstalled', async () => {
		global.process.argv = ['/usr/local/bin/node', '/usr/local/bin/env-linter', '--saveExact'];
		const options = await fetchOptions();
		delete options.cwd;
		expect(options).toEqual({
			saveExact: true,
		});
	});
	it('should catch error when realpath rejects', async () => {
		const realConsoleError = console.error;
		console.error = jest.fn();
		(realpath as any).mockReturnValue(Promise.reject('example-error from fs.realpath'));
		expect(await fetchOptions()).toEqual({
			cwd: '',
			lts: false,
			dependenciesExactVersion: false,
			hooksInstalled: false,
			security: false,
			saveExact: false,
			versions: undefined,
		});
		console.error = realConsoleError;
	});
});

describe('splitVersions', () => {
	it('should return the same array that has been passed', () => {
		expect(splitVersions(['node=12.14.0', 'npm=6.4.1'])).toEqual(['node=12.14.0', 'npm=6.4.1']);
	});
});
