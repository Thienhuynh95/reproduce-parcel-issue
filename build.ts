import { Parcel } from '@parcel/core';
import { type InitialParcelOptions } from '@parcel/types';
import { fileURLToPath } from 'url';

type ConfigOptions = Omit<InitialParcelOptions, 'entries'> &
  Required<Pick<InitialParcelOptions, 'entries'>>;

const bundlePackage = async (options: ConfigOptions) => {
  const defaultOptions: InitialParcelOptions = {
    defaultTargetOptions: {
      isLibrary: true,
      sourceMaps: false,
      shouldOptimize: false,
      outputFormat: 'esmodule',
      engines: {
        parcel: '>2.5',
      },
    },
    shouldPatchConsole: true,
    shouldAutoInstall: true,
    shouldContentHash: false,
    additionalReporters: [
      {
        packageName: '@parcel/reporter-cli',
        resolveFrom: fileURLToPath(import.meta.url),
      },
    ],
    defaultConfig: '@parcel/config-default',
    mode: 'production',
  };
  const configOptions: ConfigOptions = {
    ...defaultOptions,
    ...options,
  };
  const bundler = new Parcel(configOptions);

  try {
    await bundler.run();
    return [];
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    return [];
  }
};

const componentsConfig: ConfigOptions = {
  detailedReport: { assetsPerBundle: 20 },
  entries: 'src/index.ts',
  targets: {
    main: {
      distDir: 'dist',
      context: 'browser',
      engines: {
        browsers: ['> 0.5%', 'last 2 versions', 'not dead'],
        parcel: '>2.5',
      },
    },
    module: {
      distDir: 'dist/module',
      context: 'node',
      engines: {
        node: '>= 12',
        parcel: '>2.5',
      },
    },
  },
};
const iconConfig: ConfigOptions = {
  entries: 'src/icons/*.tsx',
  targets: {
    main: {
      distDir: 'dist/icons',
      context: 'browser',
      engines: {
        browsers: '> 0.5%, last 2 versions, not dead',
        parcel: '>2.5',
      },
    },
    module: {
      distDir: 'dist/module/icons',
      context: 'node',
      engines: {
        node: '>= 12',
        parcel: '>2.5',
      },
    },
  },
};
const configs: ConfigOptions[] = [componentsConfig, iconConfig];

/* Set max listener based on the size of bundleConfig (1 config will add 4 event listeners) */
process.stdout.setMaxListeners(configs.length * 8 + 1);
process.stderr.setMaxListeners(configs.length * 8 + 1);

configs.map(bundlePackage);
