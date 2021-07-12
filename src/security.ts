import semver from 'semver';
import { getInstalledVersion } from './get-version';
import { getNodeList } from './fetch-node-versions';
import { ILogMessage, INodeVersion } from './const';
import { logMessages } from './log-messages';

export const hasNodeVersionSecurityIssues = (nodeList: INodeVersion[], usedNodeVersion: string) => {
	return nodeList.some((nodeVersion) => {
		const nodeVersionText = nodeVersion.version.slice(1);
		// return true, if any MINOR version above THIS version has a security flag
		return (
			semver.diff(nodeVersionText, usedNodeVersion) === 'minor' &&
			semver.gt(nodeVersionText, usedNodeVersion) &&
			nodeVersion.security
		);
	});
};

export const getSecurityNodeLog = async (usedNodeVersion: string) => {
	const nodeList = await getNodeList('security');
	if (nodeList.error) {
		return { error: false, text: nodeList.text };
	}

	return hasNodeVersionSecurityIssues(JSON.parse(nodeList.text), usedNodeVersion)
		? { error: true, text: logMessages.error.nodeVersionNotSecureError(usedNodeVersion) }
		: { error: false, text: logMessages.success.nodeVersionSecurity(usedNodeVersion) };
};

export const getNodeSecurityChecker = async () => {
	const usedNodeVersion: ILogMessage = await getInstalledVersion('node');
	return usedNodeVersion.error ? usedNodeVersion : getSecurityNodeLog(usedNodeVersion.text);
};
