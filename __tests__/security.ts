import execa from 'execa';
import fetch from 'node-fetch';
import { getNodeSecurityChecker } from '../src/security';
import { logMessages } from '../src/log-messages';
/// <reference types="@types/jest" />

jest.mock('execa');
jest.mock('node-fetch');
jest.mock('fs-extra');


const { Response } = jest.requireActual('node-fetch');


const exampleNodeList = [
	{ version: 'v13.0.0', date: '2020-07-29', npm: '6.14.7', security: true, lts: false },
	{ version: 'v13.1.0', date: '2020-07-29', npm: '6.14.7', security: false, lts: false },
	{ version: 'v13.2.0', date: '2020-07-29', npm: '6.14.7', security: false, lts: false },
	{ version: 'v14.1.0', date: '2020-07-29', npm: '6.14.7', security: false, lts: false },
	{ version: 'v14.2.0', date: '2020-07-29', npm: '6.14.7', security: false, lts: false },
	{ version: 'v14.3.0', date: '2020-07-29', npm: '6.14.7', security: true, lts: false },
	{ version: 'v15.1.0', date: '2020-07-29', npm: '6.14.7', security: false, lts: false },
	{ version: 'v15.3.0', date: '2020-07-29', npm: '6.14.7', security: true, lts: false },
];
const nodeVersionListURL = 'https://nodejs.org/dist/index.json';

describe('getNodeSecurityChecker', () => {
	it('should return success-text if there is no security version above inside this major version', async () => {
		(execa as any).mockReturnValue(Promise.resolve({ stdout: '13.1.0' }));
		(fetch as any).mockReturnValue(Promise.resolve(new Response(JSON.stringify(exampleNodeList))));
		expect(await getNodeSecurityChecker()).toMatchObject({
			error: false,
			text: logMessages.success.nodeVersionSecurity('13.1.0'),
		});
	});
	it('should return error-text if there is a security version above inside this major version', async () => {
		(execa as any).mockReturnValue(Promise.resolve({ stdout: 'v14.1.0' }));
		(fetch as any).mockReturnValue(Promise.resolve(new Response(JSON.stringify(exampleNodeList))));
		expect(await getNodeSecurityChecker()).toMatchObject({
			error: true,
			text: logMessages.error.nodeVersionNotSecureError('14.1.0'),
		});
	});
	it('should return warning-text if we can not receive node-list', async () => {
		(fetch as any).mockReturnValue(Promise.reject());
		expect(await getNodeSecurityChecker()).toMatchObject({
			error: false,
			text: logMessages.warning.fetchNodeListErrorNodeSecurity(nodeVersionListURL),
		});
	});
	it('should return error-text if we can not receive installed node version', async () => {
		(execa as any).mockReturnValue(Promise.reject());
		expect(await getNodeSecurityChecker()).toMatchObject({
			error: true,
			text: logMessages.error.readProgramVersionError('node'),
		});
	});
});
