module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	transform: {
		"node_modules/variables/.+\\.(j|t)sx?$": "ts-jest"
	},
	transformIgnorePatterns: [
		"node_modules/(?!variables/.*)"
	],
	testPathIgnorePatterns: [
		'<rootDir>/__tests__/__snapshots__/',
		'<rootDir>/__tests__/tmp',
		'<rootDir>/__tests__/shared.ts',
	],
	watchPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/__tests__/tmp', '<rootDir>/build'],
};
