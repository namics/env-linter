import { ProjectManifest } from '@pnpm/types';

export interface IOptions {
	cwd?: string;
	versions?: string[];
	lts?: boolean;
	security?: boolean;
	hooksInstalled?: boolean;
	saveExact?: boolean;
	dependenciesExactVersion?: boolean;
}

export interface INodeVersion {
	version: string;
	npm: string;
	date: string;
	lts: boolean | string;
	security: boolean;
}

export interface ILogMessage {
	error: boolean;
	text: string;
}

export interface IPackage {
	name: string;
	version: string;
	scripts?: Record<string, string>;
	dependencies?: Record<string, string>;
	devDependencies?: Record<string, string>;
	peerDependencies?: Record<string, string>;
}

export interface IProject {
	dir: string;
	manifest: ProjectManifest;
}

export type MarkdownDocsNames = keyof Pick<
	IOptions,
	'dependenciesExactVersion' | 'hooksInstalled' | 'lts' | 'saveExact' |'security' | 'versions'
>;

export type PackageDependencyKeys = 'dependencies' | 'devDependencies';
