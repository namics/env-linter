import fetch from 'node-fetch';
import { logMessages } from './log-messages';

export const getNodeList = async (purpose: string) => {
	const nodeVersionListURL = `https://nodejs.org/dist/index.json`;
	try {
		const data = await fetch(nodeVersionListURL);
		return { error: false, text: await data.text() };
	} catch (err) {
		if (purpose === 'lts') {
			return { error: true, text: logMessages.warning.fetchNodeListErrorNodeLTS(nodeVersionListURL) };
		}
		if (purpose === 'security') {
			return { error: true, text: logMessages.warning.fetchNodeListErrorNodeSecurity(nodeVersionListURL) };
		}
		return { error: true, text: logMessages.warning.fetchNodeListErrorMatchingNPM(nodeVersionListURL) };
	}
};
